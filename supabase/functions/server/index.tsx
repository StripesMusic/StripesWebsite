import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-302ccf60/health", (c) => {
  return c.json({ status: "ok" });
});

// SoundCloud OAuth - Initiate flow
app.get("/make-server-302ccf60/soundcloud/auth", (c) => {
  const clientId = Deno.env.get("SOUNDCLOUD_CLIENT_ID");
  const redirectUri = `${c.req.header("origin")}/soundcloud/callback`;
  
  // SoundCloud OAuth 2.0 endpoint
  const authUrl = `https://api.soundcloud.com/connect?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&display=popup`;
  
  return c.json({ authUrl });
});

// SoundCloud OAuth - Exchange code for token and follow user
app.post("/make-server-302ccf60/soundcloud/callback", async (c) => {
  try {
    const { code, sessionId } = await c.req.json();
    const clientId = Deno.env.get("SOUNDCLOUD_CLIENT_ID");
    const clientSecret = Deno.env.get("SOUNDCLOUD_CLIENT_SECRET");
    const redirectUri = `${c.req.header("origin")}/soundcloud/callback`;

    // Exchange code for access token
    const tokenResponse = await fetch("https://api.soundcloud.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId!,
        client_secret: clientSecret!,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        code: code,
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.log(`SoundCloud token exchange failed: ${error}`);
      return c.json({ error: "Failed to get access token", details: error }, 400);
    }

    const { access_token } = await tokenResponse.json();

    // Follow the artist (user ID for musicbystripes)
    // First, get the current user's ID
    const meResponse = await fetch("https://api.soundcloud.com/me", {
      headers: {
        Authorization: `OAuth ${access_token}`,
      },
    });

    if (!meResponse.ok) {
      const error = await meResponse.text();
      console.log(`SoundCloud me endpoint failed: ${error}`);
      return c.json({ error: "Failed to get user info", details: error }, 400);
    }

    const currentUser = await meResponse.json();

    // Resolve the artist username to get their user ID
    const resolveResponse = await fetch(
      `https://api.soundcloud.com/resolve?url=https://soundcloud.com/musicbystripes&client_id=${clientId}`,
    );

    if (!resolveResponse.ok) {
      const error = await resolveResponse.text();
      console.log(`SoundCloud resolve failed: ${error}`);
      return c.json({ error: "Failed to resolve artist", details: error }, 400);
    }

    const artist = await resolveResponse.json();

    // Follow the artist
    const followResponse = await fetch(
      `https://api.soundcloud.com/me/followings/${artist.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `OAuth ${access_token}`,
        },
      },
    );

    if (!followResponse.ok) {
      const error = await followResponse.text();
      console.log(`SoundCloud follow failed: ${error}`);
      // Don't fail here - user might already be following
    }

    // Store completion in KV store
    await kv.set(`soundcloud_follow_${sessionId}`, {
      completed: true,
      userId: currentUser.id,
      timestamp: new Date().toISOString(),
    });

    return c.json({ success: true });
  } catch (error) {
    console.log(`SoundCloud callback error: ${error}`);
    return c.json({ error: "Internal server error", details: String(error) }, 500);
  }
});

// Check if user has completed SoundCloud follow
app.get("/make-server-302ccf60/soundcloud/check/:sessionId", async (c) => {
  const sessionId = c.req.param("sessionId");
  const data = await kv.get(`soundcloud_follow_${sessionId}`);
  return c.json({ completed: !!data });
});

// Mark Instagram as completed
app.post("/make-server-302ccf60/instagram/complete", async (c) => {
  const { sessionId } = await c.req.json();
  await kv.set(`instagram_follow_${sessionId}`, {
    completed: true,
    timestamp: new Date().toISOString(),
  });
  return c.json({ success: true });
});

// Check if user has completed Instagram follow
app.get("/make-server-302ccf60/instagram/check/:sessionId", async (c) => {
  const sessionId = c.req.param("sessionId");
  const data = await kv.get(`instagram_follow_${sessionId}`);
  return c.json({ completed: !!data });
});

Deno.serve(app.fetch);
import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Music } from "./pages/Music";
import { Contact } from "./pages/Contact";
import { Fangate } from "./pages/Fangate";
import { SoundCloudCallback } from "./pages/SoundCloudCallback";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: () => (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/about",
    Component: () => (
      <Layout>
        <About />
      </Layout>
    ),
  },
  {
    path: "/music",
    Component: () => (
      <Layout>
        <Music />
      </Layout>
    ),
  },
  {
    path: "/contact",
    Component: () => (
      <Layout>
        <Contact />
      </Layout>
    ),
  },
  {
    path: "/link/i-just-flow",
    Component: () => (
      <Layout>
        <Fangate />
      </Layout>
    ),
  },
  {
    path: "/soundcloud/callback",
    Component: SoundCloudCallback,
  },
]);
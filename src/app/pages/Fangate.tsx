import { useState, useEffect } from "react";
import { X, Download, Check, ExternalLink } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function Fangate() {
  const [showDownloadGate, setShowDownloadGate] = useState(false);
  const [soundcloudFollowed, setSoundcloudFollowed] = useState(false);
  const [instagramFollowed, setInstagramFollowed] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [isProcessing, setIsProcessing] = useState(false);

  const canDownload = soundcloudFollowed && instagramFollowed;

  // Check completion status on load
  useEffect(() => {
    checkCompletionStatus();
  }, []);

  const checkCompletionStatus = async () => {
    try {
      const [soundcloudRes, instagramRes] = await Promise.all([
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-302ccf60/soundcloud/check/${sessionId}`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }).catch(() => null),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-302ccf60/instagram/check/${sessionId}`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }).catch(() => null),
      ]);

      if (soundcloudRes && soundcloudRes.ok) {
        const soundcloudData = await soundcloudRes.json();
        setSoundcloudFollowed(soundcloudData.completed || false);
      }

      if (instagramRes && instagramRes.ok) {
        const instagramData = await instagramRes.json();
        setInstagramFollowed(instagramData.completed || false);
      }
    } catch (error) {
      // Silently fail - server might not be ready yet
      console.log("Server not ready, skipping check");
    }
  };

  const handleSoundCloudFollow = async () => {
    if (soundcloudFollowed || isProcessing) return;

    setIsProcessing(true);

    try {
      // Get auth URL from server
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-302ccf60/soundcloud/auth`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      const { authUrl } = await response.json();

      // Open popup
      const width = 600;
      const height = 700;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      const popup = window.open(
        authUrl,
        "SoundCloud Authorization",
        `width=${width},height=${height},left=${left},top=${top}`
      );

      // Listen for callback
      const messageHandler = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        if (event.data.type === "soundcloud-code") {
          const code = event.data.code;

          // Send code to server to complete OAuth
          const callbackResponse = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-302ccf60/soundcloud/callback`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${publicAnonKey}`,
              },
              body: JSON.stringify({ code, sessionId }),
            }
          );

          if (callbackResponse.ok) {
            setSoundcloudFollowed(true);
          } else {
            const errorData = await callbackResponse.json();
            console.error("SoundCloud follow error:", errorData);
            alert("Failed to complete SoundCloud follow. Please try again.");
          }

          window.removeEventListener("message", messageHandler);
          setIsProcessing(false);
        } else if (event.data.type === "soundcloud-error") {
          console.error("SoundCloud OAuth error:", event.data.error);
          alert("SoundCloud authorization was cancelled or failed.");
          window.removeEventListener("message", messageHandler);
          setIsProcessing(false);
        }
      };

      window.addEventListener("message", messageHandler);

      // Check if popup was closed without completing
      const checkPopup = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkPopup);
          window.removeEventListener("message", messageHandler);
          setIsProcessing(false);
        }
      }, 1000);
    } catch (error) {
      console.error("Error initiating SoundCloud OAuth:", error);
      alert("Failed to start SoundCloud authorization. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleInstagramFollow = async () => {
    if (instagramFollowed) return;

    // Open Instagram in new tab
    window.open("https://www.instagram.com/musicbystripes/", "_blank");

    // Mark as completed
    try {
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-302ccf60/instagram/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ sessionId }),
      });

      setInstagramFollowed(true);
    } catch (error) {
      console.error("Error marking Instagram as completed:", error);
    }
  };

  const streamingLinks = [
    {
      name: "Spotify",
      url: "https://open.spotify.com/track/21i0tDZDaN7NMYKtFTRNMr",
      color: "#1DB954",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      ),
    },
    {
      name: "Apple Music",
      url: "https://music.apple.com/us/album/i-just-flow-radio-edit/1870413927",
      color: "#FA243C",
      icon: (
        <svg
          viewBox="0 0 361 361"
          width="35"
          height="35"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M254.5,55c-0.87,0.08-8.6,1.45-9.53,1.64l-107,21.59l-0.04,0.01c-2.79,0.59-4.98,1.58-6.67,3
    c-2.04,1.71-3.17,4.13-3.6,6.95c-0.09,0.6-0.24,1.82-0.24,3.62v133.92c0,3.13-0.25,6.17-2.37,8.76
    c-2.12,2.59-4.74,3.37-7.81,3.99c-2.33,0.47-4.66,0.94-6.99,1.41c-8.84,1.78-14.59,2.99-19.8,5.01
    c-4.98,1.93-8.71,4.39-11.68,7.51c-5.89,6.17-8.28,14.54-7.46,22.38c0.7,6.69,3.71,13.09,8.88,17.82
    c3.49,3.2,7.85,5.63,12.99,6.66c5.33,1.07,11.01,0.7,19.31-0.98c4.42-0.89,8.56-2.28,12.5-4.61
    c3.9-2.3,7.24-5.37,9.85-9.11c2.62-3.75,4.31-7.92,5.24-12.35c0.96-4.57,1.19-8.7,1.19-13.26v-116.15
    c0-6.22,1.76-7.86,6.78-9.08c0,0,88.94-17.94,93.09-18.75c5.79-1.11,8.52,0.54,8.52,6.61v79.29
    c0,3.14-0.03,6.32-2.17,8.92c-2.12,2.59-4.74,3.37-7.81,3.99c-2.33,0.47-4.66,0.94-6.99,1.41
    c-8.84,1.78-14.59,2.99-19.8,5.01c-4.98,1.93-8.71,4.39-11.68,7.51
    c-5.89,6.17-8.49,14.54-7.67,22.38c0.7,6.69,3.92,13.09,9.09,17.82
    c3.49,3.2,7.85,5.56,12.99,6.6c5.33,1.07,11.01,0.69,19.31-0.98
    c4.42-0.89,8.56-2.22,12.5-4.55c3.9-2.3,7.24-5.37,9.85-9.11
    c2.62-3.75,4.31-7.92,5.24-12.35c0.96-4.57,1-8.7,1-13.26V64.46
    C263.54,58.3,260.29,54.5,254.5,55z"
          />
        </svg>
      ),
    },
    {
      name: "YouTube Music",
      url: "https://music.youtube.com/watch?v=mDCR71pUn4s",
      color: "#FF0000",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
        </svg>
      ),
    },
    {
      name: "SoundCloud",
      url: "https://soundcloud.com/musicbystripes/i-just-flow",
      color: "#FF5500",
      icon: (
        <svg
          width="30"
          height="15"
          viewBox="0 0 169 77"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M73.8199 10.8071C75.6893 10.8071 77.2061 25.6245 77.2061 43.9035L77.199 46.3731C77.065 63.4983 75.6047 77 73.8199 77C72.0139 77 70.5394 63.1746 70.4336 45.761V43.2844C70.4689 25.2938 71.9715 10.8071 73.8199 10.8071ZM62.0809 17.5614C63.9081 17.5614 65.3966 30.2259 65.4672 46.0846V48.4768C65.3966 64.3355 63.9081 77 62.0809 77C60.282 77 58.8076 64.6522 58.6947 49.0678V46.6756L58.7088 44.2835C58.8852 29.2761 60.3314 17.5614 62.0809 17.5614ZM50.342 17.5614C52.1409 17.5614 53.6153 29.9093 53.7282 45.4936V47.8858L53.7141 50.278C53.5377 65.2854 52.0915 77 50.342 77C48.5148 77 47.0263 64.3355 46.9558 48.4768V46.0846C47.0263 30.2259 48.5148 17.5614 50.342 17.5614ZM38.603 21.6141C40.4725 21.6141 41.9893 34.0112 41.9893 49.307L41.9752 51.664C41.8341 65.8553 40.3738 77 38.603 77C36.7547 77 35.2591 64.9195 35.2168 49.898V48.716C35.2591 33.6946 36.7547 21.6141 38.603 21.6141ZM26.8641 33.772C28.7336 33.772 30.2503 43.4462 30.2503 55.386V56.4976C30.1586 67.9168 28.6772 77 26.8641 77C24.9946 77 23.4779 67.3258 23.4779 55.386V54.2743C23.5696 42.8552 25.0511 33.772 26.8641 33.772ZM102.941 4.5763e-05C121.142 4.5763e-05 136.239 13.2696 139.047 30.641C141.135 30.0359 143.322 29.7311 145.608 29.7264C151.802 29.8076 157.717 32.3035 162.089 36.6799C166.461 41.0564 168.941 46.9656 168.999 53.143C169.057 59.3203 166.688 65.2749 162.4 69.7323C158.111 74.1898 152.243 76.7959 146.052 76.993L145.608 77H88.042C86.6062 76.9963 85.2303 76.4258 84.2151 75.4132C83.1998 74.4007 82.6278 73.0285 82.6241 71.5965V6.14231C88.6341 2.12698 95.7075 -0.0114069 102.941 4.5763e-05ZM15.1252 32.4211C16.9947 32.4211 18.5114 41.7998 18.5114 53.3597V54.4573C18.4126 65.5035 16.9382 74.2983 15.1252 74.2983C13.291 74.2983 11.7883 65.2221 11.7389 53.9085V53.3597C11.7389 41.7998 13.2557 32.4211 15.1252 32.4211ZM3.38623 39.1755C5.25571 39.1755 6.77246 45.8313 6.77246 54.0351V54.9568C6.65959 62.7314 5.18517 68.8947 3.38623 68.8947C1.51675 68.8947 0 62.2389 0 54.0351V53.1134C0.112874 45.3388 1.5873 39.1755 3.38623 39.1755Z"
          />
        </svg>
      ),
    },
    {
      name: "Deezer",
      url: "https://link.deezer.com/s/32p86ju4btCDR6egqpNhz",
      color: "#a53dff",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill="#000"
            d="M0.693 10.024C1.074 10.024 1.386 8.768 1.386 7.217C1.386 5.666 1.074 4.41 0.693 4.41C0.312 4.41 0 5.666 0 7.217C0 8.768 0.312 10.024 0.693 10.024ZM21.038 1.56C20.674 1.56 20.354 2.365 20.128 3.656C19.765 1.446 19.184 0 18.526 0C17.746 0 17.062 2.036 16.742 5C16.43 2.842 15.954 1.464 15.417 1.464C14.672 1.464 14.031 4.168 13.797 7.936C13.355 6.004 12.714 4.791 12.004 4.791C11.294 4.791 10.654 6.004 10.211 7.936C9.969 4.176 9.337 1.473 8.583 1.473C8.046 1.473 7.57 2.851 7.258 5.008C6.938 2.036 6.262 0 5.474 0C4.816 0 4.227 1.447 3.872 3.665C3.655 2.374 3.326 1.56 2.962 1.56C2.287 1.56 1.741 4.367 1.741 7.832C1.741 11.297 2.287 14.105 2.962 14.105C3.239 14.105 3.499 13.629 3.698 12.832C4.018 15.76 4.694 17.77 5.474 17.77C6.08 17.77 6.617 16.566 6.981 14.66C7.232 18.282 7.856 20.855 8.583 20.855C9.043 20.855 9.458 19.832 9.77 18.178C10.142 21.6 11 24 12.004 24C13.008 24 13.867 21.6 14.239 18.178C14.551 19.832 14.966 20.855 15.425 20.855C16.153 20.855 16.777 18.282 17.028 14.66C17.392 16.566 17.928 17.77 18.535 17.77C19.315 17.77 19.99 15.76 20.31 12.832C20.518 13.629 20.77 14.105 21.047 14.105C21.722 14.105 22.267 11.298 22.267 7.832C22.259 4.375 21.715 1.56 21.038 1.56ZM23.307 10.024C23.688 10.024 24 8.768 24 7.217C24 5.666 23.688 4.41 23.307 4.41C22.926 4.41 22.614 5.666 22.614 7.217C22.614 8.768 22.926 10.024 23.307 10.024Z"
          />
        </svg>
      ),
    },
  ];

  const handleDownloadClick = () => {
    if (canDownload) {
      // Trigger download
      const link = document.createElement('a');
      link.href = '/downloads/i-just-flow.zip';
      link.download = 'I Just Flow - Stripes x Hilefex.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setShowDownloadGate(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
      {/* Background Texture - More visible halftone */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #84cc16 2px, transparent 2px)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, white 1.5px, transparent 1.5px)`,
            backgroundSize: "12px 12px",
            backgroundPosition: "6px 6px",
          }}
        ></div>
      </div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#84cc16]/10 via-transparent to-[#fbbf24]/10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Artwork */}
          <div>
            <div className="relative group">
              <img
                src="https://i1.sndcdn.com/artworks-DPPgyXWyCPMtFKqS-tvQqZQ-t500x500.png"
                alt="I Just Flow - Stripes x Hilefex"
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl border border-white/10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="mt-8 text-center">
              <h1
                className="text-5xl md:text-6xl font-black mb-3 font-[Barlow]"
                style={{ color: "var(--lime-green)" }}
              >
                I JUST FLOW
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-2 font-[Barlow]">
                Stripes, Hilefex
              </p>
              <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold font-[Barlow]">
                Single • 23 Jan 2026
              </p>
            </div>
          </div>

          {/* Right Side - Links */}
          <div className="space-y-4">
            <div className="mb-8">
              <h2
                className="text-3xl md:text-4xl font-black mb-3 font-[Barlow]"
                style={{ color: "var(--golden-yellow)" }}
              >
                STREAM NOW
              </h2>
              <p className="text-gray-400 font-[Barlow]">
                Choose your preferred platform
              </p>
            </div>

            {/* Free Download Button */}
            <button
              onClick={handleDownloadClick}
              className="w-full p-6 rounded-xl border-2 transition-all hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden isolate"
              style={{
                borderColor: "var(--lime-green)",
                backgroundColor: canDownload
                  ? "var(--lime-green)"
                  : "transparent",
                color: canDownload
                  ? "#000"
                  : "var(--lime-green)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none"></div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: canDownload
                        ? "#000"
                        : "var(--lime-green)",
                      color: canDownload
                        ? "var(--lime-green)"
                        : "#000",
                    }}
                  >
                    <Download className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-black uppercase tracking-wide font-[Barlow]">
                      Free Download
                    </div>
                    <div className="text-sm font-semibold opacity-75 font-[Barlow]">
                      {canDownload
                        ? "Click to download"
                        : "Follow to unlock"}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>

            {/* Streaming Platform Links */}
            {streamingLinks.map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-6 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/30 transition-all hover:scale-[1.02] hover:shadow-xl group relative overflow-hidden isolate"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: platform.color,
                      }}
                    >
                      {platform.icon}
                    </div>
                    <div className="text-xl font-semibold uppercase tracking-wide font-[Barlow]">
                      {platform.name}
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Download Gate Modal */}
      {showDownloadGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 rounded-2xl border border-white/20 max-w-md w-full p-8 relative animate-fade-in">
            <button
              onClick={() => setShowDownloadGate(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "var(--lime-green)" }}
              >
                <Download className="w-8 h-8 text-black" />
              </div>
              <h3
                className="text-3xl font-black mb-2 font-[Barlow]"
                style={{ color: "var(--lime-green)" }}
              >
                UNLOCK DOWNLOAD
              </h3>
              <p className="text-gray-400 font-[Barlow]">
                Follow me on these platforms to get your free
                download
              </p>
            </div>

            <div className="space-y-4">
              {/* SoundCloud Follow */}
              <button
                onClick={handleSoundCloudFollow}
                disabled={isProcessing}
                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                  soundcloudFollowed
                    ? "bg-[#FF5500] border-[#FF5500] text-white"
                    : "bg-transparent border-white/20 text-white hover:border-[#FF5500]"
                } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FF5500] flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-white"
                    >
                      <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c0-.057-.045-.1-.09-.1m-.899.828c-.051 0-.09.04-.099.099l-.135 1.257.135 1.241c.009.057.048.097.099.097.05 0 .09-.04.099-.097l.202-1.241-.202-1.257c0-.057-.045-.099-.09-.099m1.798-.899c-.06 0-.108.055-.117.117l-.165 1.917.165 1.846c.009.062.057.117.117.117.059 0 .108-.055.117-.117l.195-1.846-.196-1.917c-.009-.062-.053-.117-.116-.117m.899-.449c-.06 0-.113.054-.122.113l-.138 2.358.138 2.197c.009.059.062.113.122.113.059 0 .112-.054.121-.113l.155-2.197-.155-2.358c-.009-.059-.062-.113-.121-.113m.898-.66c-.068 0-.125.06-.134.127l-.119 3.018.119 2.934c.009.067.066.127.134.127.067 0 .125-.06.134-.127l.142-2.934-.142-3.018c-.009-.067-.067-.127-.134-.127m.899-.404c-.075 0-.138.066-.146.14l-.105 3.422.105 3.296c.008.074.071.14.146.14.074 0 .137-.066.145-.14l.12-3.296-.12-3.422c-.008-.074-.071-.14-.145-.14m.898-.354c-.083 0-.152.07-.16.152l-.093 3.776.093 3.661c.008.082.077.152.16.152.082 0 .151-.07.159-.152l.107-3.661-.107-3.776c-.008-.082-.077-.152-.159-.152m.899-.269c-.091 0-.165.074-.174.165l-.081 4.045.081 3.948c.009.091.083.165.174.165.09 0 .165-.074.173-.165l.094-3.948-.094-4.045c-.008-.091-.083-.165-.173-.165m.898-.173c-.099 0-.181.082-.189.181l-.069 4.218.069 4.143c.008.099.09.181.189.181.098 0 .18-.082.189-.181l.077-4.143-.077-4.218c-.009-.099-.091-.181-.189-.181m.899-.135c-.107 0-.195.088-.203.195l-.056 4.353.056 4.312c.008.107.096.195.203.195.106 0 .194-.088.202-.195l.064-4.312-.064-4.353c-.008-.107-.096-.195-.202-.195m.898-.101c-.114 0-.21.096-.218.21l-.046 4.454.046 4.464c.008.114.104.21.218.21.113 0 .209-.096.217-.21l.052-4.464-.052-4.454c-.008-.114-.104-.21-.217-.21m.899-.098c-.122 0-.224.102-.232.224l-.034 4.552.034 4.587c.008.122.11.224.232.224.121 0 .223-.102.231-.224l.039-4.587-.039-4.552c-.008-.122-.11-.224-.231-.224m.898-.107c-.13 0-.239.109-.247.239l-.021 4.66.021 4.672c.008.13.117.239.247.239.129 0 .238-.109.246-.239l.025-4.672-.025-4.66c-.008-.13-.117-.239-.246-.239m.899-.114c-.137 0-.252.115-.26.252l-.009 4.774.009 4.747c.008.137.123.252.26.252.136 0 .251-.115.259-.252l.012-4.747-.012-4.774c-.008-.137-.123-.252-.259-.252m.898-.13c-.145 0-.266.121-.274.266v9.653c.008.145.129.266.274.266.144 0 .265-.121.273-.266V9.387c-.008-.145-.129-.266-.273-.266m.899-.142c-.153 0-.281.128-.289.281v10.056c.008.153.136.281.289.281.152 0 .28-.128.288-.281V9.247c-.008-.153-.136-.281-.288-.281m4.097 4.45c-.361 0-.709.08-1.019.225-.049.023-.062.058-.062.109v6.937c0 .153.128.28.281.28h5.443c.867 0 1.571-.701 1.571-1.568v-.009c0-.867-.704-1.568-1.571-1.568-.235 0-.455.053-.653.145-.05.024-.086.029-.118-.007-.028-.031-.029-.064-.029-.101V9.432c0-.153-.128-.281-.281-.281-.152 0-.28.128-.28.281v6.156c0 .153-.128.281-.281.281-.152 0-.28-.128-.28-.281v-7.808c0-.153-.128-.281-.281-.281-.152 0-.28.128-.28.281v7.808c0 .153-.128.281-.281-.281-.152 0-.28-.128-.28-.281v-6.944c0-.153-.128-.281-.281-.281-.152 0-.28.128-.28.281v6.944c0 .153-.128.281-.281.281-.152 0-.28-.128-.28-.281v-5.899c0-.153-.128-.281-.281-.281z" />
                    </svg>
                  </div>
                  <span className="font-black font-[Barlow]">
                    {isProcessing ? "Processing..." : "Follow on SoundCloud"}
                  </span>
                </div>
                {soundcloudFollowed && (
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#FF5500]" />
                  </div>
                )}
              </button>

              {/* Instagram Follow */}
              <button
                onClick={handleInstagramFollow}
                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                  instagramFollowed
                    ? "bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] border-[#E1306C] text-white"
                    : "bg-transparent border-white/20 text-white hover:border-[#E1306C]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-5 h-5 text-white"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line
                        x1="17.5"
                        y1="6.5"
                        x2="17.51"
                        y2="6.5"
                      />
                    </svg>
                  </div>
                  <span className="font-black font-[Barlow]">
                    Follow on Instagram
                  </span>
                </div>
                {instagramFollowed && (
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#E1306C]" />
                  </div>
                )}
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownloadClick}
              disabled={!canDownload}
              className={`w-full mt-8 p-4 rounded-xl font-black uppercase tracking-wide transition-all font-[Barlow] ${
                canDownload
                  ? "bg-[var(--lime-green)] text-black hover:scale-105"
                  : "bg-zinc-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              {canDownload
                ? "Download Now"
                : "Complete Steps Above"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export function SoundCloudCallback() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      // Send error back to opener
      if (window.opener) {
        window.opener.postMessage(
          { type: "soundcloud-error", error },
          window.location.origin
        );
      }
      window.close();
      return;
    }

    if (code) {
      // Send code back to opener
      if (window.opener) {
        window.opener.postMessage(
          { type: "soundcloud-code", code },
          window.location.origin
        );
      }
      // Close popup after sending message
      setTimeout(() => window.close(), 500);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[var(--lime-green)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl font-[Barlow]">Completing SoundCloud authorization...</p>
      </div>
    </div>
  );
}

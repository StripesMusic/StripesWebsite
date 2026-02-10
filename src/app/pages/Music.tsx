import { Play, ExternalLink, Music2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Music() {
  const albums = [
    {
      title: "Neon Nights",
      type: "Single",
      year: "2026",
      streams: "5M+",
      image: "https://images.unsplash.com/photo-1693395460833-8f1969eb71a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFRE0lMjBjb25jZXJ0JTIwY3Jvd2QlMjBsaWdodHN8ZW58MXx8fHwxNzcwNTkxNTcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Electric Soul",
      type: "EP",
      year: "2025",
      streams: "12M+",
      image: "https://images.unsplash.com/photo-1620456175552-c82581ade74e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzA1NTg5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Pulse",
      type: "Album",
      year: "2025",
      streams: "25M+",
      image: "https://images.unsplash.com/photo-1765278611238-413bd62c8dd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMG11c2ljJTIwcHJvZHVjZXIlMjBjb25jZXJ0JTIwc3RhZ2V8ZW58MXx8fHwxNzcwNTkxNTY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Midnight Rave",
      type: "Single",
      year: "2024",
      streams: "8M+",
      image: "https://images.unsplash.com/photo-1693395460833-8f1969eb71a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFRE0lMjBjb25jZXJ0JTIwY3Jvd2QlMjBsaWdodHN8ZW58MXx8fHwxNzcwNTkxNTcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Sunrise Sessions",
      type: "EP",
      year: "2024",
      streams: "15M+",
      image: "https://images.unsplash.com/photo-1620456175552-c82581ade74e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzA1NTg5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Voltage",
      type: "Album",
      year: "2023",
      streams: "30M+",
      image: "https://images.unsplash.com/photo-1765278611238-413bd62c8dd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMG11c2ljJTIwcHJvZHVjZXIlMjBjb25jZXJ0JTIwc3RhZ2V8ZW58MXx8fHwxNzcwNTkxNTY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const playlists = [
    { name: "Spotify", followers: "150K", color: "var(--lime-green)" },
    { name: "Apple Music", followers: "80K", color: "var(--golden-yellow)" },
    { name: "SoundCloud", followers: "120K", color: "var(--sky-blue)" },
  ];

  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-900 to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">
            MY <span style={{ color: "var(--lime-green)" }}>MUSIC</span>
          </h1>
          <p className="max-w-3xl text-[24px] font-[Barlow]" style={{ color: "var(--golden-yellow)" }}>
            Explore my complete discography
          </p>
        </div>
      </section>

      {/* Streaming Platforms */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center" style={{ color: "var(--lime-green)" }}>
            LISTEN ON
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {playlists.map((platform, index) => (
              <div
                key={index}
                className="p-8 rounded-xl border border-white/10 bg-zinc-900 hover:border-[var(--lime-green)] transition-all group cursor-pointer"
              >
                <Music2 className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" style={{ color: platform.color }} />
                <h3 className="text-2xl font-black mb-2">{platform.name}</h3>
                <p className="text-gray-400 mb-4">{platform.followers} Followers</p>
                <div className="flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all" style={{ color: "var(--lime-green)" }}>
                  <span>Follow</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discography Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center" style={{ color: "var(--lime-green)" }}>
            DISCOGRAPHY
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900 hover:border-[var(--lime-green)] transition-all cursor-pointer"
              >
                {/* Album Cover */}
                <div className="aspect-square overflow-hidden relative">
                  <ImageWithFallback
                    src={album.image}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--lime-green)" }}>
                      <Play className="w-8 h-8 text-black fill-black" />
                    </div>
                  </div>
                </div>

                {/* Album Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ backgroundColor: "var(--sky-blue)", color: "#000" }}>
                      {album.type}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold">{album.year}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-1">{album.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{album.streams} streams</p>
                  <button className="flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all" style={{ color: "var(--lime-green)" }}>
                    <Play className="w-4 h-4" />
                    Play Album
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6" style={{ color: "var(--lime-green)" }}>
            NEVER MISS A BEAT
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to get notified about new releases and exclusive content
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg bg-zinc-900 border border-white/10 focus:border-[var(--lime-green)] focus:outline-none text-white"
            />
            <button
              className="px-8 py-4 font-bold uppercase tracking-wider rounded-lg transition-all hover:scale-105"
              style={{
                backgroundColor: "var(--lime-green)",
                color: "#000",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Headphones, Music, Zap, Globe } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import profilePhoto from "figma:asset/44c89673116b37d30152d467e0bf24af9e6835fc.png";

export function About() {
  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Hero Section with Profile Photo Background */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={profilePhoto}
            alt="Jake Profile"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">
            ABOUT{" "}
            <span style={{ color: "var(--lime-green)" }}>
              STRIPES
            </span>
          </h1>
          <p
            className="text-2xl md:text-3xl max-w-3xl"
            style={{ color: "var(--golden-yellow)" }}
          >
            hey! :)
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="text-4xl md:text-5xl font-black mb-6"
              style={{ color: "var(--lime-green)" }}
            >
              PRESS RELEASE
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p className="font-[Barlow]">
                In 2025, Stripes won{" "}
                <a
                  className="text-[#78a6f5] text-[#77a5f5] text-[#75a4f6] text-[#73a4f9] text-[#72a3f9] text-[#6fa2fb] text-[#6fa3fe] text-[#70a4ff] text-[#71a5ff] text-[#72a5ff] text-[#72a5ff] text-[#73a6ff] text-[#72a5ff] text-[#71a5ff] text-[#70a4ff] text-[#6da2ff] text-[#6ba1fe] text-[#6ba0fd] text-[#6ca1fd] text-[#6ba0fd] text-[#6a9ffb] text-[#699ffb] text-[#689efb] text-[#659bf9] text-[#639af9] text-[#6298f8] text-[#6098f8] text-[#5f96f8] text-[#6097f8] text-[#6298f8] text-[#6398f8] text-[#6499f8] text-[#659af8] text-[#669bf8] text-[#6fa1fa] text-[#74a5fb] text-[#75a5fb] text-[#76a6fb] text-[#78a7fb] text-[#79a8fb] text-[#7ba9fb] text-[#7eacfd] text-[#7facfd] text-[#82aefd] text-[#83affd] text-[#85b0fe] text-[#84affe] text-[#83aefe] text-[#81aefe] text-[#7eabfe] text-[#7baafe] text-[#7aa9fe] text-[#7aa9fe]"
                  href="https://open.spotify.com/artist/5SOSqzQyhsHTTuxAMGPkaO"
                >
                  BUTTER
                </a>{" "}
                and{" "}
                <a
                  className="text-[#7aa9fe]"
                  href="https://open.spotify.com/artist/01BNEFdzawMyAXoHVdtyPx"
                >
                  Andrew A
                </a>
                's “Ghost Of You” remix contest with a DnB spin
                alongside{" "}
                <a
                  className="text-[#7aa9fe]"
                  href="https://open.spotify.com/artist/4pYWodVn2BToKzPRDXPxPX"
                >
                  E2D2
                </a>
                , earning Tomorrowland support from Andrew A,
                with additional DJ support from well-known names
                like{" "}
                <a
                  className="text-[#7aa9fe]"
                  href="https://open.spotify.com/artist/4pYWodVn2BToKzPRDXPxPX"
                >
                  Toxic Wraith
                </a>
                .
              </p>
              <p className="font-[Barlow]">
                Stripes is a US-based electronic music producer
                who draws on his background as an intense
                drummer since the age of four. Having honed his
                production skills through classes at Berklee
                College of Music and drawing inspiration from
                influential artists such as{" "}
                <a
                  className="text-[#7aa9fe]"
                  href="https://open.spotify.com/artist/4mHAu7NX2UNsnGXjviBD9e"
                >
                  Brooks
                </a>{" "}
                and{" "}
                <a
                  className="text-[#7aa9fe]"
                  href="https://open.spotify.com/artist/7hf6L4LN1RTVN66IdBVpPr"
                >
                  RudeLies
                </a>
                , he has been forging an unmistakable creative
                identity.
                <a href="https://open.spotify.com/artist/6STjC3QJTieuM5WHHtkGuh"></a>
              </p>
              <p className="font-[Barlow]">
                On the side, Stripes works for three record
                labels: managing releases, overseeing A&R, and
                designing cover artwork. He has another release
                coming soon and is a promising talent to watch!
              </p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1620456175552-c82581ade74e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzA1NTg5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Studio Equipment"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-black mb-16 text-center"
            style={{ color: "var(--lime-green)" }}
          >
            WHAT I DO
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Music,
                title: "Production",
                description:
                  "Crafting original tracks with precision and creativity",
              },
              {
                icon: Headphones,
                title: "Live Sets",
                description:
                  "High-energy performances at clubs and festivals",
              },
              {
                icon: Zap,
                title: "Remixes",
                description:
                  "Transforming tracks into dancefloor anthems",
              },
              {
                icon: Globe,
                title: "Collaborations",
                description:
                  "Working with artists worldwide to push creative boundaries",
              },
            ].map((skill, index) => (
              <div
                key={index}
                className="p-8 rounded-xl border border-white/10 bg-zinc-900 hover:border-[var(--lime-green)] transition-all group"
              >
                <skill.icon
                  className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform"
                  style={{ color: "var(--golden-yellow)" }}
                />
                <h3 className="text-2xl font-black mb-3">
                  {skill.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-black mb-16 text-center"
            style={{ color: "var(--lime-green)" }}
          >
            ACHIEVEMENTS
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                year: "2025",
                title: "Ultra Music Festival",
                description: "Main stage performance",
              },
              {
                year: "2024",
                title: "Platinum Record",
                description: 'For single "Electric Soul"',
              },
              {
                year: "2023",
                title: "Beatport #1",
                description: "Top Progressive House track",
              },
            ].map((achievement, index) => (
              <div key={index} className="text-center p-8">
                <div
                  className="text-6xl font-black mb-4"
                  style={{ color: "var(--golden-yellow)" }}
                >
                  {achievement.year}
                </div>
                <h3 className="text-2xl font-black mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-400">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "figma:asset/37e3959fc1ac0c16f8222e2d48fd0c48abce91ac.png";

export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Music", path: "/music" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Check if we're on a link/fangate page
  const isLinkPage = location.pathname.startsWith("/link");

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation - Hidden on link pages */}
      {!isLinkPage && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2 group"
              >
                <img
                  src={logo}
                  alt="Stripes Logo"
                  className="h-8 w-auto object-contain group-hover:opacity-80 transition-opacity mx-[6px] my-[0px]"
                />
                <span className="text-2xl font-black tracking-tight group-hover:opacity-80 transition-opacity font-[Barlow]">
                  STRIPES
                </span>
              </Link>

              {/* Separator */}
              <div className="hidden md:block flex-1 h-px ml-14 mr-8 bg-gradient-to-r from-[var(--lime-green)]/80 via-[var(--lime-green)]/20 to-transparent"></div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm uppercase tracking-wider font-semibold transition-all font-[Barlow] ${
                      isActive(link.path)
                        ? "text-[var(--lime-green)]"
                        : "text-white hover:text-[var(--golden-yellow)]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 bg-[#0a0a0a]">
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-sm uppercase tracking-wider font-semibold py-2 transition-all ${
                      isActive(link.path)
                        ? "text-[var(--lime-green)]"
                        : "text-white hover:text-[var(--golden-yellow)]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      )}

      {/* Main Content */}
      <main className={isLinkPage ? "" : "pt-20"}>{children}</main>

      {/* Footer - Hidden on link pages */}
      {!isLinkPage && (
        <footer className="bg-black border-t border-white/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="Stripes Logo"
                  className="h-10 w-auto object-contain mx-[6px] my-[0px]"
                />
                <span className="text-xl font-black font-[Barlow]">
                  STRIPES
                </span>
              </div>
              <div className="text-gray-400 text-sm font-[Barlow]">
                © 2026 Stripes. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm text-gray-400">
                <a
                  href="#"
                  className="hover:text-[var(--lime-green)] transition-colors font-[Barlow]"
                >
                  Spotify
                </a>
                <a
                  href="#"
                  className="hover:text-[var(--lime-green)] transition-colors font-[Barlow]"
                >
                  SoundCloud
                </a>
                <a
                  href="#"
                  className="hover:text-[var(--lime-green)] transition-colors font-[Barlow]"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
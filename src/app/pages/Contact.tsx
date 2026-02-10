import { Mail, MapPin, Phone, Instagram, Twitter, Facebook } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "booking@stripesedm.com",
      link: "mailto:booking@stripesedm.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Los Angeles, CA",
      link: null,
    },
    {
      icon: Phone,
      title: "Management",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
  ];

  const socialLinks = [
    { icon: Instagram, name: "Instagram", handle: "@stripesedm", color: "var(--lime-green)" },
    { icon: Twitter, name: "Twitter", handle: "@stripesmusic", color: "var(--golden-yellow)" },
    { icon: Facebook, name: "Facebook", handle: "StripesOfficial", color: "var(--sky-blue)" },
  ];

  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-900 to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">
            GET IN <span style={{ color: "var(--lime-green)" }}>TOUCH</span>
          </h1>
          <p className="text-2xl md:text-3xl max-w-3xl" style={{ color: "var(--golden-yellow)" }}>
            Let's create something amazing together
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="p-8 rounded-xl border border-white/10 bg-zinc-900 hover:border-[var(--lime-green)] transition-all group"
              >
                <info.icon className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" style={{ color: "var(--golden-yellow)" }} />
                <h3 className="text-lg font-black mb-2 text-gray-400 uppercase tracking-wider">
                  {info.title}
                </h3>
                {info.link ? (
                  <a href={info.link} className="text-xl font-bold hover:text-[var(--lime-green)] transition-colors">
                    {info.value}
                  </a>
                ) : (
                  <p className="text-xl font-bold">{info.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center" style={{ color: "var(--lime-green)" }}>
            SEND A MESSAGE
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-2 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-lg bg-zinc-900 border border-white/10 focus:border-[var(--lime-green)] focus:outline-none text-white transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-2 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-lg bg-zinc-900 border border-white/10 focus:border-[var(--lime-green)] focus:outline-none text-white transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-bold mb-2 uppercase tracking-wider">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-lg bg-zinc-900 border border-white/10 focus:border-[var(--lime-green)] focus:outline-none text-white transition-colors"
              >
                <option value="">Select a subject</option>
                <option value="booking">Booking Inquiry</option>
                <option value="collaboration">Collaboration</option>
                <option value="remix">Remix Request</option>
                <option value="press">Press & Media</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold mb-2 uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-6 py-4 rounded-lg bg-zinc-900 border border-white/10 focus:border-[var(--lime-green)] focus:outline-none text-white transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 font-bold uppercase tracking-wider rounded-lg transition-all hover:scale-105"
              style={{
                backgroundColor: "var(--lime-green)",
                color: "#000",
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center" style={{ color: "var(--lime-green)" }}>
            CONNECT ON SOCIAL
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href="#"
                className="p-8 rounded-xl border border-white/10 bg-zinc-900 hover:border-[var(--lime-green)] transition-all group text-center"
              >
                <social.icon className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" style={{ color: social.color }} />
                <h3 className="text-2xl font-black mb-2">{social.name}</h3>
                <p className="text-gray-400 font-semibold">{social.handle}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

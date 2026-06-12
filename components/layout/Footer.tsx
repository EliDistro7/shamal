import Link from "next/link";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { FaLinkedinIn, FaFacebook, FaXTwitter } from "react-icons/fa6";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Certifications", href: "/certifications" },
  { label: "Design Portfolio", href: "/design-portfolio" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Road Construction",
  "Bridge Design",
  "Building Construction",
  "Logistics & Freight",
  "Warehousing",
  "Infrastructure Rehab",
];

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1 — Brand */}
        <div>
          <div className="mb-4">
            <p className="font-display font-bold text-xl uppercase tracking-wider">
              SHAMAL (T) LIMITED
            </p>
            <p className="text-xs text-gray-400 uppercase tracking-[0.15em]">
              Construction &amp; Logistics
            </p>
          </div>
          <p className="text-[#B8860B] text-sm italic mb-3">
            Building Infrastructure, Connecting the Future
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Premier construction and logistics company in Tanzania — roads, bridges, buildings, and freight.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-[#C0161C] transition-colors">
              <FaLinkedinIn size={18} />
            </a>
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-[#C0161C] transition-colors">
              <FaFacebook size={18} />
            </a>
            <a href="#" aria-label="X / Twitter" className="text-gray-400 hover:text-[#C0161C] transition-colors">
              <FaXTwitter size={18} />
            </a>
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-400 text-sm hover:text-[#C0161C] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Services */}
        <div>
          <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
            Services
          </h3>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s} className="text-gray-400 text-sm">{s}</li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact */}
        <div>
          <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
            Contact
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-gray-400">
              <MapPin size={16} className="text-[#C0161C] shrink-0 mt-0.5" />
              <span>Plot No 235 Block T, Kawawa Road / P.O.Box 25554, Dar es Salaam, Tanzania</span>
            </li>
            <li className="flex gap-3 text-sm text-gray-400">
              <Phone size={16} className="text-[#C0161C] shrink-0" />
              <span>+255 785 70 70 70</span>
            </li>
            <li className="flex gap-3 text-sm text-gray-400">
              <Phone size={16} className="text-[#C0161C] shrink-0" />
              <span>+255 719 48 48 48</span>
            </li>
            <li className="flex gap-3 text-sm text-gray-400">
              <Mail size={16} className="text-[#C0161C] shrink-0" />
              <a href="mailto:shamalcotz@gmail.com" className="hover:text-white transition-colors">
                shamalcotz@gmail.com
              </a>
            </li>
            <li className="flex gap-3 text-sm text-gray-400">
              <Globe size={16} className="text-[#C0161C] shrink-0" />
              <a href="https://www.shamalcotz.com" className="hover:text-white transition-colors">
                www.shamalcotz.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#C0161C] py-3">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-1">
          <p className="text-white text-xs">
            © 2025 Shamal (T) Limited. All Rights Reserved.
          </p>
          <a href="https://www.shamalcotz.com" className="text-white/80 text-xs hover:text-white transition-colors">
            www.shamalcotz.com
          </a>
        </div>
      </div>
    </footer>
  );
}
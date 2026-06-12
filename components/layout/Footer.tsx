import Link from "next/link";
import Image from "next/image";
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
    <footer className="bg-surface-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1 — Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3 mb-4">
            <Image
              src="/logo.png"
              alt="Shamal (T) Limited"
              width={44}
              height={44}
              className="object-contain"
            />
            <div className="flex flex-col leading-none">
              <p className="font-display font-bold text-lg text-white uppercase tracking-wider">
                SHAMAL (T) LIMITED
              </p>
              <p className="text-[10px] text-muted uppercase tracking-[0.15em] mt-0.5">
                Construction &amp; Logistics
              </p>
            </div>
          </Link>

          <p className="text-accent text-sm italic mb-3">
            Building Infrastructure, Connecting the Future
          </p>
          <p className="text-muted text-sm leading-relaxed mb-6">
            Premier construction and logistics company in Tanzania — roads, bridges, buildings, and freight.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="LinkedIn" className="text-muted hover:text-primary transition-colors duration-200">
              <FaLinkedinIn size={18} />
            </a>
            <a href="#" aria-label="Facebook" className="text-muted hover:text-primary transition-colors duration-200">
              <FaFacebook size={18} />
            </a>
            <a href="#" aria-label="X / Twitter" className="text-muted hover:text-primary transition-colors duration-200">
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
                  className="text-muted text-sm hover:text-primary transition-colors duration-200"
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
              <li key={s} className="text-muted text-sm">{s}</li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact */}
        <div>
          <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
            Contact
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-muted">
              <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
              <span>Plot No 235 Block T, Kawawa Road / P.O.Box 25554, Dar es Salaam, Tanzania</span>
            </li>
            <li className="flex gap-3 text-sm text-muted">
              <Phone size={16} className="text-primary shrink-0" />
              <a href="tel:+255785707070" className="hover:text-white transition-colors duration-200">
                +255 785 70 70 70
              </a>
            </li>
            <li className="flex gap-3 text-sm text-muted">
              <Phone size={16} className="text-primary shrink-0" />
              <a href="tel:+255719484848" className="hover:text-white transition-colors duration-200">
                +255 719 48 48 48
              </a>
            </li>
            <li className="flex gap-3 text-sm text-muted">
              <Mail size={16} className="text-primary shrink-0" />
              <a href="mailto:shamalcotz@gmail.com" className="hover:text-white transition-colors duration-200">
                shamalcotz@gmail.com
              </a>
            </li>
            <li className="flex gap-3 text-sm text-muted">
              <Globe size={16} className="text-primary shrink-0" />
              <a href="https://www.shamalcotz.com" className="hover:text-white transition-colors duration-200">
                www.shamalcotz.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-primary py-3">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-1">
          <p className="text-white text-xs">
            © 2025 Shamal (T) Limited. All Rights Reserved.
          </p>
          <a
            href="https://www.shamalcotz.com"
            className="text-white/80 text-xs hover:text-white transition-colors duration-200"
          >
            www.shamalcotz.com
          </a>
        </div>
      </div>
    </footer>
  );
}
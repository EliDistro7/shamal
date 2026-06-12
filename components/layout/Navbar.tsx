"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Certifications", href: "/certifications" },
  { label: "Design Portfolio", href: "/design-portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-border transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Shamal (T) Limited"
            width={48}
            height={48}
            className="object-contain"
            priority
          />
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-xl text-surface-dark uppercase tracking-wider">
              SHAMAL (T) LIMITED
            </span>
            <span className="font-body text-[10px] text-muted uppercase tracking-[0.15em]">
              Construction &amp; Logistics
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs uppercase tracking-wider font-body font-medium transition-colors duration-200 pb-0.5 ${
                pathname === link.href
                  ? "text-primary border-b-2 border-primary"
                  : "text-body hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 bg-primary text-white px-6 py-2.5 text-xs uppercase tracking-wider font-bold hover:bg-primary-dark transition-colors duration-200 min-h-[44px] flex items-center"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-body"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 flex flex-col px-6 pt-8 gap-6">
          {/* Logo repeat in mobile menu */}
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Image
              src="/logo.png"
              alt="Shamal (T) Limited"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="font-display font-bold text-base text-surface-dark uppercase tracking-wider">
              SHAMAL (T) LIMITED
            </span>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm uppercase tracking-wider font-body font-medium py-2 border-b border-border ${
                pathname === link.href ? "text-primary" : "text-body"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-primary text-white px-6 py-3 text-sm uppercase tracking-wider font-bold text-center mt-4"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
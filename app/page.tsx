"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Route,
  Building2,
  Home,
  Building,
  Wrench,
  Truck,
  Package,
  Warehouse,
  ShieldCheck,
  Target,
  Star,
  Phone,
  Mail,
  MapPin,
  Globe,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

// ─── Reusable primitives ───────────────────────────────────────────────────────

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <p className="text-accent text-eyebrow font-bold uppercase tracking-[0.15em] mb-2 font-display">
        {children}
      </p>
      <div className="h-1 w-16 bg-primary mb-5" />
    </div>
  );
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center clip-diagonal-hero overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=85"
        alt="Construction site with crane, Dar es Salaam"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-24">
        <div className="max-w-4xl">
          <FadeUp delay={0.1}>
            <p className="text-accent text-eyebrow font-bold uppercase tracking-[0.2em] mb-5 font-display">
              SHAMAL (T) LIMITED
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <h1 className="font-display text-display-xl text-white uppercase leading-[1.05] mb-6">
              Building Infrastructure,
              <br />
              Connecting the Future
            </h1>
          </FadeUp>

          <FadeUp delay={0.4}>
            <p className="text-white/80 text-body-lg max-w-2xl mb-10">
              Premier construction and logistics company in Tanzania — roads,
              bridges, buildings, and freight.
            </p>
          </FadeUp>

          <FadeUp delay={0.55}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="bg-primary text-white px-8 py-3 uppercase tracking-wider text-sm font-bold hover:bg-primary-dark transition-colors rounded-sm inline-flex items-center gap-2"
              >
                View Our Projects
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="border border-white text-white px-8 py-3 uppercase tracking-wider text-sm font-bold hover:bg-white hover:text-primary transition-colors rounded-sm"
              >
                Get a Quote
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="text-white/60" size={32} />
      </div>
    </section>
  );
}

// ─── Section 2: Stats Bar ─────────────────────────────────────────────────────

const stats = [
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

function StatsBar() {
  return (
    <section className="bg-primary py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/20">
          {stats.map((s, i) => (
            <div key={i} className="px-8 py-4 text-center">
              <div className="font-display text-5xl text-white font-black leading-none mb-2">
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <p className="text-white/70 text-sm uppercase tracking-wider font-body">
                {s.label}
              </p>
            </div>
          ))}
          {/* TZ & Beyond */}
          <div className="px-8 py-4 text-center">
            <div className="font-display text-4xl text-white font-black leading-none mb-2">
              TZ &amp; Beyond
            </div>
            <p className="text-white/70 text-sm uppercase tracking-wider font-body">
              Our Reach
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Services Overview ─────────────────────────────────────────────

const constructionServices = [
  { icon: Route, title: "Road Construction & Maintenance" },
  { icon: Building2, title: "Bridge Design & Construction" },
  { icon: Home, title: "Residential Building Construction" },
  { icon: Building, title: "Commercial Building Construction" },
  { icon: Wrench, title: "Infrastructure Rehabilitation & Expansion" },
];

const logisticsServices = [
  { icon: Truck, title: "Heavy Equipment Transportation" },
  { icon: Package, title: "Supply Chain & Freight Management" },
  { icon: Warehouse, title: "Construction Material Delivery" },
  { icon: Warehouse, title: "Warehousing & Storage Solutions" },
];

function ServicesOverview() {
  return (
    <section className="bg-surface-light py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp>
          <SectionEyebrow>What We Do</SectionEyebrow>
          <h2 className="font-heading text-display-lg text-surface-dark mb-12">
            Our Services
          </h2>
        </FadeUp>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Construction */}
          <div className="lg:col-span-5">
            <div className="bg-primary px-6 py-4 mb-4">
              <h3 className="font-display text-white text-xl uppercase tracking-wider font-bold">
                Construction Services
              </h3>
            </div>
            <div className="space-y-3">
              {constructionServices.map((s, i) => (
                <FadeUp key={i} delay={i * 0.08}>
                  <div className="bg-white border-l-4 border-primary px-5 py-4 flex items-center gap-4 hover:shadow-md transition-shadow group cursor-pointer">
                    <div className="text-primary shrink-0">
                      <s.icon size={22} />
                    </div>
                    <span className="font-heading font-semibold text-body text-surface-dark group-hover:text-primary transition-colors">
                      {s.title}
                    </span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Logistics */}
          <div className="lg:col-span-7">
            <div className="bg-surface-dark px-6 py-4 mb-4">
              <h3 className="font-display text-white text-xl uppercase tracking-wider font-bold">
                Logistics Services
              </h3>
            </div>
            <div className="space-y-3">
              {logisticsServices.map((s, i) => (
                <FadeUp key={i} delay={i * 0.08}>
                  <div className="bg-white border-l-4 border-primary px-5 py-4 flex items-center gap-4 hover:shadow-md transition-shadow group cursor-pointer">
                    <div className="text-primary shrink-0">
                      <s.icon size={22} />
                    </div>
                    <span className="font-heading font-semibold text-body text-surface-dark group-hover:text-primary transition-colors">
                      {s.title}
                    </span>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Logistics image */}
            <div className="mt-4 relative h-48 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=80"
                alt="Logistics fleet and freight operations"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-surface-dark/40" />
            </div>
          </div>
        </div>

        {/* Quote band */}
        <FadeUp delay={0.2}>
          <div className="bg-surface-dark mt-12 py-10 px-8 text-center">
            <p className="text-white/90 text-body-lg italic max-w-3xl mx-auto font-body">
              "Our team of experts ensures that every project is executed
              efficiently, meeting both local and international standards."
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 4: Featured Projects ─────────────────────────────────────────────

const projects = [
  {
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    alt: "Steel structure framework industrial complex",
    category: "CIVIL",
    title: "Steel Structure Framework",
    subtitle: "Industrial Complex",
  },
  {
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
    alt: "Reinforced concrete foundation works Dar es Salaam",
    category: "BUILDINGS",
    title: "Reinforced Concrete Foundation",
    subtitle: "Dar es Salaam",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    alt: "Road grading and earthmoving operations",
    category: "ROADS",
    title: "Road Grading Works",
    subtitle: "Earth Levelling Operations",
  },
];

function FeaturedProjects() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp>
          <SectionEyebrow>Our Work</SectionEyebrow>
          <h2 className="font-heading text-display-lg text-surface-dark mb-12">
            Recent Projects
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="relative overflow-hidden group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white text-xs uppercase tracking-wider px-3 py-1 rounded-full font-display font-bold">
                      {p.category}
                    </span>
                  </div>
                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display text-white text-xl font-bold uppercase leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-white/70 text-caption mt-1 font-body">
                      {p.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/projects"
              className="bg-primary text-white px-8 py-3 uppercase tracking-wider text-sm font-bold hover:bg-primary-dark transition-colors rounded-sm inline-flex items-center gap-2"
            >
              View All Projects
              <ArrowRight size={16} />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 5: About / Why Shamal ───────────────────────────────────────────

const values = [
  { icon: CheckCircle, label: "Quality & Excellence" },
  { icon: ShieldCheck, label: "Integrity & Transparency" },
  { icon: Star, label: "Innovation & Sustainability" },
  { icon: Target, label: "Customer Satisfaction" },
];

function AboutSection() {
  return (
    <section className="py-20 bg-surface-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Image side */}
          <FadeUp className="lg:col-span-5" delay={0}>
            <div className="relative">
              <div className="relative h-[480px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80"
                  alt="Bridge construction project in Tanzania"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
              {/* Diagonal red accent bar */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary clip-diagonal z-10" />
            </div>
          </FadeUp>

          {/* Text side */}
          <div className="lg:col-span-7">
            <FadeUp delay={0.15}>
              <SectionEyebrow>About Us</SectionEyebrow>
              <h2 className="font-heading text-display-lg text-surface-dark mb-6">
                Tanzania's Trusted Infrastructure Partner
              </h2>
              <p className="text-body text-body-lg mb-5 font-body">
                Shamal (T) Limited is a premier construction and logistics
                company specialising in roads, bridges, and residential and
                commercial buildings. With a strong commitment to excellence,
                quality, and innovation, we have successfully delivered projects
                that enhance infrastructure and improve connectivity.
              </p>
              <p className="text-muted text-body mb-8 font-body">
                Our expertise extends beyond construction — we also provide
                top-tier logistics solutions, ensuring seamless transportation
                and supply chain management for various industries.
              </p>
            </FadeUp>

            {/* Values */}
            <FadeUp delay={0.3}>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {values.map((v, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-primary shrink-0">
                      <v.icon size={20} />
                    </div>
                    <span className="font-heading font-semibold text-surface-dark text-sm">
                      {v.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <Link
                href="/about"
                className="border border-primary text-primary px-8 py-3 uppercase tracking-wider text-sm font-bold hover:bg-primary hover:text-white transition-colors rounded-sm inline-flex items-center gap-2"
              >
                Learn More About Us
                <ArrowRight size={16} />
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: Certifications Strip ─────────────────────────────────────────

const certs = [
  { title: "Business Licence", body: "Government of Tanzania" },
  { title: "CRB Civil Works Contractor", body: "Class IV — Contractors Registration Board" },
  { title: "Mining Commission", body: "Local Content Plan — Ministry of Minerals" },
  { title: "OSHA Certificate", body: "Occupational Safety & Health Authority" },
  { title: "NSSF Employer Registration", body: "National Social Security Fund" },
  { title: "CRB Building Contractor", body: "Class IV — Contractors Registration Board" },
];

function CertificationsStrip() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp>
          <SectionEyebrow>Compliance</SectionEyebrow>
          <h2 className="font-heading text-display-lg text-surface-dark mb-10">
            Certified &amp; Accredited
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {certs.map((c, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="bg-surface-light border border-border p-5 hover:shadow-md transition-shadow h-full flex flex-col items-center text-center">
                <div className="text-primary mb-3">
                  <ShieldCheck size={28} />
                </div>
                <span className="text-accent text-xs font-display font-bold mb-1">
                  0{i + 1}
                </span>
                <h3 className="font-heading font-bold text-surface-dark text-sm leading-tight mb-2">
                  {c.title}
                </h3>
                <p className="text-muted text-caption font-body leading-tight">
                  {c.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.4}>
          <p className="text-center text-muted text-caption mt-6 font-body">
            Copies of certificates available on request.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 7: CTA Banner ────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <FadeUp>
          <h2 className="font-display text-display-lg text-white uppercase mb-4">
            Ready to Build Something Great?
          </h2>
          <p className="text-white/80 text-body-lg mb-10 font-body">
            Contact our team to discuss your project.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary px-8 py-3 uppercase tracking-wider text-sm font-bold hover:bg-surface-light transition-colors rounded-sm"
            >
              Get a Quote
            </Link>
            <Link
              href="tel:+255719484848"
              className="border border-white text-white px-8 py-3 uppercase tracking-wider text-sm font-bold hover:bg-white hover:text-primary transition-colors rounded-sm inline-flex items-center gap-2"
            >
              <Phone size={16} />
              Call Us Now
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 8: Contact Teaser ────────────────────────────────────────────────

function ContactTeaser() {
  return (
    <section className="py-20 bg-surface-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp>
          <SectionEyebrow>Get In Touch</SectionEyebrow>
          <h2 className="font-heading text-display-lg text-surface-dark mb-10">
            Find Us
          </h2>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Contact details */}
          <FadeUp delay={0.1}>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-surface-dark mb-1">
                    Head Office
                  </h3>
                  <p className="text-body font-body">
                    Plot No 235 Block T, Kawawa Road
                    <br />
                    P.O.Box 25554, Dar es Salaam, Tanzania
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-surface-dark mb-1">
                    Phone
                  </h3>
                  <p className="text-body font-body">
                    Mobile: +255 785 70 70 70
                    <br />
                    Office: +255 719 48 48 48
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-surface-dark mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:shamalcotz@gmail.com"
                    className="text-primary hover:text-primary-dark transition-colors font-body"
                  >
                    shamalcotz@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 shrink-0">
                  <Globe size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-surface-dark mb-1">
                    Website
                  </h3>
                  <a
                    href="https://www.shamalcotz.com"
                    className="text-primary hover:text-primary-dark transition-colors font-body"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.shamalcotz.com
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="bg-primary text-white px-8 py-3 uppercase tracking-wider text-sm font-bold hover:bg-primary-dark transition-colors rounded-sm inline-flex items-center gap-2"
                >
                  Send Us a Message
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </FadeUp>

          {/* Map embed */}
          <FadeUp delay={0.2}>
            <div className="border border-border overflow-hidden h-[380px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.966!2d39.2494!3d-6.8025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b2e0d0d0d0d%3A0x0!2sKawawa+Road%2C+Dar+es+Salaam%2C+Tanzania!5e0!3m2!1sen!2stz!4v1699999999"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shamal (T) Limited office location — Kawawa Road, Dar es Salaam"
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesOverview />
      <FeaturedProjects />
      <AboutSection />
      <CertificationsStrip />
      <CTABanner />
      <ContactTeaser />
    </>
  );
}
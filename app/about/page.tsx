"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Target,
  Eye,
  Star,
  CheckCircle,
  ShieldCheck,
  Lightbulb,
  Users,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

// ─── Reusable primitives ──────────────────────────────────────────────────────

function SectionEyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div>
      <p className={`text-eyebrow font-bold uppercase tracking-[0.15em] mb-2 font-display ${light ? "text-accent" : "text-accent"}`}>
        {children}
      </p>
      <div className={`h-1 w-16 mb-5 ${light ? "bg-white/40" : "bg-primary"}`} />
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
          }, 1500 / steps);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Section 1: Page Header Banner ───────────────────────────────────────────

function PageHeader() {
  return (
    <section className="relative min-h-[60vh] flex items-end clip-diagonal overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1800&q=85"
        alt="Bridge construction infrastructure in Tanzania"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-surface-dark/70" />
      {/* Red diagonal overlay strip */}
      <div className="absolute inset-0 bg-primary/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pb-24 pt-40">
        <FadeUp delay={0.1}>
          <SectionEyebrow light>About Us</SectionEyebrow>
        </FadeUp>
        <FadeUp delay={0.25}>
          <h1 className="font-display text-display-xl text-white uppercase leading-[1.05] mb-4">
            Building Tanzania's Future
          </h1>
        </FadeUp>
        <FadeUp delay={0.4}>
          <p className="text-white/80 text-body-lg max-w-2xl font-body">
            A decade of delivering infrastructure excellence across roads,
            bridges, buildings, and logistics.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 2: Company Story ─────────────────────────────────────────────────

function CompanyStory() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Image left 5/12 */}
          <FadeUp className="lg:col-span-5" delay={0}>
            <div className="relative">
              <div className="relative h-[520px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?w=900&q=80"
                  alt="Shamal construction crew working on site"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
              {/* Accent block bottom-right */}
              <div className="absolute -bottom-5 -right-5 w-40 h-24 bg-primary z-10" />
              {/* Experience badge floating */}
              <div className="absolute bottom-8 left-6 z-20 bg-surface-dark px-6 py-4">
                <p className="font-display text-5xl text-white font-black leading-none">10<span className="text-primary">+</span></p>
                <p className="text-white/70 text-sm uppercase tracking-wider font-body mt-1">Years of Experience</p>
              </div>
            </div>
          </FadeUp>

          {/* Text right 7/12 */}
          <div className="lg:col-span-7">
            <FadeUp delay={0.15}>
              <SectionEyebrow>Our Story</SectionEyebrow>
              <h2 className="font-heading text-display-lg text-surface-dark mb-6">
                Who We Are
              </h2>
            </FadeUp>

            <FadeUp delay={0.25}>
              <p className="text-body text-body-lg font-body mb-6">
                Shamal (T) Limited is a premier construction and logistics company
                specialising in the development of roads, all types of bridges, and
                residential and commercial buildings. With a strong commitment to
                excellence, quality, and innovation, we have successfully delivered
                projects that enhance infrastructure and improve connectivity.
              </p>
              <p className="text-body font-body text-body-lg mb-8">
                Our expertise extends beyond construction — we also provide top-tier
                logistics solutions, ensuring seamless transportation and supply chain
                management for various industries. At Shamal (T) Limited, we prioritise
                professionalism, integrity, and customer satisfaction, making us a
                trusted partner in infrastructure development.
              </p>
            </FadeUp>

            {/* Quick facts */}
            <FadeUp delay={0.35}>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: CheckCircle, text: "Roads & Bridge Specialists" },
                  { icon: CheckCircle, text: "Residential & Commercial Build" },
                  { icon: CheckCircle, text: "Full Logistics Solutions" },
                  { icon: CheckCircle, text: "Dar es Salaam & Beyond" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <f.icon size={18} className="text-primary shrink-0" />
                    <span className="text-body text-sm font-body font-medium">{f.text}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.45}>
              <Link
                href="/services"
                className="bg-primary text-white px-8 py-3 uppercase tracking-wider text-sm font-bold hover:bg-primary-dark transition-colors rounded-sm inline-flex items-center gap-2"
              >
                Explore Our Services
                <ArrowRight size={16} />
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Mission, Vision, Values ──────────────────────────────────────

const values = [
  {
    icon: CheckCircle,
    label: "Quality & Excellence",
    desc: "We uphold the highest standards in every project we deliver.",
  },
  {
    icon: ShieldCheck,
    label: "Integrity & Transparency",
    desc: "Honest communication and ethical conduct at every stage.",
  },
  {
    icon: Lightbulb,
    label: "Innovation & Sustainability",
    desc: "Forward-thinking methods that respect people and environment.",
  },
  {
    icon: Users,
    label: "Customer Satisfaction",
    desc: "Your success is our benchmark for every project we complete.",
  },
];

function MissionVisionValues() {
  return (
    <section className="py-20 bg-surface-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp>
          <SectionEyebrow>What Drives Us</SectionEyebrow>
          <h2 className="font-heading text-display-lg text-surface-dark mb-12">
            Mission, Vision &amp; Values
          </h2>
        </FadeUp>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Mission — red card */}
          <FadeUp delay={0.1}>
            <div className="bg-primary p-8 h-full flex flex-col">
              <div className="bg-white/20 w-12 h-12 flex items-center justify-center mb-6">
                <Target size={24} className="text-white" />
              </div>
              <h3 className="font-display text-2xl text-white uppercase font-bold mb-4 tracking-wide">
                Our Mission
              </h3>
              <div className="h-1 w-12 bg-white/40 mb-5" />
              <p className="text-white/90 font-body leading-relaxed flex-1">
                To build high-quality, sustainable infrastructure and provide
                seamless logistics solutions that drive economic growth, enhance
                connectivity, and improve communities. We are committed to
                delivering excellence through innovation, integrity, and a
                customer-centric approach.
              </p>
            </div>
          </FadeUp>

          {/* Vision — white card */}
          <FadeUp delay={0.2}>
            <div className="bg-white border-t-4 border-primary p-8 h-full flex flex-col">
              <div className="bg-surface-light w-12 h-12 flex items-center justify-center mb-6">
                <Eye size={24} className="text-primary" />
              </div>
              <h3 className="font-display text-2xl text-surface-dark uppercase font-bold mb-4 tracking-wide">
                Our Vision
              </h3>
              <div className="h-1 w-12 bg-primary mb-5" />
              <p className="text-body font-body leading-relaxed flex-1">
                To become the most trusted and innovative construction and
                logistics company in Tanzania and beyond, setting new industry
                benchmarks in efficiency, safety, and sustainable development.
              </p>
            </div>
          </FadeUp>

          {/* Values — white card */}
          <FadeUp delay={0.3}>
            <div className="bg-white border-t-4 border-primary p-8 h-full flex flex-col">
              <div className="bg-surface-light w-12 h-12 flex items-center justify-center mb-6">
                <Star size={24} className="text-primary" />
              </div>
              <h3 className="font-display text-2xl text-surface-dark uppercase font-bold mb-4 tracking-wide">
                Our Values
              </h3>
              <div className="h-1 w-12 bg-primary mb-5" />
              <ul className="space-y-4 flex-1">
                {values.map((v, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <v.icon size={18} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-heading font-semibold text-surface-dark text-sm">
                        {v.label}
                      </p>
                      <p className="text-muted text-caption font-body">{v.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Stats Bar (dark variant) ─────────────────────────────────────

const stats = [
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

function StatsBar() {
  return (
    <section className="bg-surface-dark py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {stats.map((s, i) => (
            <div key={i} className="px-8 py-6 text-center">
              <div className="font-display text-5xl text-white font-black leading-none mb-2">
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <p className="text-white/50 text-sm uppercase tracking-wider font-body">
                {s.label}
              </p>
            </div>
          ))}
          <div className="px-8 py-6 text-center">
            <div className="font-display text-4xl text-white font-black leading-none mb-2">
              TZ &amp; Beyond
            </div>
            <p className="text-white/50 text-sm uppercase tracking-wider font-body">
              Our Reach
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: Team Teaser ───────────────────────────────────────────────────

function TeamTeaser() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <FadeUp>
              <SectionEyebrow>The People</SectionEyebrow>
              <h2 className="font-heading text-display-lg text-surface-dark mb-6">
                Expert Team Behind Every Project
              </h2>
              <p className="text-body text-body-lg font-body mb-8">
                Our multidisciplinary team brings decades of combined experience
                across structural engineering, civil works, quantity surveying,
                and logistics management — ensuring every project is delivered
                on time, on budget, and to the highest standard.
              </p>
              <Link
                href="/team"
                className="border border-primary text-primary px-8 py-3 uppercase tracking-wider text-sm font-bold hover:bg-primary hover:text-white transition-colors rounded-sm inline-flex items-center gap-2"
              >
                Meet the Team
                <ArrowRight size={16} />
              </Link>
            </FadeUp>
          </div>

          <FadeUp className="lg:col-span-5" delay={0.2}>
            <div className="relative h-80 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80"
                alt="Shamal engineering and construction team on site"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-surface-dark/30" />
              {/* Red bottom border accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: CTA Banner ────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <FadeUp>
          <h2 className="font-display text-display-lg text-white uppercase mb-4">
            Ready to Build Something Great?
          </h2>
          <p className="text-white/80 text-body-lg mb-10 font-body">
            Contact our team to discuss your project requirements.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary px-8 py-3 uppercase tracking-wider text-sm font-bold hover:bg-surface-light transition-colors rounded-sm"
            >
              Get a Quote
            </Link>
            <Link
              href="/projects"
              className="border border-white text-white px-8 py-3 uppercase tracking-wider text-sm font-bold hover:bg-white hover:text-primary transition-colors rounded-sm inline-flex items-center gap-2"
            >
              View Our Projects
              <ArrowRight size={16} />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <PageHeader />
      <CompanyStory />
      <MissionVisionValues />
      <StatsBar />
      <TeamTeaser />
      <CTABanner />
    </>
  );
}
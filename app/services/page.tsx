"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Route,
  Building2,
  Home,
  Building,
  Wrench,
  TowerControl,
  Truck,
  Package,
  Container,
  Warehouse,
  ArrowRight,
  PhoneCall,
} from "lucide-react";

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionEyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div>
      <p className="text-accent text-eyebrow font-bold uppercase tracking-[0.15em] mb-2 font-display">
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const constructionServices = [
  {
    icon: Route,
    title: "Road Construction & Maintenance",
    desc: "Full-cycle road works — design, build, and resurface. From rural feeder roads to urban arterials, we deliver durable surfaces built for Tanzania's conditions.",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80",
    alt: "Road construction and maintenance works",
  },
  {
    icon: Building2,
    title: "Bridge Design & Construction",
    desc: "All bridge types — beam, arch, suspension, and culverts. Our engineers handle structural design through to finished construction across rivers and valleys.",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    alt: "Bridge design and construction project",
  },
  {
    icon: Home,
    title: "Residential Building Construction",
    desc: "Homes, villas, and residential compounds built to specification. We manage the entire build — foundation to finishing — with transparent cost reporting.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    alt: "Residential building construction",
  },
  {
    icon: Building,
    title: "Commercial Building Construction",
    desc: "Offices, retail centres, warehouses, and high-rise developments. Built to international standards with full project management and handover documentation.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    alt: "Commercial building construction",
  },
  {
    icon: Wrench,
    title: "Infrastructure Rehabilitation & Expansion",
    desc: "Assess, repair, and upgrade ageing infrastructure. We extend the life of existing assets — roads, bridges, and buildings — cost-effectively and safely.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    alt: "Infrastructure rehabilitation and expansion works",
  },
  {
    icon: TowerControl,
    title: "High Rise Buildings",
    desc: "Structural and finishing works for multi-storey developments. Our teams handle reinforced concrete frames, curtain walling, MEP coordination, and fit-out.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    alt: "High rise building structural works",
  },
];

const logisticsServices = [
  {
    icon: Truck,
    title: "Heavy Equipment Transportation",
    desc: "Safe movement of cranes, excavators, and oversized machinery across Tanzania. We handle permits, route surveys, and specialised lowbed transport.",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
    alt: "Heavy equipment transportation logistics",
  },
  {
    icon: Package,
    title: "Supply Chain & Freight Management",
    desc: "End-to-end logistics coordination — sourcing, customs clearing, inland haulage, and last-mile delivery for construction and industrial clients.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    alt: "Supply chain and freight management",
  },
  {
    icon: Container,
    title: "Construction Material Delivery",
    desc: "Reliable bulk delivery of aggregates, steel, cement, and structural materials to site. Just-in-time scheduling keeps your project on programme.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    alt: "Construction material delivery and logistics",
  },
  {
    icon: Warehouse,
    title: "Warehousing & Storage Solutions",
    desc: "Secure, managed storage facilities for construction materials and equipment. Flexible short- and long-term arrangements with inventory management.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
    alt: "Warehousing and storage solutions",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Consultation",
    desc: "We meet to understand your project scope, site conditions, and budget — no obligation, no jargon.",
  },
  {
    number: "02",
    title: "Survey & Planning",
    desc: "Our engineers and surveyors conduct a full site assessment and produce a detailed project plan.",
  },
  {
    number: "03",
    title: "Design & Costing",
    desc: "Architectural renders and a detailed Bill of Quantities are provided for your approval.",
  },
  {
    number: "04",
    title: "Execution",
    desc: "Construction or logistics operations begin with full project management and regular client reporting.",
  },
  {
    number: "05",
    title: "Handover",
    desc: "Completed project delivered with all documentation, warranties, and after-care support included.",
  },
];

// ─── Section 1: Page Header ───────────────────────────────────────────────────

function PageHeader() {
  return (
    <section className="relative min-h-[55vh] flex items-end clip-diagonal overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1800&q=85"
        alt="Construction and logistics services overview"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-surface-dark/75" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pb-24 pt-40">
        <FadeUp delay={0.1}>
          <SectionEyebrow light>What We Do</SectionEyebrow>
        </FadeUp>
        <FadeUp delay={0.25}>
          <h1 className="font-display text-display-xl text-white uppercase leading-[1.05] mb-4">
            Our Services
          </h1>
        </FadeUp>
        <FadeUp delay={0.4}>
          <p className="text-white/80 text-body-lg max-w-2xl font-body">
            Construction excellence meets logistics precision — delivered across
            Tanzania by a team that has been doing it for over a decade.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 2: Construction Services ────────────────────────────────────────

function ServiceCard({
  service,
  index,
}: {
  service: (typeof constructionServices)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeUp delay={index * 0.08}>
      <div
        className={`bg-white border border-border group transition-all duration-300 hover:shadow-lg ${
          hovered ? "border-b-4 border-b-primary" : "border-b-4 border-b-transparent"
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={service.image}
            alt={service.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-surface-dark/30 group-hover:bg-surface-dark/10 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="w-11 h-11 bg-primary flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110">
            <service.icon size={22} className="text-white" />
          </div>
          <h3 className="font-heading font-bold text-surface-dark text-lg mb-3">
            {service.title}
          </h3>
          <p className="text-muted font-body text-sm leading-relaxed mb-4">
            {service.desc}
          </p>
          <Link
            href="/contact"
            className="text-primary text-sm font-bold uppercase tracking-wider inline-flex items-center gap-1 hover:gap-3 transition-all duration-200"
          >
            Enquire <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </FadeUp>
  );
}

function ConstructionServices() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp>
          <SectionEyebrow>Build</SectionEyebrow>
          <h2 className="font-heading text-display-lg text-surface-dark mb-4">
            Construction Services
          </h2>
          <p className="text-muted font-body text-body-lg max-w-2xl mb-12">
            From a single residential build to large-scale civil infrastructure,
            we bring engineering rigour and site experience to every project.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {constructionServices.map((s, i) => (
            <ServiceCard key={i} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Logistics Services ───────────────────────────────────────────

function LogisticsServices() {
  return (
    <section className="py-20 bg-surface-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp>
          <SectionEyebrow>Move</SectionEyebrow>
          <h2 className="font-heading text-display-lg text-surface-dark mb-4">
            Logistics Services
          </h2>
          <p className="text-muted font-body text-body-lg max-w-2xl mb-12">
            A dependable logistics arm that keeps construction sites supplied,
            heavy equipment moving, and supply chains running on schedule.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6">
          {logisticsServices.map((s, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="bg-white border border-border group hover:shadow-lg transition-all duration-300 flex gap-0 overflow-hidden">
                {/* Image strip left */}
                <div className="relative w-40 shrink-0 overflow-hidden hidden sm:block">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="160px"
                  />
                  <div className="absolute inset-0 bg-surface-dark/20" />
                </div>

                {/* Content right */}
                <div className="p-6 flex flex-col justify-between flex-1 border-l-4 border-primary">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <s.icon size={20} className="text-primary shrink-0" />
                      <h3 className="font-heading font-bold text-surface-dark text-base">
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-muted font-body text-sm leading-relaxed mb-4">
                      {s.desc}
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="text-primary text-sm font-bold uppercase tracking-wider inline-flex items-center gap-1 hover:gap-3 transition-all duration-200 self-start"
                  >
                    Enquire <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Process Steps ─────────────────────────────────────────────────

function ProcessSteps() {
  return (
    <section className="bg-surface-dark py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp>
          <SectionEyebrow>How It Works</SectionEyebrow>
          <h2 className="font-heading text-display-lg text-white mb-16">
            Our Process
          </h2>
        </FadeUp>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block">
          {/* Connector line */}
          <div className="relative mb-0">
            <div className="absolute top-[2.75rem] left-[calc(10%-1px)] right-[calc(10%-1px)] h-px border-t-2 border-dashed border-white/20 z-0" />
            <div className="grid grid-cols-5 gap-4 relative z-10">
              {processSteps.map((step, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center">
                    {/* Circle */}
                    <div className="w-[5.5rem] h-[5.5rem] rounded-full border-2 border-white/20 bg-surface-mid flex items-center justify-center mb-5 relative z-10">
                      <span className="font-display text-2xl text-primary font-black">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-display text-white text-lg uppercase font-bold tracking-wide mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/50 text-sm font-body leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden space-y-0">
          {processSteps.map((step, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="flex gap-6 pb-10 relative">
                {/* Left: number + line */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border-2 border-white/20 bg-surface-mid flex items-center justify-center shrink-0">
                    <span className="font-display text-xl text-primary font-black">
                      {step.number}
                    </span>
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="flex-1 w-px border-l-2 border-dashed border-white/20 mt-3" />
                  )}
                </div>

                {/* Right: content */}
                <div className="pt-3 pb-4">
                  <h3 className="font-display text-white text-lg uppercase font-bold tracking-wide mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm font-body leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: CTA Banner ────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <FadeUp>
            <h2 className="font-display text-display-lg text-white uppercase leading-tight">
              Let's Discuss Your Project
            </h2>
            <p className="text-white/80 text-body-lg font-body mt-4">
              Whether it's a road, a building, or a logistics challenge — our
              team is ready to scope, plan, and deliver.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Link
                href="/contact"
                className="bg-white text-primary px-8 py-3 uppercase tracking-wider text-sm font-bold hover:bg-surface-light transition-colors rounded-sm text-center"
              >
                Get a Quote
              </Link>
              <Link
                href="tel:+255719484848"
                className="border border-white text-white px-8 py-3 uppercase tracking-wider text-sm font-bold hover:bg-white hover:text-primary transition-colors rounded-sm inline-flex items-center justify-center gap-2"
              >
                <PhoneCall size={16} />
                +255 719 48 48 48
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      <PageHeader />
      <ConstructionServices />
      <LogisticsServices />
      <ProcessSteps />
      <CTABanner />
    </>
  );
}
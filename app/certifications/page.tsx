'use client';

import { ShieldCheck, FileText, HardHat, Zap, Users, Building2 } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

interface Certification {
  id: string;
  name: string;
  body: string;
  category: string;
  description: string;
  icon: React.ElementType;
}

const CERTIFICATIONS: Certification[] = [
  {
    id: '01',
    name: 'Business Licence',
    body: 'Government of Tanzania',
    category: 'Legal',
    description:
      'Officially registered and licensed to operate as a construction and logistics business within the United Republic of Tanzania.',
    icon: FileText,
  },
  {
    id: '02',
    name: 'CRB Civil Works Contractor',
    body: 'Contractors Registration Board',
    category: 'Class IV',
    description:
      'Certified contractor for civil works including roads, bridges, and infrastructure projects under the Contractors Registration Board of Tanzania.',
    icon: Building2,
  },
  {
    id: '03',
    name: 'Mining Commission — Local Content Plan',
    body: 'Ministry of Minerals',
    category: 'Compliance',
    description:
      'Approved local content plan in compliance with Tanzania\'s mining sector regulations, enabling participation in mineral sector infrastructure projects.',
    icon: HardHat,
  },
  {
    id: '04',
    name: 'OSHA Certificate of Registration',
    body: 'Occupational Safety & Health Authority',
    category: 'Safety',
    description:
      'Registered with OSHA Tanzania, affirming our commitment to workplace safety standards and occupational health practices on every site.',
    icon: ShieldCheck,
  },
  {
    id: '05',
    name: 'NSSF Employer Registration',
    body: 'National Social Security Fund',
    category: 'Employment',
    description:
      'Fully registered employer with the National Social Security Fund, ensuring all staff receive lawful social security contributions.',
    icon: Users,
  },
  {
    id: '06',
    name: 'CRB Building Contractor',
    body: 'Contractors Registration Board',
    category: 'Class IV',
    description:
      'Certified building contractor for residential and commercial construction projects, registered under the Contractors Registration Board of Tanzania.',
    icon: Zap,
  },
];

const COMPLIANCE_STATS = [
  { value: '6', label: 'Active Certifications' },
  { value: '100%', label: 'Regulatory Compliance' },
  { value: 'OSHA', label: 'Safety Certified' },
  { value: 'CRB', label: 'Class IV Registered' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PageHeader() {
  return (
    <section className="relative bg-surface-dark clip-diagonal-hero min-h-64 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary z-20" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <p className="text-accent text-eyebrow uppercase tracking-[0.15em] font-bold mb-3">
          Compliance
        </p>
        <div className="h-1 w-16 bg-primary mb-6" />
        <h1 className="font-display text-display-lg text-white uppercase leading-tight mb-4">
          Certifications &amp; Accreditations
        </h1>
        <p className="text-white/70 text-body-lg max-w-2xl">
          We adhere to the highest industry standards. Our certifications reflect our commitment
          to quality, safety, and excellence in construction and logistics.
        </p>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {COMPLIANCE_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-10 px-6 text-center ${
                i < COMPLIANCE_STATS.length - 1 ? 'border-r border-white/20' : ''
              }`}
            >
              <p className="font-display text-5xl text-white font-black leading-none mb-2">
                {stat.value}
              </p>
              <p className="text-white/70 text-caption uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({ cert }: { cert: Certification }) {
  const Icon = cert.icon;

  return (
    <article className="group bg-white border-l-4 border-primary hover:shadow-lg transition-shadow duration-300 flex gap-6 p-6">
      {/* Number + Icon column */}
      <div className="flex flex-col items-center gap-3 flex-shrink-0">
        <span className="font-display text-4xl text-accent font-black leading-none">
          {cert.id}
        </span>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
          <Icon size={18} className="text-primary" />
        </div>
      </div>

      {/* Vertical divider */}
      <div className="w-px bg-border flex-shrink-0" />

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Category badge */}
        <span className="self-start inline-block bg-primary text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full mb-3">
          {cert.category}
        </span>

        <h3 className="font-heading text-heading-2 text-surface-dark font-semibold leading-snug mb-1">
          {cert.name}
        </h3>

        <p className="text-accent text-caption font-bold uppercase tracking-wider mb-4">
          {cert.body}
        </p>

        <p className="text-muted text-caption leading-relaxed flex-1">{cert.description}</p>

        <div className="mt-5 pt-4 border-t border-border flex items-center gap-2">
          <ShieldCheck size={13} className="text-primary flex-shrink-0" />
          <span className="text-caption text-muted italic">
            Copies available on request
          </span>
        </div>
      </div>
    </article>
  );
}

function DisclaimerBand() {
  return (
    <section className="bg-surface-light border-y border-border py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="flex-shrink-0">
            <ShieldCheck size={32} className="text-primary" />
          </div>
          <div>
            <p className="font-heading text-body text-surface-dark font-semibold mb-1">
              Document Verification
            </p>
            <p className="text-muted text-caption leading-relaxed max-w-3xl">
              For compliance or tendering purposes, certified copies of all registration
              certificates and licences are available upon request. Contact our office at{' '}
              <a
                href="mailto:shamalcotz@gmail.com"
                className="text-primary font-bold hover:text-primary-dark transition-colors duration-200"
              >
                shamalcotz@gmail.com
              </a>{' '}
              or call{' '}
              <a
                href="tel:+255719484848"
                className="text-primary font-bold hover:text-primary-dark transition-colors duration-200"
              >
                +255 719 48 48 48
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="bg-surface-dark py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div>
            <p className="text-accent text-eyebrow uppercase tracking-[0.15em] font-bold mb-3">
              Standards &amp; Trust
            </p>
            <div className="h-1 w-16 bg-primary mb-5" />
            <h2 className="font-display text-display-lg text-white uppercase leading-tight mb-4">
              Built on a Foundation<br />of Compliance
            </h2>
            <p className="text-white/60 text-body-lg max-w-lg">
              Every project we undertake is backed by fully accredited registrations. We don't
              cut corners — in construction or in compliance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 flex-shrink-0">
            <a
              href="/contact"
              className="bg-primary text-white px-8 py-3 text-caption uppercase tracking-wider font-bold hover:bg-primary-dark transition-colors duration-200 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-dark"
            >
              Request Documents
            </a>
            <a
              href="/projects"
              className="border border-white/30 text-white px-8 py-3 text-caption uppercase tracking-wider font-bold hover:border-white transition-colors duration-200 text-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-surface-dark"
            >
              View Our Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CertificationsPage() {
  return (
    <main id="main-content">
      <PageHeader />
      <StatsBar />
      <DisclaimerBand />

      {/* Certifications grid */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-accent text-eyebrow uppercase tracking-[0.15em] font-bold mb-2">
              Registrations
            </p>
            <div className="h-1 w-16 bg-primary mb-5" />
            <h2 className="font-heading text-display-lg text-surface-dark font-semibold leading-tight">
              Our Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <CertCard key={cert.id} cert={cert} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
'use client';

import { Award, Briefcase } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

interface TeamMember {
  name: string;
  role: string;
  years: number;
  department: 'Technical' | 'Specialist';
}

const CORE_TEAM: TeamMember[] = [
  { name: 'Hamisi Salim Sharif', role: 'Technical Director', years: 18, department: 'Technical' },
  { name: 'Marko G. Haule', role: 'Structural Engineer', years: 7, department: 'Technical' },
  { name: 'Ally Chodas', role: 'Quantity Surveyor', years: 17, department: 'Technical' },
  { name: 'Henry Kikwembe', role: 'Civil Engineer', years: 4, department: 'Technical' },
];

const SPECIALIST_TEAM: TeamMember[] = [
  { name: 'Jamary M. Yunusu', role: 'Electrical Engineer', years: 8, department: 'Specialist' },
  { name: 'Titus E. Msabila', role: 'Land Surveyor', years: 17, department: 'Specialist' },
  { name: 'Vicent Mosha', role: 'Plumbing Technician', years: 18, department: 'Specialist' },
  { name: 'Ramadhani K. Juma', role: 'Site Supervisor', years: 10, department: 'Specialist' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('');
}

// Senior = 15+ yrs, Mid = 8–14, Junior = <8
function getSeniorityLabel(years: number): { label: string; colour: string } {
  if (years >= 15) return { label: 'Senior', colour: 'bg-accent text-white' };
  if (years >= 8) return { label: 'Mid-Level', colour: 'bg-surface-mid text-white' };
  return { label: 'Junior', colour: 'bg-border text-body' };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PageHeader() {
  return (
    <section className="relative bg-surface-dark clip-diagonal-hero min-h-64 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary z-20" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <p className="text-accent text-eyebrow uppercase tracking-[0.15em] font-bold mb-3">
          The People
        </p>
        <div className="h-1 w-16 bg-primary mb-6" />
        <h1 className="font-display text-display-lg text-white uppercase leading-tight mb-4">
          Our Team
        </h1>
        <p className="text-white/70 text-body-lg max-w-xl">
          Decades of combined expertise across civil engineering, structural design, surveying,
          and logistics — the professionals behind every Shamal project.
        </p>
      </div>
    </section>
  );
}

function StatsBar() {
  const totalYears = [...CORE_TEAM, ...SPECIALIST_TEAM].reduce((s, m) => s + m.years, 0);
  const stats = [
    { value: `${CORE_TEAM.length + SPECIALIST_TEAM.length}`, label: 'Team Members' },
    { value: `${totalYears}+`, label: 'Combined Years' },
    { value: '6', label: 'Disciplines' },
    { value: '100%', label: 'In-House Expertise' },
  ];

  return (
    <section className="bg-surface-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-10 px-6 text-center ${
                i < stats.length - 1 ? 'border-r border-white/10' : ''
              }`}
            >
              <p className="font-display text-5xl text-white font-black leading-none mb-2">
                {stat.value}
              </p>
              <p className="text-white/50 text-caption uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  const initials = getInitials(member.name);
  const seniority = getSeniorityLabel(member.years);

  return (
    <article className="group bg-white border-t-4 border-primary hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="p-6 flex flex-col items-center text-center flex-1">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-5 group-hover:border-primary transition-colors duration-300">
          <span className="font-display text-2xl text-primary font-black tracking-wider">
            {initials}
          </span>
        </div>

        {/* Role badge */}
        <span className="inline-block bg-primary text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full mb-3">
          {member.role}
        </span>

        {/* Name */}
        <h3 className="font-heading text-heading-2 text-surface-dark font-semibold leading-snug mb-5">
          {member.name}
        </h3>

        {/* Divider */}
        <div className="h-px w-10 bg-border mb-5" />

        {/* Meta row */}
        <div className="flex items-center gap-4 text-caption text-muted">
          <span className="flex items-center gap-1.5">
            <Briefcase size={13} className="text-primary" />
            {member.years} yrs exp.
          </span>
          <span className="flex items-center gap-1.5">
            <Award size={13} className="text-accent" />
            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${seniority.colour}`}>
              {seniority.label}
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

function TeamSection({
  title,
  eyebrow,
  members,
  dark,
}: {
  title: string;
  eyebrow: string;
  members: TeamMember[];
  dark?: boolean;
}) {
  return (
    <section className={`py-20 ${dark ? 'bg-surface-light' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-accent text-eyebrow uppercase tracking-[0.15em] font-bold mb-2">
            {eyebrow}
          </p>
          <div className="h-1 w-16 bg-primary mb-5" />
          <h2 className="font-heading text-display-lg text-surface-dark font-semibold leading-tight">
            {title}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <TeamCard key={member.name + member.role} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuesBand() {
  const values = [
    { label: 'Safety First', desc: 'Every site, every day.' },
    { label: 'Precision', desc: 'Engineered to exact spec.' },
    { label: 'Integrity', desc: 'Transparent in all we do.' },
    { label: 'Excellence', desc: 'No shortcuts, ever.' },
  ];

  return (
    <section className="bg-surface-mid py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {values.map((v) => (
            <div key={v.label} className="bg-surface-mid px-8 py-10 text-center">
              <p className="font-display text-lg text-primary uppercase tracking-widest font-black mb-2">
                {v.label}
              </p>
              <p className="text-white/50 text-caption">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-white/60 text-eyebrow uppercase tracking-[0.15em] font-bold mb-4">
          Join Us
        </p>
        <h2 className="font-display text-display-lg text-white uppercase leading-tight mb-4">
          Work With Our Team
        </h2>
        <p className="text-white/80 text-body-lg max-w-xl mx-auto mb-10">
          We are always looking for experienced engineers, surveyors, and logistics professionals
          to grow with us.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="bg-white text-primary px-8 py-3 text-caption uppercase tracking-wider font-bold hover:bg-surface-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
          >
            Get in Touch
          </a>
          <a
            href="/projects"
            className="border border-white text-white px-8 py-3 text-caption uppercase tracking-wider font-bold hover:bg-white hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
          >
            View Our Work
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeamPage() {
  return (
    <main id="main-content">
      <PageHeader />
      <StatsBar />
      <TeamSection
        eyebrow="Core Staff"
        title="Technical Leadership"
        members={CORE_TEAM}
        dark={false}
      />
      <ValuesBand />
      <TeamSection
        eyebrow="Specialists"
        title="Specialist Personnel"
        members={SPECIALIST_TEAM}
        dark
      />
      <CTABanner />
    </main>
  );
}
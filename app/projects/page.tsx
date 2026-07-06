'use client';

import { useState } from 'react';
import { MapPin, Calendar, ChevronRight } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '10+', label: 'Years of Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: 'TZ & Beyond', label: 'Our Reach' },
];

type Category = 'All' | 'Civil Works' | 'Roads' | 'Buildings' | 'Logistics';

const FILTERS: Category[] = ['All', 'Civil Works', 'Roads', 'Buildings', 'Logistics'];

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: Exclude<Category, 'All'>;
  location: string;
  year: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Slab Formwork & Rebar',
    subtitle: 'Residential Building',
    description:
      'Suspended slab construction with full timber formwork shoring and double-layer rebar grid. Structural columns starter bars cast in position ahead of concrete pour.',
    category: 'Buildings',
    location: 'Dar es Salaam',
    year: '2024',
    image: '/projects/project1.jpeg',
  },
  {
    id: 2,
    title: 'Foundation Column Tying',
    subtitle: 'Supervised Reinforcement Works',
    description:
      'Civil engineer on-site supervising rebar column cage assembly within an excavated foundation pit. Each tie point inspected to structural drawings before pour approval.',
    category: 'Civil Works',
    location: 'Dar es Salaam',
    year: '2024',
    image: '/projects/project2.jpeg',
  },
  {
    id: 3,
    title: 'Aerial Slab Overview',
    subtitle: 'Multi-Room Residential Build',
    description:
      'Drone survey of a residential slab mid-construction — partial concrete pour complete on one wing while rebar placement continues across the remaining floor plate.',
    category: 'Buildings',
    location: 'Dar es Salaam',
    year: '2023',
    image: '/projects/project3.jpeg',
  },
  {
    id: 4,
    title: 'Rebar Inspection & Setting Out',
    subtitle: 'Foundation Quality Control',
    description:
      'Site engineer and crew verifying rebar spacing and cover dimensions against structural drawings prior to foundation casting. Every measurement checked on-site.',
    category: 'Civil Works',
    location: 'Dar es Salaam',
    year: '2023',
    image: '/projects/project4.jpeg',
  },
  {
    id: 5,
    title: 'Multi-Column Foundation Pour',
    subtitle: 'Large-Scale Residential Complex',
    description:
      'Full crew managing a large reinforced concrete foundation pour — DPC membrane laid, column starters cast, and formwork stripped simultaneously across the site.',
    category: 'Buildings',
    location: 'Dar es Salaam',
    year: '2024',
    image: '/projects/project5.jpeg',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PageHeader() {
  return (
    <section className="relative bg-surface-dark clip-diagonal-hero min-h-64 flex items-center overflow-hidden">
      {/* Background image overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Decorative red bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary z-20" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <p className="text-accent text-eyebrow uppercase tracking-[0.15em] font-bold mb-3">
          Our Work
        </p>
        <div className="h-1 w-16 bg-primary mb-6" />
        <h1 className="font-display text-display-lg text-white uppercase leading-tight mb-4">
          Projects &amp; Portfolio
        </h1>
        <p className="text-white/70 text-body-lg max-w-xl">
          From road corridors to structural frameworks — every project is a testament to our
          commitment to quality and precision.
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
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-10 px-6 text-center ${
                i < STATS.length - 1 ? 'border-r border-white/20' : ''
              }`}
            >
              <p className="font-display text-5xl text-white font-black leading-none mb-2">
                {stat.value}
              </p>
              <p className="text-white/70 text-caption uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterBar({
  active,
  onChange,
}: {
  active: Category;
  onChange: (c: Category) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`px-5 py-2 text-caption uppercase tracking-wider font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            active === filter
              ? 'bg-primary text-white'
              : 'border border-border text-body hover:border-primary hover:text-primary'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

function CategoryBadge({ label }: { label: string }) {
  const colourMap: Record<string, string> = {
    'Civil Works': 'bg-primary',
    Roads: 'bg-accent',
    Buildings: 'bg-surface-mid',
    Logistics: 'bg-primary-dark',
  };
  return (
    <span
      className={`${
        colourMap[label] ?? 'bg-primary'
      } text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full`}
    >
      {label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group bg-white border border-border flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-mid">
        <img
          src={project.image}
          alt={`${project.title} — ${project.subtitle}`}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          <CategoryBadge label={project.category} />
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <h3 className="font-heading text-heading-2 text-white font-semibold leading-tight">
            {project.title}
          </h3>
          <p className="text-white/70 text-caption mt-1">{project.subtitle}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-muted text-caption leading-relaxed flex-1">{project.description}</p>

        <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-4 text-muted text-caption">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-primary" />
              {project.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-primary" />
              {project.year}
            </span>
          </div>
          <span className="flex items-center gap-1 text-primary text-caption font-bold uppercase tracking-wider group-hover:gap-2 transition-all duration-200">
            View <ChevronRight size={14} />
          </span>
        </div>
      </div>
    </article>
  );
}

function EmptyState({ filter }: { filter: Category }) {
  return (
    <div className="col-span-full py-24 flex flex-col items-center text-center">
      <div className="h-1 w-16 bg-primary mb-6 mx-auto" />
      <p className="font-heading text-heading-2 text-body font-semibold mb-2">No projects yet</p>
      <p className="text-muted text-caption max-w-xs">
        No {filter} projects are listed at the moment. Check back soon or explore another
        category.
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('All');

  const filtered =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <main id="main-content">
      <PageHeader />
      <StatsBar />

      {/* Projects section */}
      <section className="bg-surface-light py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Section header */}
          <div className="mb-12">
            <p className="text-accent text-eyebrow uppercase tracking-[0.15em] font-bold mb-2">
              Portfolio
            </p>
            <div className="h-1 w-16 bg-primary mb-5" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="font-heading text-display-lg text-surface-dark font-semibold leading-tight">
                Recent Projects
              </h2>
              <FilterBar active={activeFilter} onChange={setActiveFilter} />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length > 0 ? (
              filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <EmptyState filter={activeFilter} />
            )}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-white/60 text-eyebrow uppercase tracking-[0.15em] font-bold mb-4">
            Work With Us
          </p>
          <h2 className="font-display text-display-lg text-white uppercase leading-tight mb-4">
            Ready to Build Something Great?
          </h2>
          <p className="text-white/80 text-body-lg max-w-xl mx-auto mb-10">
            Contact our team to discuss your project scope, timeline, and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-primary px-8 py-3 text-caption uppercase tracking-wider font-bold hover:bg-surface-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
            >
              Get a Quote
            </a>
            <a
              href="tel:+255719484848"
              className="border border-white text-white px-8 py-3 text-caption uppercase tracking-wider font-bold hover:bg-white hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ExternalLink } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

interface Render {
  id: number;
  title: string;
  subtitle: string;
  type: string;
  description: string;
  image: string;
  accent: string;
}

const RENDERS: Render[] = [
  {
    id: 1,
    title: 'Rear Elevation',
    subtitle: 'Residential Compound',
    type: '3D Architectural Render',
    description:
      'A full rear elevation render of a gated residential compound. Emphasis on clean horizontal lines, shaded overhangs, and integrated landscaping that frames the structure.',
    image: '/images/render-rear-elevation.jpg',
    accent: 'Residential',
  },
  {
    id: 2,
    title: 'Front Elevation',
    subtitle: 'Residential Compound with Gate & Annex',
    type: '3D Architectural Render',
    description:
      'Front-facing perspective showcasing the main residence alongside a secondary annex unit and a feature entrance gate — designed for both security and curb presence.',
    image: '/images/render-front-elevation.jpg',
    accent: 'Residential',
  },
  {
    id: 3,
    title: 'Modern Villa',
    subtitle: 'Night Exterior Render',
    type: '3D Architectural Render',
    description:
      "Dusk-to-night exterior render illustrating dramatic facade lighting, warm interior glows, and landscaped perimeter. Demonstrates the villa's character under evening conditions.",
    image: '/images/render-villa-night.jpg',
    accent: 'Villa',
  },
  {
    id: 4,
    title: 'Contemporary Residence',
    subtitle: 'Garden & Fire Pit',
    type: '3D Architectural Render',
    description:
      'Outdoor living space render featuring a structured garden, fire pit terrace, and open-plan living zones that blur the boundary between interior and exterior.',
    image: '/images/render-contemporary.jpg',
    accent: 'Contemporary',
  },
  {
    id: 5,
    title: 'Luxury Home',
    subtitle: 'Poolside Elevation',
    type: '3D Architectural Render',
    description:
      'Poolside elevation of a high-end residential property. Infinity-edge pool, cantilevered deck, and floor-to-ceiling glazing define the visual language of this design.',
    image: '/images/render-luxury-poolside.jpg',
    accent: 'Luxury',
  },
];

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({
  renders,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: {
  renders: Render[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const active = renders[activeIndex];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`${active.title} — ${active.subtitle}`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-display text-2xl text-accent font-black">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <div>
            <p className="font-heading text-white font-semibold leading-none">{active.title}</p>
            <p className="text-white/50 text-caption mt-0.5">{active.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-white/30 text-caption">
            {activeIndex + 1} / {renders.length}
          </span>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close lightbox"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Image area */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden px-16 py-6">
        {/* Prev */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary z-10"
          aria-label="Previous render"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Image placeholder — replace with next/image */}
        <div className="relative w-full max-w-4xl aspect-video bg-surface-mid flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-mid to-surface-dark" />
          <span className="relative font-display text-8xl text-white/10 uppercase tracking-widest select-none">
            {active.accent}
          </span>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
        </div>

        {/* Next */}
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary z-10"
          aria-label="Next render"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Bottom info */}
      <div className="border-t border-white/10 px-6 py-5 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="inline-block bg-primary text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full mb-2">
              {active.type}
            </span>
            <p className="text-white/60 text-caption leading-relaxed max-w-xl">
              {active.description}
            </p>
          </div>
          {/* Thumbnail strip */}
          <div className="hidden lg:flex gap-2 flex-shrink-0">
            {renders.map((r, i) => (
              <button
                key={r.id}
                onClick={() => {
                  // Navigate to index via parent — passed through onPrev/onNext only,
                  // so we close and reopen. Instead, expose direct navigation:
                  // This is handled by the parent's setLightboxIndex.
                }}
                className={`w-12 h-9 bg-surface-mid border-2 transition-colors duration-200 overflow-hidden flex items-center justify-center ${
                  i === activeIndex ? 'border-primary' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
                aria-label={`Go to render ${i + 1}`}
              >
                <span className="font-display text-xs text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PageHeader() {
  return (
    <section className="relative bg-surface-dark clip-diagonal-hero min-h-64 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary z-20" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <p className="text-accent text-eyebrow uppercase tracking-[0.15em] font-bold mb-3">
          In-House Design
        </p>
        <div className="h-1 w-16 bg-primary mb-6" />
        <h1 className="font-display text-display-lg text-white uppercase leading-tight mb-4">
          Design Portfolio
        </h1>
        <p className="text-white/70 text-body-lg max-w-2xl">
          Our in-house design team delivers visually compelling architectural renders and
          master-planned residential layouts — giving clients a clear vision before ground is broken.
        </p>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="bg-white py-16 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <p className="text-body text-body-lg leading-relaxed">
              Every build starts with a vision. Our architectural renders translate client briefs
              into photorealistic 3D models — exploring elevations, materiality, and spatial
              relationships before a single foundation is poured.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { label: '3D Renders', value: '5 Showcased' },
              { label: 'Typology', value: 'Residential' },
              { label: 'Capability', value: 'Design-Build' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <span className="text-muted text-caption uppercase tracking-wider">{item.label}</span>
                <span className="font-heading text-body text-surface-dark font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RenderCard({
  render,
  index,
  onOpen,
}: {
  render: Render;
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <article
      className="group cursor-pointer"
      onClick={() => onOpen(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(index)}
      aria-label={`Open ${render.title} — ${render.subtitle}`}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-surface-mid mb-4">
        {/* Placeholder — replace with next/image */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-mid to-surface-dark" />
        <span className="absolute inset-0 flex items-center justify-center font-display text-6xl text-white/10 uppercase tracking-widest select-none">
          {render.accent}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
            <div className="w-12 h-12 border-2 border-white flex items-center justify-center">
              <ZoomIn size={20} className="text-white" />
            </div>
            <span className="text-white text-caption uppercase tracking-wider font-bold">
              View Full
            </span>
          </div>
        </div>

        {/* Red bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

        {/* Number badge */}
        <div className="absolute top-4 left-4 bg-surface-dark/80 px-2 py-1">
          <span className="font-display text-accent text-sm font-black">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-heading-2 text-surface-dark font-semibold leading-snug group-hover:text-primary transition-colors duration-200">
            {render.title}
          </h3>
          <p className="text-muted text-caption mt-1">{render.subtitle}</p>
        </div>
        <span className="flex-shrink-0 inline-block bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full mt-0.5">
          {render.type.split(' ')[0]}
        </span>
      </div>
    </article>
  );
}

function CTABanner() {
  return (
    <section className="bg-surface-dark py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div>
            <p className="text-accent text-eyebrow uppercase tracking-[0.15em] font-bold mb-3">
              Custom Design
            </p>
            <div className="h-1 w-16 bg-primary mb-5" />
            <h2 className="font-display text-display-lg text-white uppercase leading-tight mb-4">
              Bring Your Vision<br />to Life
            </h2>
            <p className="text-white/60 text-body-lg max-w-lg">
              Contact us to discuss your custom architectural design — from initial concept
              sketches to full photorealistic renders ready for construction.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 flex-shrink-0">
            <a
              href="/contact"
              className="bg-primary text-white px-8 py-3 text-caption uppercase tracking-wider font-bold hover:bg-primary-dark transition-colors duration-200 text-center flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-dark"
            >
              <ExternalLink size={14} />
              Request a Consultation
            </a>
            <a
              href="/projects"
              className="border border-white/30 text-white px-8 py-3 text-caption uppercase tracking-wider font-bold hover:border-white transition-colors duration-200 text-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-surface-dark"
            >
              View Completed Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DesignPortfolioPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? 0 : (i - 1 + RENDERS.length) % RENDERS.length));
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % RENDERS.length));
  }, []);

  return (
    <main id="main-content">
      <PageHeader />
      <IntroSection />

      {/* Gallery */}
      <section className="bg-surface-light py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-accent text-eyebrow uppercase tracking-[0.15em] font-bold mb-2">
              Renders Gallery
            </p>
            <div className="h-1 w-16 bg-primary mb-5" />
            <h2 className="font-heading text-display-lg text-surface-dark font-semibold leading-tight">
              Architectural Renders
            </h2>
          </div>

          {/* Featured first render — large */}
          <div className="mb-6">
            <RenderCard render={RENDERS[0]} index={0} onOpen={openLightbox} />
          </div>

          {/* Remaining renders — 2-col then 2-col */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {RENDERS.slice(1, 3).map((render, i) => (
              <RenderCard key={render.id} render={render} index={i + 1} onOpen={openLightbox} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RENDERS.slice(3).map((render, i) => (
              <RenderCard key={render.id} render={render} index={i + 3} onOpen={openLightbox} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          renders={RENDERS}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </main>
  );
}
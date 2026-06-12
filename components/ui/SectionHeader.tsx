interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  centered?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  light = false,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <p className={`text-[#B8860B] text-xs uppercase tracking-[0.15em] font-bold mb-2 font-body`}>
        {eyebrow}
      </p>
      <div className={`h-1 w-16 bg-[#C0161C] mb-4 ${centered ? "mx-auto" : ""}`} />
      <h2
        className={`font-display font-bold uppercase tracking-wide text-display-lg ${
          light ? "text-white" : "text-[#111111]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-body-lg max-w-2xl ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/70" : "text-[#777777]"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

import Link from "next/link";

type Variant = "primary" | "ghost" | "white" | "ghost-white";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[#C0161C] text-white hover:bg-[#8B0F14]",
  ghost:
    "border border-[#C0161C] text-[#C0161C] hover:bg-[#C0161C] hover:text-white",
  white:
    "bg-white text-[#C0161C] hover:bg-gray-100",
  "ghost-white":
    "border border-white text-white hover:bg-white hover:text-[#C0161C]",
};

const base =
  "inline-flex items-center justify-center px-8 py-3 text-sm uppercase tracking-wider font-bold font-body transition-all duration-200 min-h-[44px]";

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

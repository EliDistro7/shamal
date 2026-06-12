export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-[#C0161C] text-white text-xs uppercase tracking-wider px-3 py-1 rounded-full font-body font-bold">
      {children}
    </span>
  );
}

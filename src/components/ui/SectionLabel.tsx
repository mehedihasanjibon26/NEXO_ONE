type SectionLabelProps = {
  children: string;
  className?: string;
};

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div
      className={`text-label text-muted inline-flex items-center gap-3 ${className}`.trim()}
    >
      <span aria-hidden="true" className="h-px w-8 bg-white/30" />

      <span>{children}</span>
    </div>
  );
}

type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  size?: "md" | "lg";
  className?: string;
};

export function SectionHeading({
  title,
  description,
  align = "left",
  size = "lg",
  className = "",
}: SectionHeadingProps) {
  const alignmentClasses =
    align === "center"
      ? "mx-auto items-center text-center"
      : "items-start text-left";

  const titleClass = size === "lg" ? "text-display-md" : "text-heading";

  return (
    <div
      className={`flex max-w-5xl flex-col gap-6 ${alignmentClasses} ${className}`.trim()}
    >
      <h2 className={`${titleClass} text-balance`}>{title}</h2>

      {description ? (
        <p className="text-body-lg text-muted max-w-2xl text-balance">
          {description}
        </p>
      ) : null}
    </div>
  );
}


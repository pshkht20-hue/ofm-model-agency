type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`text-center mb-14 md:mb-16 ${className}`}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="heading-section">{title}</h2>
      {description && <p className="text-lead mt-5 max-w-xl mx-auto">{description}</p>}
      <div className="divider-gold max-w-xs mx-auto mt-10" />
    </div>
  );
}

interface SectionLabelProps {
  text: string;
  color?: 'moss' | 'gold' | 'white';
  className?: string;
}

export default function SectionLabel({ text, color = 'moss', className = '' }: SectionLabelProps) {
  const colorClasses = {
    moss: 'text-moss',
    gold: 'text-gold',
    white: 'text-white/60',
  };

  return (
    <span className={`section-label ${colorClasses[color]} ${className}`}>
      {text}
    </span>
  );
}

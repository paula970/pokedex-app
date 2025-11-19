interface StatIconProps {
  src: string;
  alt: string;
  className?: string;
}

const StatIcon = ({ src, alt, className = '' }: StatIconProps) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`stat-icon ${className}`}
    />
  );
};

export default StatIcon;

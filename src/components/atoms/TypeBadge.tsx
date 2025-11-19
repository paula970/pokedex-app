// bubble of type or types
interface TypeBadgeProps {
  type: string;
  backgroundColor: string;
  className?: string;
}

const TypeBadge = ({ type, backgroundColor, className = '' }: TypeBadgeProps) => {
  return (
    <span 
      className={`type-badge ${className}`}
      style={{ backgroundColor }}
    >
      {type}
    </span>
  );
};

export default TypeBadge;
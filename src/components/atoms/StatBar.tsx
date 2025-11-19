
interface StatBarProps {
  value: number;
  maxValue?: number;
  backgroundColor: string;
  className?: string;
}

const StatBar = ({ 
  value, 
  maxValue = 255, 
  backgroundColor, 
  className = '' 
}: StatBarProps) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className={`stat-bar-container ${className}`}>
      <div 
        className="stat-bar" 
        style={{ 
          width: `${percentage}%`,
          backgroundColor 
        }}
      />
    </div>
  );
};

export default StatBar;

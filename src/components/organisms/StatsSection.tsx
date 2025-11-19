import BaseStatsList from '../molecules/BaseStatsList';

interface StatsSectionProps {
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  titleColor: string;
  backgroundColor: string;
  className?: string;
}

const StatsSection = ({
  stats,
  titleColor,
  backgroundColor,
  className = ''
}: StatsSectionProps) => {
  return (
    <section className={`pokemon-stats ${className}`}>
      <h2 style={{ color: titleColor }}>Base Stats</h2>
      <BaseStatsList 
        stats={stats} 
        backgroundColor={backgroundColor}
      />
    </section>
  );
};

export default StatsSection;

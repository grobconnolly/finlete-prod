type Stat = { id: string; value: string; label: string };

export function StatBlock({
  stats,
  columns = 6,
}: {
  stats: readonly Stat[];
  columns?: 3 | 6;
}) {
  return (
    <ul className={`stats cols-${columns}`}>
      {stats.map((stat) => (
        <li key={stat.id}>
          <b>{stat.value}</b>
          <span>{stat.label}</span>
        </li>
      ))}
    </ul>
  );
}

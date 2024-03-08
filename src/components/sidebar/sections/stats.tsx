import { ProgressBar } from "@/components/progress-bar";

interface StatTabProps {
  stats: { base_stat: number; effort: number; stat?: { name: string } }[];
}

export function StatsTabDetails({ stats }: StatTabProps) {
  return (
    <table>
      <tbody>
        {stats.map(({ stat, base_stat, effort }, index) => {
          return (
            <tr key={index}>
              <td>{stat?.name.toUpperCase()}</td>
              <td>
                <ProgressBar base={base_stat} effort={effort} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

interface AboutTabProps {
  height: number;
  weight: number;
  abilities?: { ability: { name: string } }[];
}
export function AboutTabDetails({ height, weight, abilities }: AboutTabProps) {
  return (
    <table>
      <tbody>
        <tr>
          <td>Height</td>
          <td>{(height * 0.1).toFixed(2) || 0} m</td>
        </tr>
        <tr>
          <td>Weight</td>
          <td>{(weight * 0.1).toFixed(2) || 0} kg</td>
        </tr>
        <tr>
          <td>Abilities</td>
          <td>
            <ul>
              {abilities?.map(({ ability }, index) => {
                return (
                  <li key={index}>
                    <span>{ability.name}</span>
                  </li>
                );
              })}
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

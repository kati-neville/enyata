import "./progress-bar.css";

export const ProgressBar = ({
  base,
  effort,
}: {
  base: number;
  effort: number;
}) => {
  const percentageCompleted = (effort / base) * 100;
  return (
    <div className="progress_bar_container">
      <div className="progress_bar_outer_bar">
        <div
          className="progress_bar_inner_bar"
          style={{ width: percentageCompleted + 1 }}
        ></div>
      </div>

      <span>{base || 0}</span>
    </div>
  );
};

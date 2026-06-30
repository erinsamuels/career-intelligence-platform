export function TargetSelector({ onChangeTarget, target, targets }) {
  return (
    <div className="targetSelector">
      <div className="targetSelectorLabel">Choose target path</div>
      <select
        className="targetSelectorSelect"
        value={target.id}
        onChange={(e) => onChangeTarget(e.target.value)}
      >
        {targets.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
}

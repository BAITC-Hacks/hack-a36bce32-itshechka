export default function ProgressBar({ value, label }) {
  return (
    <div>
      {label && <div className="mb-2 flex justify-between text-xs font-medium text-slate-500"><span>{label}</span><span>{value}%</span></div>}
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-brand-500 transition-all duration-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

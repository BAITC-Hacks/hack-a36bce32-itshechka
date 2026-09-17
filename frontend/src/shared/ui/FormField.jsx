export default function FormField({ label, hint, error, as = 'input', className = '', ...props }) {
  const Control = as;
  return (
    <label className="block text-sm font-medium text-slate-700">
      <span className="flex items-center justify-between gap-3">
        {label}
        {hint && <span className="text-xs font-normal text-slate-400">{hint}</span>}
      </span>
      <Control
        className={`mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-3 focus:ring-brand-100 ${className}`}
        {...props}
      />
      {error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

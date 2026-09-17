export default function Card({ children, className = '', as: Component = 'section' }) {
  return <Component className={`rounded-2xl border border-slate-200 bg-white transition-shadow duration-300 ${className}`}>{children}</Component>;
}

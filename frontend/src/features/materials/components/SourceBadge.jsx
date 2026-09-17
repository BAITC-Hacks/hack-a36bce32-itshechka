import { Quote } from 'lucide-react';

export default function SourceBadge({ children }) {
  return <span className="inline-flex items-center gap-1 rounded-lg bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700"><Quote size={12} />{children}</span>;
}

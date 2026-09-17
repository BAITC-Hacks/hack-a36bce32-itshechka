import { Check } from 'lucide-react';
import Card from '../../../shared/ui/Card';
import SourceBadge from './SourceBadge';

export default function KeyPointsView({ points }) {
  return (
    <Card className="p-5 sm:p-7">
      <ol className="space-y-4">
        {points.map((point) => (
          <li className="flex gap-4 rounded-xl bg-slate-50 p-4" key={point.id}>
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700"><Check size={15} /></span>
            <div className="flex-1"><p className="leading-7 text-slate-700">{point.text}</p><div className="mt-2"><SourceBadge>{point.source}</SourceBadge></div></div>
          </li>
        ))}
      </ol>
    </Card>
  );
}

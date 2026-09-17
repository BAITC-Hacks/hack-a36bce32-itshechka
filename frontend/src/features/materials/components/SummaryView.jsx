import Card from '../../../shared/ui/Card';
import SourceBadge from './SourceBadge';

export default function SummaryView({ sections }) {
  return (
    <Card className="divide-y divide-slate-100 px-5 sm:px-8">
      {sections.map((section) => (
        <article className="py-7" key={section.title}>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <h2 className="text-xl font-bold text-slate-950">{section.title}</h2>
            <SourceBadge>{section.source}</SourceBadge>
          </div>
          <p className="mt-3 max-w-4xl leading-7 text-slate-600">{section.text}</p>
        </article>
      ))}
    </Card>
  );
}

import { CheckCircle2 } from 'lucide-react';
import Brand from '../../../shared/ui/Brand';

export default function AuthLayout({ children }) {
  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[1fr_1.05fr]">
      <section className="flex items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-10"><Brand /></div>
          {children}
        </div>
      </section>
      <section className="hidden items-center justify-center bg-slate-950 p-12 text-white lg:flex">
        <div className="max-w-lg">
          <p className="text-sm font-semibold text-brand-500">Учиться проще</p>
          <h2 className="mt-3 text-4xl font-bold leading-tight">Из длинной лекции — в понятный план подготовки</h2>
          <ul className="mt-10 space-y-5 text-slate-300">
            {['Краткий структурированный конспект', 'Тест с объяснением каждого ответа', 'Карточки для быстрого повторения'].map((text) => (
              <li className="flex items-center gap-3" key={text}><CheckCircle2 className="text-brand-500" size={20} />{text}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

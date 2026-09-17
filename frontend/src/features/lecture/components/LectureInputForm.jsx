import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { demoLectureText } from '../../../mocks/demoData';
import Button from '../../../shared/ui/Button';
import Card from '../../../shared/ui/Card';
import FormField from '../../../shared/ui/FormField';

const minimumLength = 200;

export default function LectureInputForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const characterCount = text.trim().length;

  function submit(event) {
    event.preventDefault();
    if (characterCount < minimumLength) {
      setError(`Добавьте ещё ${minimumLength - characterCount} символов, чтобы материал был содержательным.`);
      return;
    }
    onSubmit({ title, text });
  }

  function insertExample() {
    setTitle('Основы машинного обучения');
    setText(demoLectureText);
    setError('');
  }

  return (
    <Card className="p-4 shadow-sm sm:p-7">
      <form onSubmit={submit}>
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div><h2 className="text-lg font-bold text-slate-950">Добавьте текст лекции</h2><p className="mt-1 text-sm text-slate-500">Подойдёт расшифровка, статья или текстовый конспект.</p></div>
          <Button className="w-full sm:w-auto" onClick={insertExample} type="button" variant="secondary"><Sparkles size={17} />Вставить пример</Button>
        </div>
        <div className="mt-6 space-y-5">
          <FormField label="Название" name="title" onChange={(event) => setTitle(event.target.value)} placeholder="Например, Основы микроэкономики" value={title} />
          <FormField
            as="textarea"
            className="min-h-56 resize-y leading-7 sm:min-h-72"
            label="Текст лекции"
            name="lecture"
            onChange={(event) => { setText(event.target.value); setError(''); }}
            placeholder="Вставьте текст лекции сюда…"
            value={text}
          />
        </div>
        <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className={`text-xs ${characterCount < minimumLength ? 'text-slate-400' : 'text-emerald-600'}`}>{characterCount.toLocaleString('ru-RU')} символов · минимум {minimumLength}</p>
            {error && <p className="mt-1 text-sm text-red-600" role="alert">{error}</p>}
          </div>
          <Button className="w-full sm:w-auto" size="lg" type="submit">Создать материалы<ArrowRight size={18} /></Button>
        </div>
      </form>
    </Card>
  );
}

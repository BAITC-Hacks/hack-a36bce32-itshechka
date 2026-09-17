import { AlertTriangle, X } from 'lucide-react';
import Button from './Button';

export default function ConfirmDialog({ isOpen, title, description, confirmLabel = 'Удалить', onCancel, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
      <button className="animate-fade-in absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" aria-label="Отмена" onClick={onCancel} />
      <section className="animate-page-in relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-7">
        <button className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl text-slate-400 hover:bg-slate-100" aria-label="Закрыть" onClick={onCancel}><X size={19} /></button>
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-red-50 text-red-600"><AlertTriangle size={21} /></span>
        <h2 className="mt-5 text-xl font-bold text-slate-950" id="confirm-title">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><Button onClick={onCancel} variant="secondary">Отмена</Button><Button onClick={onConfirm} variant="danger">{confirmLabel}</Button></div>
      </section>
    </div>
  );
}

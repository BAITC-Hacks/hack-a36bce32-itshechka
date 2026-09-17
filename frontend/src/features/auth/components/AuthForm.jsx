import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../shared/ui/Button';
import FormField from '../../../shared/ui/FormField';
import useAuthStore from '../../../store/authStore';

export default function AuthForm({ mode }) {
  const isRegister = mode === 'register';
  const navigate = useNavigate();
  const { authenticate, clearError, error, isLoading, token } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    clearError();
    if (token) navigate('/app', { replace: true });
  }, [clearError, navigate, token]);

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    const payload = isRegister ? form : { email: form.email, password: form.password };
    if (await authenticate(mode, payload)) navigate('/app', { replace: true });
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-slate-950">{isRegister ? 'Создайте аккаунт' : 'С возвращением'}</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">{isRegister ? 'Начните готовиться по лекциям в одном месте.' : 'Войдите, чтобы продолжить работу с материалами.'}</p>
      <form className="mt-8 space-y-5" onSubmit={submit}>
        {isRegister && <FormField autoComplete="name" label="Имя" minLength={2} name="name" onChange={update} required value={form.name} />}
        <FormField autoComplete="email" label="Email" name="email" onChange={update} required type="email" value={form.email} />
        <FormField autoComplete={isRegister ? 'new-password' : 'current-password'} hint="Минимум 8 символов" label="Пароль" minLength={8} name="password" onChange={update} required type="password" value={form.password} />
        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}
        <Button className="w-full" disabled={isLoading} size="lg" type="submit">{isLoading ? 'Подождите…' : isRegister ? 'Создать аккаунт' : 'Войти'}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        {isRegister ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
        <Link className="font-semibold text-brand-700 hover:underline" to={isRegister ? '/login' : '/register'}>{isRegister ? 'Войти' : 'Зарегистрироваться'}</Link>
      </p>
    </>
  );
}

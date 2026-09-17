import AuthForm from '../features/auth/components/AuthForm';
import AuthLayout from '../features/auth/components/AuthLayout';

export default function RegisterPage() {
  return <AuthLayout><AuthForm mode="register" /></AuthLayout>;
}

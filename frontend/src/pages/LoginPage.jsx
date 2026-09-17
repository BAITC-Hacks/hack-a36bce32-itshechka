import AuthForm from '../features/auth/components/AuthForm';
import AuthLayout from '../features/auth/components/AuthLayout';

export default function LoginPage() {
  return <AuthLayout><AuthForm mode="login" /></AuthLayout>;
}

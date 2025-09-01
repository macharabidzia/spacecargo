import LoginForm from "@/components/features/auth/LoginForm";
export const dynamic = 'force-dynamic'

const Login = () => {
  return (
    <div className="opacity-0 animate-fade-slide-in">
      <LoginForm />
    </div>
  );
};

export default Login;

import { RegisterForm } from "@/components/features/auth/RegisterForm";
import {
  getRegisterFormFields,
} from "@/lib/form/register.fields";
export const dynamic = 'force-dynamic'

const Register = async () => {
  const fields = getRegisterFormFields();
  return (
    <div className="opacity-0 animate-fade-slide-in">
      <RegisterForm fields={fields} />
    </div>
  );
};

export default Register;

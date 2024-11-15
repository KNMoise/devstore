// src/app/register/page.tsx
import RegisterForm from '../../components/RegisterForm';
import styles from '../../styles/register.module.css';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <h1>Sign Up</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;

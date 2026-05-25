import { useNavigate, useParams, Link } from 'react-router-dom';
import SimpleFormPage from './SimpleFormPage.jsx';
import { api } from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <SimpleFormPage
      title="Sign in to your client workspace"
      copy="Access project updates, files, and messaging with a secure JWT session stored in an HTTP-only cookie."
      fields={[
        { name: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Your password' },
      ]}
      submitLabel="Sign in"
      footerLink={<Link to="/forgot-password">Forgot password?</Link>}
      onSubmit={async (form) => {
        const response = await api.post('/auth/login', form);
        auth.setUser(response.user);
        navigate(response.user.role === 'admin' ? '/admin' : '/dashboard');
      }}
    />
  );
};

export const SignupPage = () => {
  const navigate = useNavigate();
  return (
    <SimpleFormPage
      title="Create your agency account"
      copy="Start a new project request and unlock the client dashboard experience."
      fields={[
        { name: 'name', label: 'Full name', placeholder: 'Avery Johnson' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a strong password' },
      ]}
      submitLabel="Create account"
      footerLink={<Link to="/login">Already have an account?</Link>}
      onSubmit={async (form) => {
        await api.post('/auth/signup', form);
        navigate('/verify-email');
      }}
    />
  );
};

export const VerifyEmailPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <SimpleFormPage
      title="Verify your email"
      copy="Paste the verification token from your email to activate your account."
      fields={[{ name: 'token', label: 'Verification token', placeholder: params.token || 'Token from email' }]}
      submitLabel="Verify email"
      footerLink={<Link to="/login">Back to login</Link>}
      onSubmit={async (form) => {
        await api.post('/auth/verify-email', form);
        navigate('/login');
      }}
    />
  );
};

export const ForgotPasswordPage = () => (
  <SimpleFormPage
    title="Reset password"
    copy="Enter your email and we will issue a reset link through the configured mail service."
    fields={[{ name: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com' }]}
    submitLabel="Send reset email"
    footerLink={<Link to="/login">Back to login</Link>}
    onSubmit={async (form) => {
      await api.post('/auth/forgot-password', form);
    }}
  />
);

export const ResetPasswordPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <SimpleFormPage
      title="Set a new password"
      copy="Use the reset token provided in the email to secure your account again."
      fields={[
        { name: 'token', label: 'Reset token', placeholder: params.token || 'Token from email' },
        { name: 'password', label: 'New password', type: 'password', placeholder: 'New password' },
      ]}
      submitLabel="Update password"
      footerLink={<Link to="/login">Back to login</Link>}
      onSubmit={async (form) => {
        await api.post('/auth/reset-password', form);
        navigate('/login');
      }}
    />
  );
};
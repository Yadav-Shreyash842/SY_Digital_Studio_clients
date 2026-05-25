import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import { SiteLayout } from './components/Layout.jsx';
import { ContactPage, NotFoundPage } from './pages/MiscPages.jsx';
import { ForgotPasswordPage, LoginPage, ResetPasswordPage, SignupPage, VerifyEmailPage } from './pages/AuthPages.jsx';
import { AdminDashboardPage, ClientDashboardPage } from './pages/DashboardPages.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout><HomePage /></SiteLayout>} />
      <Route path="/contact" element={<SiteLayout><ContactPage /></SiteLayout>} />
      <Route path="/login" element={<SiteLayout><LoginPage /></SiteLayout>} />
      <Route path="/signup" element={<SiteLayout><SignupPage /></SiteLayout>} />
      <Route path="/verify-email" element={<SiteLayout><VerifyEmailPage /></SiteLayout>} />
      <Route path="/verify-email/:token" element={<SiteLayout><VerifyEmailPage /></SiteLayout>} />
      <Route path="/forgot-password" element={<SiteLayout><ForgotPasswordPage /></SiteLayout>} />
      <Route path="/reset-password/:token" element={<SiteLayout><ResetPasswordPage /></SiteLayout>} />
      <Route path="/dashboard/*" element={<ClientDashboardPage />} />
      <Route path="/admin/*" element={<AdminDashboardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
import { Link } from 'react-router-dom';
import SimpleFormPage from './SimpleFormPage.jsx';
import { api } from '../lib/api.js';

export const ContactPage = () => (
  <SimpleFormPage
    title="Contact SY Digital Studio"
    copy="Use this form for new business, support, or partnership inquiries."
    fields={[
      { name: 'name', label: 'Name', placeholder: 'Your name' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com' },
      { name: 'message', label: 'Message', placeholder: 'Tell us about the project', multiline: true },
    ]}
    submitLabel="Send message"
    footerLink={<Link to="/">Back home</Link>}
    onSubmit={async (form) => {
      await api.post('/contact', form);
    }}
  />
);

export const NotFoundPage = () => (
  <div className="grid min-h-[70vh] place-items-center px-4 text-center">
    <div className="glass-card rounded-3xl p-6 sm:p-10">
      <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/70">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Page not found</h1>
      <Link className="mt-8 inline-flex w-full justify-center rounded-full bg-white px-6 py-3 font-semibold text-slate-950 sm:w-auto" to="/">
        Return home
      </Link>
    </div>
  </div>
);
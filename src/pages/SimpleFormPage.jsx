import { useState } from 'react';

export default function SimpleFormPage({ title, copy, fields, onSubmit, submitLabel, footerLink }) {
  const [form, setForm] = useState(Object.fromEntries(fields.map((field) => [field.name, ''])));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      await onSubmit(form);
      setSuccess('Request completed successfully.');
    } catch (submitError) {
      setError(submitError.message || 'Submission failed.');
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16 lg:px-0">
      <div className="glass-card rounded-3xl p-6 sm:p-8">
        <p className="section-eyebrow">SY Digital Studio</p>
        <h1 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{title}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">{copy}</p>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <label key={field.name} className="block">
              <span className="mb-2 block text-sm text-slate-300">{field.label}</span>
              {field.multiline ? (
                <textarea name={field.name} value={form[field.name]} onChange={handleChange} placeholder={field.placeholder} className="input-field min-h-32 w-full" />
              ) : (
                <input name={field.name} type={field.type || 'text'} value={form[field.name]} onChange={handleChange} placeholder={field.placeholder} className="input-field w-full" />
              )}
            </label>
          ))}
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          {success ? <p className="text-sm text-emerald-300">{success}</p> : null}
          <button className="agency-button w-full">{submitLabel}</button>
        </form>
        {footerLink ? <div className="mt-6 text-sm text-slate-400">{footerLink}</div> : null}
      </div>
    </div>
  );
}
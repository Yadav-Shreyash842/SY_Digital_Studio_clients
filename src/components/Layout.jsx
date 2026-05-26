import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaBolt, FaBars, FaEnvelope, FaPhone, FaWhatsapp, FaXmark } from 'react-icons/fa6';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { contactChannels, navItems, services, socialLinks } from '../data/siteContent.js';

export const SiteLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const isAdmin = auth?.user?.role === 'admin';
  const dashboardPath = isAdmin ? '/admin' : '/dashboard';

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-100">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 text-slate-900 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:gap-4 sm:py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/logo.svg" alt="SY Digital Studio" className="h-8 md:h-12" />
          </Link>

          <button className="rounded-full border border-slate-200 p-2.5 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
            {open ? <FaXmark /> : <FaBars />}
          </button>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 lg:flex">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="font-medium transition hover:text-slate-900">
                {label}
              </a>
            ))}
            {auth?.user ? (
              <>
                {isAdmin ? (
                  <NavLink to="/admin" className="inline-flex items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-50/5 px-5 py-2.5 font-semibold text-amber-200 transition hover:bg-amber-50/10">Admin Panel</NavLink>
                ) : null}
                <NavLink to={dashboardPath} className="inline-flex items-center gap-2 rounded-lg border border-slate-900 bg-white px-5 py-2.5 font-semibold text-slate-900 transition hover:bg-slate-50">
                  Open Dashboard <FaArrowRight />
                </NavLink>
              </>
            ) : (
              <NavLink to="/login" className="inline-flex items-center gap-2 rounded-lg border border-slate-900 bg-white px-5 py-2.5 font-semibold text-slate-900 transition hover:bg-slate-50">
                Sign in <FaArrowRight />
              </NavLink>
            )}
          </nav>
        </div>

        {open ? (
          <div className="fixed left-0 right-0 top-0 z-50 h-dvh border-t border-slate-200 bg-white/98 px-4 pb-6 pt-20 shadow-2xl backdrop-blur-xl lg:hidden">
            <div className="mx-auto flex h-full max-w-7xl flex-col gap-3 overflow-y-auto text-sm text-slate-600">
              {navItems.map(([label, href]) => (
                <a key={label} href={href} onClick={() => setOpen(false)} className="rounded-2xl px-3 py-3 font-medium transition hover:bg-slate-100">
                  {label}
                </a>
              ))}
              {auth?.user ? (
                <>
                  {isAdmin ? (
                    <Link to="/admin" onClick={() => setOpen(false)} className="rounded-2xl px-3 py-3 font-medium transition hover:bg-slate-100">
                      Admin Panel
                    </Link>
                  ) : null}
                  <Link to={dashboardPath} onClick={() => setOpen(false)} className="rounded-2xl px-3 py-3 font-medium transition hover:bg-slate-100">
                    Open Dashboard
                  </Link>
                </>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-2xl px-3 py-3 font-medium transition hover:bg-slate-100">
                  Client Login
                </Link>
              )}
            </div>
          </div>
        ) : null}
      </header>

      <main className="pt-24">{children}</main>

      <div className="fixed inset-x-3 bottom-3 z-40 flex flex-col gap-3 sm:bottom-6 sm:left-auto sm:right-6 sm:inset-x-auto sm:max-w-none">
        <a href={contactChannels.whatsapp} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:bg-emerald-400 sm:w-auto">
          <FaWhatsapp /> WhatsApp
        </a>
        <a href={contactChannels.booking} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/30 transition hover:-translate-y-0.5 hover:bg-slate-800 sm:w-auto">
          <FaEnvelope /> Contact
        </a>
      </div>

      <footer className="border-t border-white/10 px-4 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.75fr_0.9fr_0.95fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src="/images/logo.svg" alt="SY Digital Studio" className="h-10 md:h-12" />
            </Link>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              A premium creative technology agency delivering MERN platforms, brand systems, video, and client experiences for modern businesses.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="chip"><FaEnvelope /> {contactChannels.email}</span>
              <a href={contactChannels.whatsapp} target="_blank" rel="noreferrer" className="chip"><FaPhone /> {contactChannels.phone}</a>
            </div>
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Newsletter</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">Monthly launch notes, design insights, and agency growth ideas.</p>
              <div className="mt-4 flex gap-3">
                <input className="input-field min-w-0 flex-1" placeholder="Email address" />
                <button className="agency-button whitespace-nowrap px-5 py-3 text-sm">Join</button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Quick Links</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              {navItems.slice(0, 5).map(([label, href]) => (
                <a key={label} href={href} className="transition hover:text-white">
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Services</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              {services.slice(0, 5).map((service) => (
                <Link key={service.title} to={`/services/${service.slug}`} className="transition hover:text-white">
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Social</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="transition hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const DashboardLayout = ({ title, children, role = 'client' }) => {
  const auth = useAuth();
  const isAdmin = role === 'admin';
  const shellClass = isAdmin
    ? 'bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.16),_transparent_42%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]'
    : 'bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.14),_transparent_42%),linear-gradient(180deg,_#020617_0%,_#0b1220_100%)]';
  const asideClass = isAdmin
    ? 'border-amber-400/15 bg-slate-950/92 shadow-[inset_0_1px_0_rgba(251,191,36,0.12)]'
    : 'border-cyan-400/15 bg-slate-950/88 shadow-[inset_0_1px_0_rgba(34,211,238,0.12)]';
  const tagClass = isAdmin
    ? 'border-amber-300/20 bg-amber-300/10 text-amber-200'
    : 'border-cyan-300/20 bg-cyan-300/10 text-cyan-200';

  return (
    <div className={`min-h-screen text-slate-100 ${shellClass}`}>
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className={`border-r p-4 backdrop-blur-xl sm:p-6 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto ${asideClass}`}>
          <Link to="/" className="mb-10 flex items-center gap-3">
            <img src="/images/logo.svg" alt="SY Digital Studio" className="h-10 md:h-12" />
          </Link>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className={`text-xs uppercase tracking-[0.35em] ${isAdmin ? 'text-amber-300/80' : 'text-cyan-300/80'}`}>{isAdmin ? 'Admin Control' : 'Client Workspace'}</p>
            <p className="mt-2 text-white">{auth?.user?.name || 'Agency User'}</p>
            <p className="mt-1">{auth?.user?.email}</p>
            <p className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${tagClass}`}>
              {isAdmin ? 'Admin' : 'Client'}
            </p>
          </div>
          <nav className="mt-6 space-y-2 text-sm">
            {isAdmin ? (
              <>
                <NavLink to="/admin" className="block rounded-2xl px-4 py-3 transition hover:bg-amber-300/10">Admin Dashboard</NavLink>
                <NavLink to="/dashboard" className="block rounded-2xl px-4 py-3 transition hover:bg-amber-300/10">Client Dashboard</NavLink>
                <NavLink to="/contact" className="block rounded-2xl px-4 py-3 transition hover:bg-amber-300/10">Contact SY Digital Studio</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/dashboard" className="block rounded-2xl px-4 py-3 transition hover:bg-cyan-300/10">My Dashboard</NavLink>
                <NavLink to="/contact" className="block rounded-2xl px-4 py-3 transition hover:bg-cyan-300/10">Message the Studio</NavLink>
              </>
            )}
          </nav>
        </aside>

        <section className="p-4 sm:p-6 lg:p-10">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className={`text-sm uppercase tracking-[0.3em] ${isAdmin ? 'text-amber-300/80' : 'text-cyan-300/80'}`}>{isAdmin ? 'Admin Command Center' : 'Client Workspace'}</p>
              <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                {isAdmin
                  ? 'Manage services, projects, team content, and user activity from one control panel.'
                  : 'Track project progress, send messages, and manage your profile in a focused client view.'}
              </p>
            </div>
          </motion.div>
          {children}
        </section>
      </div>
    </div>
  );
};
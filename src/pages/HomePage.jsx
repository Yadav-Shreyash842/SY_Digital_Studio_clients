import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaBarsProgress, FaEnvelope, FaGlobe, FaLocationDot, FaPlay, FaQuoteLeft, FaStar, FaWhatsapp } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatedNumber, FadeIn, GlassCard, SectionHeading } from '../components/Sections.jsx';
import BlogCard from '../components/BlogCard.jsx';
import {
  aboutBullets,
  blogPosts,
  contactChannels,
  featuredProjects,
  galleryItems,
  heroStats,
  pricing,
  services,
  socialLinks,
  socialProof,
  statsWithIcon,
  teamMembers,
  testimonials,
  recruiterProfile,
  workflow,
} from '../data/siteContent.js';
import { api } from '../lib/api.js';
import { normalizeBlogList } from '../lib/blog.js';
import heroVideo from '../../3254066-uhd_3840_2160_25fps.mp4';

const fallbackSite = {
  hero: {
    label: 'Premium Creative Technology Agency',
    title: 'We build premium digital experiences for companies that need trust, conversion, and scale.',
    copy: 'MERN platforms, creative UI systems, branding, video, and AI-enabled dashboards designed to feel like a high-end startup from first glance.',
  },
};

export default function HomePage() {
  const [site, setSite] = useState(fallbackSite);
  const navigate = useNavigate();
  const heroVideoUrl = import.meta.env.VITE_HERO_VIDEO_URL || heroVideo;

  useEffect(() => {
    api.get('/site').then((payload) => setSite((current) => ({ ...current, ...payload }))).catch(() => null);
  }, []);

  const hero = useMemo(() => site.hero || fallbackSite.hero, [site]);
  const blogEntries = useMemo(() => normalizeBlogList(site.blogs?.length ? site.blogs : blogPosts), [site.blogs]);

  const openServicePage = (service) => navigate(`/services/${service.slug}`);

  return (
    <div className="site-canvas relative overflow-hidden">
      <section id="hero" className="flow-section relative isolate min-h-svh overflow-hidden px-4 pb-12 pt-20 sm:pb-20 sm:pt-28 lg:px-8 lg:pt-14">
        <video className="hero-video absolute inset-0 hidden h-full w-full object-cover object-center md:block" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80">
          <source src={heroVideoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_right,rgba(14,165,233,0.14),transparent_26%)]" />
        <div className="hero-glow left" />
        <div className="hero-glow right" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
              <FaBarsProgress />
              {hero.label}
            </div>
            <h1 className="mt-6 max-w-[13ch] text-4xl font-semibold tracking-tight text-white leading-[1.02] sm:max-w-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem]">
              {hero.title}
            </h1>
            <p className="editorial-copy mt-5 max-w-2xl text-base text-slate-100/90 sm:text-lg">{hero.copy}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link to="/signup" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:scale-105 sm:w-auto">
                Start Premium Project <FaArrowRight />
              </Link>
              <a href="#contact" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-white/20 sm:w-auto">
                Book Strategy Call
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] text-slate-100/85">
              <span className="chip border-white/20 bg-white/10">Founder-ready delivery</span>
              <span className="chip border-white/20 bg-white/10">Structured weekly updates</span>
              <span className="chip border-white/20 bg-white/10">Launch support included</span>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {heroStats.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/15 bg-black/30 p-4 shadow-[0_14px_45px_rgba(2,6,23,0.4)] backdrop-blur-md">
                  <p className="text-sm text-slate-200/80">{item.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-white"><AnimatedNumber value={item.value} suffix={item.suffix} /></p>
                </div>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/15 bg-black/25 shadow-2xl md:hidden">
              <video className="block h-[48svh] w-full object-cover object-center" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80">
                <source src={heroVideoUrl} type="video/mp4" />
              </video>
            </div>

          </FadeIn>

          <FadeIn delay={0.12}>
            <GlassCard className="relative rounded-4xl border-white/15 bg-black/25 p-4 sm:p-6 lg:p-7 backdrop-blur-md">
              <div className="absolute inset-x-6 top-6 h-px bg-linear-to-r from-transparent via-white/60 to-transparent" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/75">Premium agency command view</p>
                    <h2 className="mt-4 text-xl font-semibold text-white sm:text-2xl">A platform built to manage leads, clients, projects, and delivery.</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-100/90">The site, the dashboard, and the backend all work together to feel like a real creative company, not a portfolio demo.</p>
                    <div className="mt-6 flex flex-wrap gap-3 text-sm text-white">
                      <span className="chip border-white/20 bg-white/10"><FaEnvelope /> {contactChannels.email}</span>
                      <span className="chip border-white/20 bg-white/10"><FaWhatsapp /> WhatsApp ready</span>
                    </div>
                  </div>
                  <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                    <div className="flex items-center justify-between text-sm text-slate-100/90">
                      <span>Active projects</span>
                      <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-200">12 running</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {['Discovery', 'Design', 'Build', 'Launch'].map((step) => (
                        <div key={step} className="flex items-center justify-between rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white">
                          <span>{step}</span>
                          <span className="text-cyan-200">Online</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {statsWithIcon.map((item) => (
                    <div key={item.label} className="rounded-3xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-md">
                      <item.icon className="text-cyan-200" />
                      <p className="mt-4 text-2xl font-semibold"><AnimatedNumber value={item.value} suffix="+" /></p>
                      <p className="mt-1 text-sm text-slate-100/80">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </section>

      <div className="cinematic-divider mx-auto max-w-7xl" />

      <section id="about" className="flow-section px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="About Agency" title="A creative technology studio with strategy, design, and execution under one roof." copy="We help modern companies present themselves with the confidence of a category leader and the clarity of a product company." />
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <FadeIn>
              <GlassCard className="h-full rounded-3xl p-8">
                <p className="section-eyebrow">Vision & Mission</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">Build trust before the sales call even starts.</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">Our vision is to help ambitious businesses look and operate like premium digital products. Our mission is to combine engineering, design, and content into a single high-conviction experience that clients remember.</p>
                <div className="mt-6 space-y-3 text-sm text-slate-200">
                  {aboutBullets.map((bullet) => <div key={bullet} className="flex gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" /> <span>{bullet}</span></div>)}
                </div>
              </GlassCard>
            </FadeIn>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                ['MERN Stack Development', 'Architecture, authentication, dashboards, and scalable APIs.'],
                ['Creative UI/UX', 'Motion-first layouts, premium spacing, and polished interactions.'],
                ['Video Editing', 'Launch reels, social assets, podcasts, and product storytelling.'],
                ['Branding', 'Visual identity systems that make businesses feel established.'],
              ].map(([title, copy], index) => (
                <FadeIn key={title} delay={index * 0.06}>
                  <GlassCard className="h-full rounded-3xl p-6">
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">0{index + 1}</p>
                    <h4 className="mt-3 text-xl font-semibold text-white">{title}</h4>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
                  </GlassCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="flow-section px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Team Members" title="A multi-discipline crew that works like a real studio." copy="Every card includes role, expertise, and social presence so clients can see the people behind the work." />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member, index) => (
              <FadeIn key={member.name} delay={index * 0.05}>
                <GlassCard className="overflow-hidden rounded-[1.75rem]">
                  <img src={member.image} alt={member.name} className="h-72 w-full object-cover object-top sm:h-80" />
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">{member.role}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{member.name}</h3>
                    <p className="mt-3 text-sm text-slate-300">{member.expertise}</p>
                    <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
                      <span>Experience</span>
                      <span className="text-white">{member.experience}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
                      {socialLinks.slice(0, 3).map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="chip">{link.label}</a>)}
                    </div>
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="flow-section px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Services" title="Premium business solutions, not generic freelancer tasks." copy="Each service is positioned for trust, conversion quality, and startup-to-enterprise delivery confidence." />
          <div className="grid gap-4 xl:auto-rows-fr xl:grid-cols-2">
            {services.map((service, index) => (
              <FadeIn key={service.title} delay={index * 0.06} className="h-full">
                <motion.div whileHover={{ y: -4, scale: 1.006 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="h-full">
                  <GlassCard className="h-full overflow-hidden rounded-[1.85rem]">
                  <div
                    className="grid h-full cursor-pointer lg:grid-cols-[0.95fr_1.05fr]"
                    role="link"
                    tabIndex={0}
                    onClick={() => openServicePage(service)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openServicePage(service);
                      }
                    }}
                    aria-label={`Open ${service.title} service details`}
                  >
                    <div className="relative">
                      <img src={service.image} alt={service.title} className="h-44 w-full object-cover sm:h-52 lg:h-full lg:min-h-56" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.02),rgba(2,6,23,0.7))]" />
                      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                        <span className="chip border-white/15 bg-white/10 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.28em] text-cyan-100">{service.statusBadge}</span>
                      </div>
                    </div>
                    <div className="flex h-full flex-col p-4 sm:p-4 lg:p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <service.icon className="text-xl text-cyan-300" />
                          <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{service.title}</h3>
                        </div>
                        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white">{service.price}</div>
                      </div>
                      <p className="mt-2 text-xs leading-6 text-slate-300">{service.outcome}</p>
                      <p className="mt-2 text-xs text-cyan-100/90">{service.microcopy}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="chip border-white/10 bg-white/5 text-xs text-white">{service.delivery}</span>
                        {service.trustLabels.slice(0, 1).map((label) => <span key={label} className="chip border-white/10 bg-white/5 text-xs text-white">{label}</span>)}
                        <span className="chip border-white/10 bg-white/5 text-xs text-white">{service.support}</span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2 pt-1">
                        <button type="button" onClick={(event) => { event.stopPropagation(); openServicePage(service); }} className="agency-button text-sm shadow-[0_0_30px_rgba(34,211,238,0.18)]">
                          Explore Service
                        </button>
                        <a href="#contact" onClick={(event) => event.stopPropagation()} className="chip px-3 py-2 text-xs font-semibold text-white shadow-[0_0_22px_rgba(255,255,255,0.08)]">
                          Get Custom Proposal
                        </a>
                      </div>
                    </div>
                  </div>
                  </GlassCard>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="cinematic-divider mx-auto max-w-7xl" />

      <section id="projects" className="flow-section px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Featured Projects" title="Agency-style case studies with visuals, outcomes, and social proof." copy="Compact project cards with clear business impact and a direct live-demo action." />
          <div className="grid gap-4">
            {featuredProjects.map((project, index) => (
              <FadeIn key={project.name} delay={index * 0.07}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.28, ease: 'easeOut' }}>
                  <GlassCard className="overflow-hidden rounded-[1.9rem]">
                  <div className="grid lg:grid-cols-[1fr_1fr]">
                    <div className="grid grid-cols-2 gap-2 p-2.5">
                      {Array.from({ length: 4 }).map((_, imageIndex) => {
                        const image = project.images[imageIndex % project.images.length];

                        return (
                          <img
                            key={`${project.name}-${imageIndex}`}
                            src={image}
                            alt={`${project.name} ${imageIndex + 1}`}
                            className="h-28 w-full rounded-2xl object-cover sm:h-32"
                          />
                        );
                      })}
                    </div>
                    <div className="p-4 sm:p-5 lg:p-5">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span className="chip">{project.industry}</span>
                        <span className="chip">{project.duration}</span>
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{project.name}</h3>
                      <p className="editorial-copy mt-3 text-xs text-slate-300">{project.overview}</p>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Technologies</h4>
                          <div className="mt-2 flex flex-wrap gap-2">{project.technologies.slice(0, 3).map((item) => <span key={item} className="chip text-xs">{item}</span>)}</div>
                        </div>
                        <div>
                          <h4 className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Features</h4>
                          <div className="mt-2 flex flex-wrap gap-2">{project.features.slice(0, 3).map((item) => <span key={item} className="chip text-xs">{item}</span>)}</div>
                        </div>
                      </div>
                      <div className="mt-4 rounded-3xl border border-cyan-300/15 bg-cyan-300/10 p-4 text-xs text-cyan-50">
                        <p className="font-semibold text-white">Results</p>
                        <p className="mt-2">{project.results}</p>
                        <p className="mt-2 text-cyan-100/90">Testimonial: {project.testimonial}</p>
                      </div>
                      <a href={project.liveDemo} className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10">
                        View live demo <FaPlay />
                      </a>
                    </div>
                  </div>
                  </GlassCard>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="stats" className="flow-section px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-5">
          {[
            ['Projects Completed', 148],
            ['Happy Clients', 96],
            ['Technologies Used', 42],
            ['Team Members', 12],
            ['Creative Solutions Delivered', 231],
          ].map(([label, value], index) => (
            <FadeIn key={label} delay={index * 0.05}>
              <GlassCard className="rounded-3xl p-6 text-center">
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-3 text-4xl font-semibold text-white"><AnimatedNumber value={value} suffix="+" /></p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="social-proof" className="flow-section px-4 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Social Proof" title="Trust signals that lower risk for founders and teams." copy="Operational clarity, communication cadence, and delivery systems make the agency feel established before the first call." />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {socialProof.map((item, index) => (
              <FadeIn key={item.label} delay={index * 0.05}>
                <GlassCard className="rounded-3xl p-6 text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">{item.label}</p>
                  <p className="mt-4 text-4xl font-semibold text-white">{item.value}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-6">
            <GlassCard className="rounded-3xl p-6 sm:p-7">
              <div className="grid gap-4 text-sm text-slate-300 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Response SLA</p><p className="mt-2 text-white">Replies within 24 hours</p></div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Delivery System</p><p className="mt-2 text-white">Weekly milestones + review loop</p></div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Timeline Confidence</p><p className="mt-2 text-white">Clear scope and launch windows</p></div>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </section>

      <section id="reviews" className="flow-section px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Testimonials" title="Client reviews with company names, ratings, and project context." copy="Glassmorphism cards and motion keep this section credible without losing the premium feel." />
          <div className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory">
            {testimonials.map((review, index) => (
              <FadeIn key={review.name} delay={index * 0.06}>
                <GlassCard className="min-w-[320px] snap-start rounded-[1.75rem] p-6 md:min-w-90">
                  <FaQuoteLeft className="text-cyan-300/70" />
                  <div className="mt-4 flex items-center gap-4">
                    <img src={review.image} alt={review.name} className="h-14 w-14 rounded-full object-cover object-top" />
                    <div>
                      <p className="font-semibold text-white">{review.name}</p>
                      <p className="text-sm text-slate-400">{review.company}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-amber-300">{Array.from({ length: review.rating }).map((_, star) => <FaStar key={star} />)}</div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{review.quote}</p>
                  <p className="mt-5 text-xs uppercase tracking-[0.3em] text-cyan-300/80">{review.projectType}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="recruiter" className="flow-section px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Recruiter View" title={recruiterProfile.title} copy={recruiterProfile.summary} />
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <FadeIn>
              <GlassCard className="rounded-[1.85rem] p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Resume</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Open a client-ready profile quickly.</h3>
                  </div>
                  <a href={recruiterProfile.resumeHref} className="agency-button whitespace-nowrap">
                    {recruiterProfile.resumeLabel}
                  </a>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">Tech Stack</h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {recruiterProfile.techStack.map((tech) => <span key={tech} className="chip text-xs">{tech}</span>)}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">Certifications</h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {recruiterProfile.certifications.map((item) => <span key={item} className="chip text-xs">{item}</span>)}
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3 text-sm text-slate-300">
                  {recruiterProfile.achievements.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      {item}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeIn>

            <FadeIn delay={0.08}>
              <GlassCard className="rounded-[1.85rem] p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Experience Timeline</p>
                <div className="mt-6 space-y-4">
                  {recruiterProfile.experienceTimeline.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/70">{item.label}</p>
                      <h4 className="mt-2 text-lg font-semibold text-white">{item.title}</h4>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{item.copy}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-cyan-300/15 bg-cyan-300/10 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">Focus</p>
                    <p className="mt-3 text-sm leading-7 text-cyan-50">Startup websites, client portals, and recruiter-friendly portfolios.</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Strength</p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">Fast, clean delivery with a polished visual system and scalable architecture.</p>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="workflow" className="flow-section px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Process" title="A cinematic workflow from strategy to launch." copy="Built like a product studio: visible milestones, premium communication, and accountable delivery." />
          <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
            <FadeIn>
              <GlassCard className="sticky top-24 rounded-[1.75rem] p-6 sm:p-7">
                <p className="section-eyebrow">Delivery System</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">Clients always know what is next.</h3>
                <p className="editorial-copy mt-4 text-sm text-slate-300">Every project runs through a structured operating rhythm: kickoff clarity, weekly momentum, and launch-level quality checks.</p>
                <div className="mt-6 space-y-3 text-sm text-slate-200">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Dedicated owner for each milestone</div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Proof-of-progress updates every week</div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Launch checklist + post-go-live support</div>
                </div>
              </GlassCard>
            </FadeIn>
            <div className="timeline-rail space-y-4 pl-8">
              {workflow.map((item, index) => (
                <FadeIn key={item.step} delay={index * 0.05}>
                  <GlassCard className="relative h-full rounded-3xl p-5">
                    <span className="absolute left-[-1.92rem] top-8 h-3.5 w-3.5 rounded-full border border-cyan-200/40 bg-cyan-300/80" />
                    <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">0{index + 1}</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{item.step}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
                  </GlassCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="flow-section px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Pricing" title="SaaS-style packages with scope, support, and delivery clarity." copy="Designed to help clients move from discovery to engagement without losing confidence in the process." />
          <div className="grid gap-6 xl:grid-cols-3">
            {pricing.map((tier, index) => (
              <FadeIn key={tier.name} delay={index * 0.05}>
                <GlassCard className={`rounded-[1.8rem] p-7 ${tier.featured ? 'ring-1 ring-cyan-300/35' : ''}`}>
                  {tier.featured ? <div className="mb-4 inline-flex rounded-full bg-cyan-300/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">Most Popular</div> : null}
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">{tier.name}</p>
                  <p className="mt-3 text-4xl font-semibold text-white">{tier.price}</p>
                  <div className="mt-5 grid gap-3 text-sm text-slate-300">
                    <div className="flex justify-between border-b border-white/10 pb-2"><span>Delivery</span><span className="text-white">{tier.time}</span></div>
                    <div className="flex justify-between border-b border-white/10 pb-2"><span>Revisions</span><span className="text-white">{tier.revisions}</span></div>
                    <div className="flex justify-between border-b border-white/10 pb-2"><span>Support</span><span className="text-white">{tier.support}</span></div>
                  </div>
                  <div className="mt-5 space-y-3 text-sm text-slate-300">
                    {tier.features.map((feature) => <div key={feature} className="flex gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" /> {feature}</div>)}
                  </div>
                  <Link to="/signup" className="agency-button mt-6 w-full">
                    Choose package
                  </Link>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="flow-section px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Gallery" title="Studio visuals, project work, and creative process imagery." copy="Animated image grids make the brand feel active and production-ready without overwhelming the layout." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {galleryItems.map((image, index) => (
              <FadeIn key={image} delay={index * 0.04}>
                <GlassCard className="overflow-hidden rounded-[1.6rem]">
                  <img src={image} alt={`Gallery item ${index + 1}`} className="h-72 w-full object-cover transition duration-300 hover:scale-105" />
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="flow-section px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Insights" title="Editorial knowledge hub for founders, teams, and decision-makers." copy="Category-led insights build authority before the first sales conversation and make the agency feel strategic, not transactional." />
          <FadeIn className="mb-8">
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-200/90">
              {['Strategy', 'Product', 'Design', 'Development', 'Branding'].map((category) => (
                <Link key={category} to={`/insights/${category.toLowerCase()}`} className="chip border-white/10 bg-white/5 transition hover:bg-white/10">
                  {category}
                </Link>
              ))}
            </div>
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-3">
            {blogEntries.map((post, index) => (
              <BlogCard key={post.slug || post.title} post={post} delay={index * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="flow-section px-4 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.95fr]">
          <FadeIn>
            <GlassCard className="rounded-[1.8rem] p-5 sm:p-8">
              <SectionHeading eyebrow="Contact" title="A premium contact system for booking, WhatsApp, and direct inquiry." copy="Clients can book consultations, message the team, or start a project request from a polished business contact panel." />
              <div className="grid gap-4 md:grid-cols-2">
                <a href={`mailto:${contactChannels.email}`} className="chip justify-center py-4 text-sm"><FaEnvelope /> Email us</a>
                <a href={contactChannels.whatsapp} target="_blank" rel="noreferrer" className="chip justify-center py-4 text-sm"><FaWhatsapp /> WhatsApp</a>
                <a href="#booking" className="chip justify-center py-4 text-sm"><FaLocationDot /> Book consultation</a>
                <a href={contactChannels.booking} className="chip justify-center py-4 text-sm"><FaGlobe /> View services</a>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2 text-sm text-slate-300">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Email</p>
                  <p className="mt-2 text-white">{contactChannels.email}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Office</p>
                  <p className="mt-2 text-white">{contactChannels.address}</p>
                </div>
              </div>
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-3">
                <iframe title="SY Digital Studio Map" className="h-72 w-full rounded-[1.2rem] border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Office%20104%2C%20105%2C%20DK%20Nagar%2C%20Godadara%2C%20Surat%2C%20Gujarat%2C%20India&z=16&output=embed" />
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={0.1}>
            <GlassCard className="rounded-[1.8rem] p-5 sm:p-8">
              <p className="section-eyebrow">Lead Form</p>
              <h3 className="mt-3 text-3xl font-semibold text-white">Submit a project request</h3>
              <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.22em] text-slate-200/90">
                <span className="chip border-white/10 bg-white/5">24h response promise</span>
                <span className="chip border-white/10 bg-white/5">Founder-friendly scoping</span>
              </div>
              <form className="mt-8 space-y-4" onSubmit={(event) => event.preventDefault()}>
                {['Full name', 'Email address', 'Company', 'Project brief'].map((label, index) => (
                  <input key={label} placeholder={label} className="input-field w-full" />
                ))}
                <textarea placeholder="Project goals, timeline, and budget" className="input-field min-h-36 w-full" />
                <button className="agency-button w-full">Request consultation</button>
              </form>
              <div className="mt-5 rounded-3xl border border-cyan-300/15 bg-cyan-300/10 p-4 text-sm text-cyan-50">
                <p className="font-semibold text-white">Client note</p>
                <p className="mt-2">“The team made our launch process feel organized, premium, and genuinely low-stress.”</p>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
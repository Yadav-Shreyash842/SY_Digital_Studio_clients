import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheck, FaEnvelope, FaGlobe, FaStar, FaWhatsapp } from 'react-icons/fa6';
import { FadeIn, GlassCard, SectionHeading } from '../components/Sections.jsx';
import { contactChannels } from '../data/siteContent.js';
import { getServiceDetail } from '../data/serviceDetails.js';

const contactRoute = '/contact';
const signupRoute = '/signup';

const sectionPadding = 'px-4 py-20 lg:px-8';

const ActionLink = ({ to, children, primary = false, external = false }) => {
  const className = primary
    ? 'inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:scale-105'
    : 'inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-white/20';

  if (external) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

export default function ServicePages() {
  const { slug } = useParams();
  const service = useMemo(() => getServiceDetail(slug), [slug]);
  const [openFaq, setOpenFaq] = useState(0);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const ServiceIcon = service.icon;

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.15),transparent_30%),radial-gradient(circle_at_right,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,#020617_0%,#08101f_42%,#020617_100%)]">
      <section className="relative isolate overflow-hidden px-4 pb-20 pt-24 lg:px-8 lg:pt-28">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.35),rgba(2,6,23,0.85))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <FadeIn>
            <div>
              <p className="section-eyebrow">Premium Service Experience</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                {service.heroCopy}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <ActionLink to={contactRoute} primary>Book Consultation <FaArrowRight /></ActionLink>
                <ActionLink to={contactRoute}>Request Quote <FaArrowRight /></ActionLink>
                <ActionLink to={signupRoute}>Start Project <FaArrowRight /></ActionLink>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="chip border-white/20 bg-white/10"><service.icon /> Premium delivery</span>
                <span className="chip border-white/20 bg-white/10">Starting at {service.price}</span>
                <span className="chip border-white/20 bg-white/10">Business-ready workflow</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <GlassCard className="overflow-hidden rounded-4xl border-white/15 bg-black/30 p-3 sm:p-4 backdrop-blur-md">
              <img src={service.image} alt={service.title} className="h-112 w-full rounded-3xl object-cover object-center" />
            </GlassCard>
          </FadeIn>
        </div>
      </section>

      <section className={sectionPadding}>
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <GlassCard className="h-full rounded-[1.85rem] p-7">
              <p className="section-eyebrow">Service Overview</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">What the service includes</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{service.overview}</p>
              <div className="mt-6 space-y-4 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Who it is for</p>
                  <p className="mt-2 text-white">{service.audience}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Why businesses need it</p>
                  <p className="mt-2 text-white">{service.need}</p>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-2">
              {['Discovery-ready planning', 'Premium UI polish', 'Business-first delivery', 'Scalable architecture'].map((item) => (
                <GlassCard key={item} className="rounded-[1.6rem] p-6">
                  <FaCheck className="text-cyan-300" />
                  <h3 className="mt-4 text-xl font-semibold text-white">{item}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Every engagement is structured to feel clear, credible, and easy for clients to evaluate.
                  </p>
                </GlassCard>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className={sectionPadding}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Technologies" title="A professional stack for modern delivery." copy="The technology set is chosen to keep the service fast, scalable, and easy to maintain." />
          <div className="flex flex-wrap justify-center gap-3">
            {service.technologies.map((item) => (
              <span key={item} className="chip border-white/15 bg-white/5 px-4 py-3 text-sm text-white">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionPadding}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Features" title="Premium feature cards tailored to the service." copy="These are the client-facing capabilities that make the offering feel complete and valuable." />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {service.features.map((feature, index) => (
              <FadeIn key={feature.title} delay={index * 0.05}>
                <GlassCard className="h-full rounded-[1.65rem] p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">0{index + 1}</p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{feature.copy}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionPadding}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Workflow" title="Discovery to launch in a clean premium sequence." copy="The process is designed to reassure clients and keep the delivery organized from start to finish." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            {service.workflow.map((item, index) => (
              <FadeIn key={item.step} delay={index * 0.05}>
                <GlassCard className="h-full rounded-3xl p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">0{index + 1}</p>
                  <h3 className="mt-3 text-lg font-semibold text-white">{item.step}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionPadding}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Benefits" title="Why this service helps businesses grow." copy="The value is not only visual polish. It supports trust, clarity, and conversion." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {service.benefits.map((benefit) => (
              <GlassCard key={benefit} className="rounded-3xl p-6">
                <FaStar className="text-amber-300" />
                <h3 className="mt-4 text-xl font-semibold text-white">{benefit}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Built to improve how the business is seen and how effectively it converts attention into action.
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionPadding}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Case Studies" title="Realistic examples of the type of work this service supports." copy="Each example demonstrates a business problem, the solution, and the result clients can expect." />
          <div className="grid gap-6 lg:grid-cols-2">
            {service.caseStudies.map((caseStudy, index) => (
              <FadeIn key={caseStudy.name} delay={index * 0.06}>
                <GlassCard className="h-full rounded-[1.75rem] p-7">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Case Study</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{caseStudy.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{caseStudy.context}</p>
                  <div className="mt-6 rounded-3xl border border-cyan-300/15 bg-cyan-300/10 p-5 text-sm text-cyan-50">
                    <p className="font-semibold text-white">Result</p>
                    <p className="mt-2">{caseStudy.result}</p>
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionPadding}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Gallery" title="Visuals that support the premium story." copy="A service should feel concrete, so the gallery gives clients a richer sense of what they are buying." />
          <div className="grid gap-4 md:grid-cols-3">
            {service.gallery.map((image, index) => (
              <FadeIn key={image} delay={index * 0.05}>
                <GlassCard className="overflow-hidden rounded-[1.6rem]">
                  <img src={image} alt={`${service.title} preview ${index + 1}`} className="h-72 w-full object-cover transition duration-300 hover:scale-105" />
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionPadding}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Pricing" title="Clear tiers for different business stages." copy="The packages help clients choose the right level of support and delivery complexity." />
          <div className="grid gap-6 xl:grid-cols-3">
            {service.pricing.map((tier, index) => (
              <FadeIn key={tier.name} delay={index * 0.05}>
                <GlassCard className={`rounded-[1.8rem] p-7 ${tier.featured ? 'ring-1 ring-cyan-300/35' : ''}`}>
                  {tier.featured ? <div className="mb-4 inline-flex rounded-full bg-cyan-300/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">Most Popular</div> : null}
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">{tier.name}</p>
                  <p className="mt-3 text-4xl font-semibold text-white">{tier.price}</p>
                  <div className="mt-5 grid gap-3 text-sm text-slate-300">
                    <div className="flex justify-between border-b border-white/10 pb-2"><span>Timeline</span><span className="text-white">{tier.timeline}</span></div>
                    <div className="flex justify-between border-b border-white/10 pb-2"><span>Support</span><span className="text-white">{tier.support}</span></div>
                  </div>
                  <div className="mt-5 space-y-3 text-sm text-slate-300">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" /> {feature}</div>
                    ))}
                  </div>
                  <ActionLink to={contactRoute} primary>
                    Hire Us <FaArrowRight />
                  </ActionLink>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionPadding}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="FAQ" title="Clear answers to common client questions." copy="These questions help prospects understand scope, fit, and delivery expectations." />
          <div className="grid gap-4 lg:grid-cols-2">
            {service.faqs.map((faq, index) => (
              <FadeIn key={faq.question} delay={index * 0.04}>
                <GlassCard className="rounded-[1.55rem] p-6">
                  <button type="button" className="flex w-full items-center justify-between gap-4 text-left" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                    <span className="text-lg font-semibold text-white">{faq.question}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-cyan-200">{openFaq === index ? 'Hide' : 'View'}</span>
                  </button>
                  {openFaq === index ? <p className="mt-4 text-sm leading-7 text-slate-300">{faq.answer}</p> : null}
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionPadding}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Testimonials" title="Client reviews that reinforce trust." copy="Short proof points help the page feel real and grounded in delivery outcomes." />
          <div className="grid gap-6 md:grid-cols-2">
            {service.testimonials.map((testimonial, index) => (
              <FadeIn key={testimonial.name} delay={index * 0.05}>
                <GlassCard className="rounded-[1.65rem] p-7">
                  <div className="flex items-center gap-3 text-amber-300">
                    {Array.from({ length: 5 }).map((_, star) => <FaStar key={star} />)}
                  </div>
                  <p className="mt-5 text-sm leading-7 text-slate-300">“{testimonial.quote}”</p>
                  <div className="mt-6">
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-400">{testimonial.company}</p>
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <GlassCard className="overflow-hidden rounded-4xl border-white/15 bg-black/25 p-7 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="section-eyebrow">Final CTA</p>
                  <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Ready to move this service into your next launch?</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">Choose the package that fits your scope, or reach out for a custom proposal and timeline.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ActionLink to={contactChannels.whatsapp} external primary>Schedule Consultation <FaWhatsapp /></ActionLink>
                  <ActionLink to={contactRoute}>Request Proposal <FaGlobe /></ActionLink>
                  <ActionLink to={`mailto:${contactChannels.email}`} external>Hire Us <FaEnvelope /></ActionLink>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export const SectionHeading = ({ eyebrow, title, copy }) => (
  <div className="mx-auto mb-12 max-w-3xl text-center">
    <p className="section-eyebrow">{eyebrow}</p>
    <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">{title}</h2>
    <p className="mt-4 text-slate-300">{copy}</p>
  </div>
);

export const FadeIn = ({ children, delay = 0, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay, ease: 'easeOut' }}>
    {children}
  </motion.div>
);

export const GlassCard = ({ children, className = '' }) => <div className={`glass-card ${className}`}>{children}</div>;

export const AnimatedNumber = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }

    let frame = 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return <span ref={ref}>{current}{suffix}</span>;
};
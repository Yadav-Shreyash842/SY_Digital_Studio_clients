import { FaArrowRight, FaClock, FaUserPen } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from './Sections.jsx';
import { buildBlogPreview, formatBlogDate, normalizeBlogPost } from '../lib/blog.js';

const BlogCard = ({ post, delay = 0, compact = false }) => {
  const blog = normalizeBlogPost(post);

  return (
    <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.65, delay, ease: 'easeOut' }}>
      <GlassCard className="group overflow-hidden rounded-[1.65rem]">
        <Link to={`/insights/${blog.categorySlug}/${blog.slug}`} className="block overflow-hidden">
          <img src={blog.thumbnail} alt={blog.title} loading="lazy" decoding="async" className={`w-full object-cover transition duration-500 group-hover:scale-105 ${compact ? 'h-48' : 'h-56'}`} />
        </Link>
        <div className="p-6">
          <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-cyan-300/80">
            <span>{blog.category}</span>
            <span>{blog.readingTime}</span>
          </div>
          <Link to={`/insights/${blog.categorySlug}/${blog.slug}`}>
            <h3 className="mt-4 text-xl font-semibold text-white transition group-hover:text-cyan-200">{blog.title}</h3>
          </Link>
          <p className="mt-3 text-sm leading-7 text-slate-300">{buildBlogPreview(blog, compact ? 120 : 155)}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1"><FaUserPen /> {blog.author}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1"><FaClock /> {formatBlogDate(blog.publishDate)}</span>
          </div>
          <Link to={`/insights/${blog.categorySlug}/${blog.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100">
            Read more <FaArrowRight />
          </Link>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default BlogCard;
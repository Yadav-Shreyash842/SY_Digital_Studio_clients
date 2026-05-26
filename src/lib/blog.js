export const slugify = (value = '') => String(value)
  .toLowerCase()
  .trim()
  .replace(/['"]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

export const formatBlogDate = (value) => {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const normalizeBlogPost = (post = {}) => {
  const thumbnail = post.thumbnail || post.image || post.heroImage || '';
  const content = post.content || post.description || post.excerpt || '';
  const category = post.category || 'Insights';
  const tags = Array.isArray(post.tags)
    ? post.tags
    : typeof post.tags === 'string'
      ? post.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
      : [];

  return {
    ...post,
    title: post.title || '',
    slug: post.slug || slugify(post.title || ''),
    category,
    categorySlug: post.categorySlug || slugify(category),
    description: post.description || post.excerpt || '',
    excerpt: post.excerpt || post.description || '',
    content,
    thumbnail,
    image: thumbnail,
    readingTime: post.readingTime || post.readTime || '5 min read',
    readTime: post.readTime || post.readingTime || '5 min read',
    author: post.author || 'SY Digital Studio',
    tags,
    publishDate: post.publishDate || post.createdAt || new Date().toISOString(),
    featured: Boolean(post.featured),
    published: post.published !== false,
    quote: post.quote || '',
    preview: post.preview || post.excerpt || post.description || '',
  };
};

export const normalizeBlogList = (posts = []) => posts.map(normalizeBlogPost).filter((post) => post.slug);

export const getCategoryLabel = (categorySlug = '') => {
  const normalized = String(categorySlug || '').toLowerCase();

  return {
    strategy: 'Strategy',
    product: 'Product',
    design: 'Design',
    development: 'Development',
    branding: 'Branding',
  }[normalized] || normalized.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()) || 'Insights';
};

export const categoryThemes = {
  strategy: {
    label: 'Strategy',
    eyebrow: 'Strategy',
    title: 'Business growth, conversion, and agency positioning.',
    copy: 'Premium strategy insights for agencies, startups, and teams that want to convert attention into trust.',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
    accent: 'from-blue-500/25 via-cyan-300/10 to-transparent',
    chip: 'border-cyan-300/20 bg-cyan-300/10 text-cyan-100',
  },
  product: {
    label: 'Product',
    eyebrow: 'Product Systems',
    title: 'Client portals, SaaS platforms, and startup systems.',
    copy: 'Product-focused insights that explore scalable workflows, dashboards, and modern agency software.',
    heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
    accent: 'from-violet-500/30 via-fuchsia-400/10 to-transparent',
    chip: 'border-violet-300/20 bg-violet-300/10 text-violet-100',
  },
  design: {
    label: 'Design',
    eyebrow: 'Design Studio',
    title: 'Motion, storytelling, and cinematic UI craftsmanship.',
    copy: 'Creative design essays built to feel premium, visual, and highly intentional.',
    heroImage: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1600&q=80',
    accent: 'from-pink-500/30 via-orange-400/10 to-transparent',
    chip: 'border-pink-300/20 bg-pink-300/10 text-pink-100',
  },
  development: {
    label: 'Development',
    eyebrow: 'Engineering',
    title: 'React, MERN, APIs, and scalable engineering practices.',
    copy: 'Technical insights for teams that care about performance, architecture, and clean delivery.',
    heroImage: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1600&q=80',
    accent: 'from-emerald-500/25 via-cyan-400/10 to-transparent',
    chip: 'border-emerald-300/20 bg-emerald-300/10 text-emerald-100',
  },
  branding: {
    label: 'Branding',
    eyebrow: 'Luxury Identity',
    title: 'Typography, identity, and premium digital perception.',
    copy: 'Elegant branding insights for businesses that want a sharper, more memorable digital presence.',
    heroImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80',
    accent: 'from-amber-400/25 via-yellow-200/10 to-transparent',
    chip: 'border-amber-300/20 bg-amber-300/10 text-amber-100',
  },
};

export const getCategoryTheme = (categorySlug = '') => categoryThemes[String(categorySlug || '').toLowerCase()] || {
  label: getCategoryLabel(categorySlug),
  eyebrow: 'Insights',
  title: 'Premium agency thinking and production-ready content.',
  copy: 'A curated knowledge hub for clients and recruiters.',
  heroImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80',
  accent: 'from-slate-500/20 via-cyan-300/10 to-transparent',
  chip: 'border-white/10 bg-white/5 text-slate-100',
};

export const buildBlogPreview = (post, limit = 150) => {
  const source = post.description || post.excerpt || post.content || '';

  if (!source) {
    return '';
  }

  const collapsed = String(source).replace(/\s+/g, ' ').trim();
  return collapsed.length > limit ? `${collapsed.slice(0, limit).trim()}...` : collapsed;
};
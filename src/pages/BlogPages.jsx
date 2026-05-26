import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendarDays, FaClock, FaQuoteLeft, FaTag, FaUserPen } from 'react-icons/fa6';
import { api } from '../lib/api.js';
import { blogPosts as fallbackBlogPosts } from '../data/siteContent.js';
import BlogCard from '../components/BlogCard.jsx';
import { FadeIn, GlassCard } from '../components/Sections.jsx';
import { formatBlogDate, getCategoryTheme, normalizeBlogList, normalizeBlogPost, slugify } from '../lib/blog.js';

const ArticleSkeleton = () => (
  <div className="space-y-6">
    <div className="h-72 animate-pulse rounded-4xl bg-white/8" />
    <div className="mx-auto max-w-4xl space-y-4">
      <div className="h-4 w-28 animate-pulse rounded-full bg-white/10" />
      <div className="h-12 w-4/5 animate-pulse rounded-2xl bg-white/10" />
      <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />
      <div className="h-4 w-5/6 animate-pulse rounded-full bg-white/10" />
      <div className="h-4 w-3/4 animate-pulse rounded-full bg-white/10" />
    </div>
  </div>
);

const categoryLabelFromPosts = (posts, categorySlug) => {
  const post = posts.find((item) => item.categorySlug === categorySlug);
  return post?.category || getCategoryTheme(categorySlug).label;
};

const filterFallbackPosts = (categorySlug) => {
  if (!categorySlug) {
    return normalizeBlogList(fallbackBlogPosts);
  }

  return normalizeBlogList(fallbackBlogPosts).filter((post) => post.categorySlug === categorySlug || slugify(post.category) === categorySlug);
};

const pickFallbackArticle = (categorySlug, slug) => {
  const list = filterFallbackPosts(categorySlug);
  return list.find((post) => post.slug === slug) || list[0] || normalizeBlogPost(fallbackBlogPosts[0] || {});
};

const mergeBlogLists = (livePosts = [], fallbackPosts = []) => {
  const merged = [];
  const seen = new Set();

  for (const post of [...livePosts, ...fallbackPosts]) {
    const key = post.slug || post.title;

    if (!key || seen.has(key)) {
      continue;
    }

    seen.add(key);
    merged.push(post);
  }

  return merged;
};

const InsightsPage = () => {
  const params = useParams();
  const routeCategory = slugify(params.category || '');
  const routeSlug = params.slug ? String(params.slug) : (params.category && !params.slug ? '' : '');
  const legacySlug = params.slug ? '' : (params.category && !params.slug ? '' : String(params.slug || ''));
  const articleSlug = routeSlug || legacySlug;
  const isArticleView = Boolean(articleSlug);
  const [blog, setBlog] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const activeCategorySlug = useMemo(() => slugify(routeCategory || blog?.categorySlug || blog?.category || 'insights'), [blog, routeCategory]);
  const theme = useMemo(() => getCategoryTheme(activeCategorySlug), [activeCategorySlug]);
  const heroPosts = useMemo(() => posts.slice(0, 3), [posts]);
  const relatedPosts = useMemo(() => posts.filter((item) => item.slug !== blog?.slug).slice(0, 3), [blog?.slug, posts]);
  const contentBlocks = useMemo(() => {
    if (!blog?.content) {
      return [];
    }

    return String(blog.content)
      .split(/\n\n+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }, [blog]);

  useEffect(() => {
    let active = true;

    const loadInsights = async () => {
      setLoading(true);

      try {
        if (isArticleView) {
          const [articleResponse, listResponse] = await Promise.all([
            routeCategory ? api.get(`/blogs/${routeCategory}/${articleSlug}?category=${routeCategory}`) : api.get(`/blogs/${articleSlug}`),
            routeCategory ? api.get(`/blogs?category=${routeCategory}`) : api.get('/blogs'),
          ]);

          const current = normalizeBlogPost(articleResponse.blog || articleResponse.blogPost || articleResponse);
          const list = normalizeBlogList(listResponse.blogs || []);
          const fallbackList = filterFallbackPosts(current.categorySlug || routeCategory);
          const finalCategory = current.categorySlug || slugify(current.category);

          if (!active) {
            return;
          }

          setBlog(current);
          setPosts(mergeBlogLists(list, fallbackList.length ? fallbackList : filterFallbackPosts(finalCategory)));
        } else {
          const listResponse = await api.get(routeCategory ? `/blogs?category=${routeCategory}` : '/blogs');
          const list = normalizeBlogList(listResponse.blogs || []);
          const fallbackList = filterFallbackPosts(routeCategory);

          if (!active) {
            return;
          }

          setBlog(null);
          setPosts(mergeBlogLists(list, fallbackList));
        }
      } catch {
        if (!active) {
          return;
        }

        if (isArticleView) {
          const fallbackArticle = pickFallbackArticle(routeCategory, articleSlug);
          setBlog(fallbackArticle);
          setPosts(filterFallbackPosts(fallbackArticle.categorySlug));
        } else {
          setBlog(null);
          setPosts(filterFallbackPosts(routeCategory));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadInsights();

    return () => {
      active = false;
    };
  }, [articleSlug, isArticleView, routeCategory]);

  useEffect(() => {
    const activeArticle = blog || (isArticleView ? pickFallbackArticle(routeCategory, articleSlug) : null);

    if (!activeArticle) {
      document.title = `Insights | SY Digital Studio`;
      return undefined;
    }

    const previousTitle = document.title;
    const previousDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    document.title = `${activeArticle.title} | SY Digital Studio`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', activeArticle.description || activeArticle.excerpt || activeArticle.preview || 'Premium agency insights and blog articles.');
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription && previousDescription) {
        metaDescription.setAttribute('content', previousDescription);
      }
    };
  }, [articleSlug, blog, isArticleView, routeCategory]);

  useEffect(() => {
    if (!isArticleView) {
      setProgress(0);
      return undefined;
    }

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const nextProgress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [isArticleView]);

  const activeArticle = blog || (isArticleView ? pickFallbackArticle(routeCategory, articleSlug) : null);
  const categorySlug = activeArticle?.categorySlug || routeCategory;
  const categoryTheme = getCategoryTheme(categorySlug);
  const bannerImage = activeArticle?.thumbnail || categoryTheme.heroImage;
  const categoryTitle = activeArticle ? activeArticle.category : categoryLabelFromPosts(posts, routeCategory);

  if (loading) {
    return (
      <div className="relative px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ArticleSkeleton />
        </div>
      </div>
    );
  }

  if (isArticleView && !activeArticle) {
    return (
      <div className="grid min-h-[70vh] place-items-center px-4 text-center">
        <GlassCard className="rounded-3xl p-6 sm:p-10">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/70">Insights</p>
          <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Article not found</h1>
          <Link className="mt-8 inline-flex w-full justify-center rounded-full bg-white px-6 py-3 font-semibold text-slate-950 sm:w-auto" to="/#blog">
            Back to insights
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden px-4 pb-20 pt-8 lg:px-8">
      {isArticleView ? <motion.div className="fixed left-0 top-0 z-50 h-1 bg-cyan-300" style={{ width: `${progress}%` }} /> : null}

      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Link to="/#blog" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10">
            <FaArrowLeft /> Back to insights
          </Link>
          {routeCategory ? (
            <Link to={`/insights/${routeCategory}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10">
              {categoryTheme.label} category
            </Link>
          ) : null}
        </div>

        {!isArticleView ? (
          <>
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
              <GlassCard className="overflow-hidden rounded-4xl border-white/10 bg-white/5 p-6 sm:p-8">
                <p className="section-eyebrow">{categoryTheme.eyebrow}</p>
                <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">{categoryTheme.title}</h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{categoryTheme.copy}</p>
                <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-slate-200/90">
                  <span className={`chip ${categoryTheme.chip}`}>{categoryTheme.label}</span>
                  <span className="chip border-white/10 bg-white/5">{posts.length} articles</span>
                  <span className="chip border-white/10 bg-white/5">Premium agency insights</span>
                </div>
              </GlassCard>

              <GlassCard className="overflow-hidden rounded-4xl">
                <div className="relative">
                  <img src={bannerImage} alt={categoryTheme.label} className="h-88 w-full object-cover" loading="eager" decoding="async" />
                  <div className={`absolute inset-0 bg-linear-to-t ${categoryTheme.accent}`} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/80">Category focus</p>
                    <h2 className="mt-3 max-w-lg text-2xl font-semibold text-white">{categoryTheme.label} stories shaped for clients, recruiters, and startup teams.</h2>
                  </div>
                </div>
              </GlassCard>
            </motion.section>

            <FadeIn className="mt-16">
              <SectionHeader title={`${categoryTheme.label} articles`} copy={`Recent posts in ${categoryTheme.label.toLowerCase()} written to build trust and establish production-level authority.`} />
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {(heroPosts.length ? heroPosts : posts).map((post, index) => (
                  <BlogCard key={post.slug} post={post} delay={index * 0.05} />
                ))}
              </div>
            </FadeIn>
          </>
        ) : (
          <motion.article initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <GlassCard className="overflow-hidden rounded-4xl">
              <div className="relative">
                <img src={bannerImage} alt={activeArticle.title} className="h-88 w-full object-cover md:h-120" loading="eager" decoding="async" />
                <div className={`absolute inset-0 bg-linear-to-t ${categoryTheme.accent}`} />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/90">
                    <span className={`rounded-full border px-3 py-1 ${categoryTheme.chip}`}>{categoryTheme.label}</span>
                    {activeArticle.featured ? <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-amber-100">Featured</span> : null}
                  </div>
                  <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">{activeArticle.title}</h1>
                </div>
              </div>

              <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_0.38fr]">
                <div>
                  <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                    <span className="chip"><FaUserPen /> {activeArticle.author}</span>
                    <span className="chip"><FaCalendarDays /> {formatBlogDate(activeArticle.publishDate)}</span>
                    <span className="chip"><FaClock /> {activeArticle.readingTime}</span>
                  </div>

                  <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-200">{activeArticle.description}</p>

                  <div className="mt-10 space-y-6 text-[1.02rem] leading-8 text-slate-300">
                    {contentBlocks.map((block, index) => (
                      <p key={`${activeArticle.slug}-block-${index}`}>{block}</p>
                    ))}
                  </div>

                  {activeArticle.quote ? (
                    <div className="mt-10 rounded-[1.8rem] border border-white/10 bg-white/5 p-6 sm:p-8">
                      <p className="flex items-start gap-3 text-sm uppercase tracking-[0.3em] text-cyan-200/80">
                        <FaQuoteLeft className="mt-1" /> Insight quote
                      </p>
                      <blockquote className="mt-4 text-xl leading-9 text-white sm:text-2xl">{activeArticle.quote}</blockquote>
                    </div>
                  ) : null}

                  {activeArticle.tags?.length ? (
                    <div className="mt-10 flex flex-wrap gap-3">
                      {activeArticle.tags.map((tag) => (
                        <span key={tag} className="chip">
                          <FaTag /> {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                <aside className="space-y-4">
                  <GlassCard className="rounded-[1.6rem] p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Author</p>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="grid h-14 w-14 place-items-center rounded-full bg-cyan-300/15 text-lg font-semibold text-cyan-100">{activeArticle.author?.slice(0, 2)?.toUpperCase()}</div>
                      <div>
                        <p className="font-semibold text-white">{activeArticle.author}</p>
                        <p className="text-sm text-slate-300">Agency strategy and product storytelling</p>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="rounded-[1.6rem] p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Article details</p>
                    <div className="mt-4 space-y-3 text-sm text-slate-300">
                      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3"><span>Category</span><span className="text-white">{activeArticle.category}</span></div>
                      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3"><span>Reading time</span><span className="text-white">{activeArticle.readingTime}</span></div>
                      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3"><span>Published</span><span className="text-white">{formatBlogDate(activeArticle.publishDate)}</span></div>
                      <div className="flex items-center justify-between gap-4"><span>Status</span><span className="text-white">{activeArticle.published === false ? 'Draft' : 'Published'}</span></div>
                    </div>
                  </GlassCard>
                </aside>
              </div>
            </GlassCard>

            <FadeIn className="mt-16">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Related articles</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">More agency insights</h2>
                </div>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {(relatedPosts.length ? relatedPosts : filterFallbackPosts(categorySlug)).map((related, index) => (
                  <BlogCard key={related.slug} post={related} delay={index * 0.05} compact />
                ))}
              </div>
            </FadeIn>
          </motion.article>
        )}
      </div>
    </div>
  );
};

const SectionHeader = ({ title, copy }) => (
  <div className="mx-auto mb-12 max-w-3xl text-center">
    <p className="section-eyebrow">Insights</p>
    <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">{title}</h2>
    <p className="mt-4 text-slate-300">{copy}</p>
  </div>
);

export default InsightsPage;

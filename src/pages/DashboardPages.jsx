import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api.js';
import { DashboardLayout } from '../components/Layout.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const Panel = ({ title, value, note }) => (
  <div className="glass-card rounded-3xl p-5 sm:p-6">
    <p className="text-sm text-slate-400">{title}</p>
    <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
    {note ? <p className="mt-2 text-sm text-slate-400">{note}</p> : null}
  </div>
);

const SectionCard = ({ title, children, className = '' }) => (
  <section className={`glass-card rounded-3xl p-5 sm:p-6 ${className}`}>
    <h2 className="text-xl font-semibold text-white sm:text-2xl">{title}</h2>
    <div className="mt-6">{children}</div>
  </section>
);

export const ClientDashboardPage = () => {
  const [data, setData] = useState({ projects: [], messages: [], services: [], stats: {} });
  const [form, setForm] = useState({ title: '', description: '', budget: '', industry: '' });
  const [message, setMessage] = useState({ subject: '', body: '' });
  const [hire, setHire] = useState({ serviceId: '', notes: '' });
  const [uploadFile, setUploadFile] = useState(null);
  const [profile, setProfile] = useState({ name: '', email: '', company: '', phone: '' });
  const auth = useAuth();

  useEffect(() => {
    api.get('/client/dashboard').then(setData).catch(() => null);
  }, []);

  useEffect(() => {
    if (auth?.user) {
      setProfile({ name: auth.user.name || '', email: auth.user.email || '', company: auth.user.company || '', phone: auth.user.phone || '' });
    }
  }, [auth?.user]);

  const submitProject = async (event) => {
    event.preventDefault();
    await api.post('/projects', form);
    setForm({ title: '', description: '', budget: '', industry: '' });
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    await api.post('/client/messages', message);
    setMessage({ subject: '', body: '' });
  };

  const updateProfile = async (event) => {
    event.preventDefault();
    const response = await api.patch('/client/profile', profile);
    auth.setUser(response.user);
  };

  const hireService = async (event) => {
    event.preventDefault();
    await api.post('/client/hire', hire);
    setHire({ serviceId: '', notes: '' });
  };

  const uploadFileToProject = async (projectId) => {
    if (!uploadFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadFile);

    await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/projects/${projectId}/files`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    setUploadFile(null);
  };

  return (
    <ProtectedRoute>
      <DashboardLayout title="Client Dashboard" role="client">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <Panel title="Projects" value={data.stats.projects || data.projects.length || 0} note="Active briefs and deliverables" />
          <Panel title="Messages" value={data.stats.messages || data.messages.length || 0} note="Agency conversations" />
          <Panel title="Services" value={data.stats.services || data.services.length || 0} note="Booked offerings" />
          <Panel title="Account" value={auth?.user?.isVerified ? 'Verified' : 'Pending'} note="Secure JWT profile" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <SectionCard title="Request a new project">
            <form className="mt-6 space-y-4" onSubmit={submitProject}>
              <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Project title" className="input-field w-full" />
              <input value={form.industry} onChange={(event) => setForm({ ...form, industry: event.target.value })} placeholder="Industry" className="input-field w-full" />
              <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Project brief" className="input-field min-h-36 w-full" />
              <input value={form.budget} onChange={(event) => setForm({ ...form, budget: event.target.value })} placeholder="Budget" className="input-field w-full" />
              <button className="agency-button">Submit request</button>
            </form>
          </SectionCard>

          <SectionCard title="Project activity">
            <div className="space-y-4 text-sm text-slate-300">
              {(data.projects || []).map((project) => (
                <div key={project._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-white">{project.title}</p>
                      <p className="mt-1">{project.status} · {project.industry || 'General'}</p>
                    </div>
                    <span className="chip text-xs">{project.progress || 0}%</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <input type="file" onChange={(event) => setUploadFile(event.target.files?.[0] || null)} className="max-w-full text-xs" />
                    <button type="button" onClick={() => uploadFileToProject(project._id)} className="chip px-4 py-2 text-white">
                      Upload file
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <SectionCard title="Profile">
            <form className="mt-6 space-y-4" onSubmit={updateProfile}>
              <input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} placeholder="Full name" className="input-field w-full" />
              <input value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} placeholder="Email" className="input-field w-full" />
              <input value={profile.company} onChange={(event) => setProfile({ ...profile, company: event.target.value })} placeholder="Company" className="input-field w-full" />
              <input value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} placeholder="Phone" className="input-field w-full" />
              <button className="agency-button">Save profile</button>
            </form>
          </SectionCard>

          <SectionCard title="Messages">
            <form className="mt-6 space-y-4" onSubmit={sendMessage}>
              <input value={message.subject} onChange={(event) => setMessage({ ...message, subject: event.target.value })} placeholder="Subject" className="input-field w-full" />
              <textarea value={message.body} onChange={(event) => setMessage({ ...message, body: event.target.value })} placeholder="Message to the agency" className="input-field min-h-28 w-full" />
              <button className="agency-button">Send message</button>
            </form>
          </SectionCard>
          <SectionCard title="Recent messages">
            <div className="space-y-3 text-sm text-slate-300">
              {(data.messages || []).map((item) => (
                <div key={item._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium text-white">{item.subject || 'Update'}</p>
                  <p className="mt-1">{item.body}</p>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="Hire a service">
            <form className="space-y-4" onSubmit={hireService}>
              <select value={hire.serviceId} onChange={(event) => setHire({ ...hire, serviceId: event.target.value })} className="input-field w-full">
                <option value="">Select a service</option>
                {(data.services || []).map((service) => <option key={service._id} value={service._id}>{service.name}</option>)}
              </select>
              <textarea value={hire.notes} onChange={(event) => setHire({ ...hire, notes: event.target.value })} placeholder="Notes for the agency" className="input-field min-h-28 w-full" />
              <button className="agency-button">Hire service</button>
            </form>
          </SectionCard>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export const AdminDashboardPage = () => {
  const [data, setData] = useState({ stats: {}, projects: [], clients: [], services: [], team: [], testimonials: [], gallery: [], blogs: [], contacts: [] });
  const [activeTab, setActiveTab] = useState('services');
  const [serviceForm, setServiceForm] = useState({ name: '', description: '', price: '', deliveryTime: '', category: '', image: '' });
  const [projectForm, setProjectForm] = useState({ title: '', description: '', budget: '', industry: '' });
  const [teamForm, setTeamForm] = useState({ name: '', role: '', expertise: '', experience: '', image: '' });
  const [testimonialForm, setTestimonialForm] = useState({ name: '', company: '', quote: '', projectType: '', image: '' });
  const [blogForm, setBlogForm] = useState({
      title: '',
      slug: '',
      category: 'Strategy',
      description: '',
      content: '',
      readingTime: '5 min read',
      author: 'Shreyash Yadav',
      tags: '',
      publishDate: '',
      featured: false,
      published: true,
      excerpt: '',
      quote: '',
      thumbnail: '',
    });
    const [blogThumbnail, setBlogThumbnail] = useState(null);
    const [editingBlogId, setEditingBlogId] = useState(null);
    const [projectUpdates, setProjectUpdates] = useState({});

    useEffect(() => {
      api.get('/admin/dashboard').then(setData).catch(() => null);
    }, []);

    const resetBlogForm = () => {
      setBlogForm({
        title: '',
        slug: '',
        category: 'Strategy',
        description: '',
        content: '',
        readingTime: '5 min read',
        author: 'Shreyash Yadav',
        tags: '',
        publishDate: '',
        featured: false,
        published: true,
        excerpt: '',
        quote: '',
        thumbnail: '',
      });
      setBlogThumbnail(null);
      setEditingBlogId(null);
    };

    const createService = async (event) => {
      event.preventDefault();
      await api.post('/services', serviceForm);
      setServiceForm({ name: '', description: '', price: '', deliveryTime: '', category: '', image: '' });
      setData(await api.get('/admin/dashboard'));
    };

    const createProject = async (event) => {
      event.preventDefault();
      await api.post('/projects', projectForm);
      setProjectForm({ title: '', description: '', budget: '', industry: '' });
      setData(await api.get('/admin/dashboard'));
    };

    const createTeamMember = async (event) => {
      event.preventDefault();
      await api.post('/admin/team', teamForm);
      setTeamForm({ name: '', role: '', expertise: '', experience: '', image: '' });
      setData(await api.get('/admin/dashboard'));
    };

    const createTestimonial = async (event) => {
      event.preventDefault();
      await api.post('/admin/testimonials', testimonialForm);
      setTestimonialForm({ name: '', company: '', quote: '', projectType: '', image: '' });
      setData(await api.get('/admin/dashboard'));
    };

    const createBlog = async (event) => {
      event.preventDefault();
      const payload = new FormData();

      Object.entries(blogForm).forEach(([key, value]) => {
        if (typeof value === 'boolean') {
          payload.append(key, value ? 'true' : 'false');
        } else if (value !== '' && value !== null && value !== undefined) {
          payload.append(key, String(value));
        }
      });

      if (blogThumbnail) {
        payload.append('thumbnail', blogThumbnail);
      }

      if (editingBlogId) {
        await api.put(`/admin/blogs/${editingBlogId}`, payload);
      } else {
        await api.post('/admin/blogs', payload);
      }

      resetBlogForm();
      setData(await api.get('/admin/dashboard'));
    };

    const startEditingBlog = (blog) => {
      setEditingBlogId(blog._id);
      setBlogForm({
        title: blog.title || '',
        slug: blog.slug || '',
        category: blog.category || 'Strategy',
        description: blog.description || blog.excerpt || '',
        content: blog.content || '',
        readingTime: blog.readingTime || blog.readTime || '5 min read',
        author: blog.author || 'Shreyash Yadav',
        tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '',
        publishDate: blog.publishDate ? String(blog.publishDate).slice(0, 10) : '',
        featured: Boolean(blog.featured),
        published: blog.published !== false,
        excerpt: blog.excerpt || blog.description || '',
        quote: blog.quote || '',
        thumbnail: blog.thumbnail || blog.image || '',
      });
      setBlogThumbnail(null);
      setActiveTab('blogs');
    };

    const deleteBlog = async (blogId) => {
      await api.delete(`/admin/blogs/${blogId}`);
      if (editingBlogId === blogId) {
        resetBlogForm();
      }
      setData(await api.get('/admin/dashboard'));
    };

    const toggleBlogPublish = async (blog) => {
      await api.put(`/admin/blogs/${blog._id}`, { published: !blog.published });
      setData(await api.get('/admin/dashboard'));
    };

    const updateProjectStatus = async (projectId) => {
      const status = projectUpdates[projectId];
      if (!status) {
        return;
      }

      await api.put(`/projects/${projectId}`, { status });
      const refreshed = await api.get('/admin/dashboard');
      setData(refreshed);
    };

    const tabs = [
      ['services', 'Services'],
      ['projects', 'Projects'],
      ['team', 'Team'],
      ['testimonials', 'Testimonials'],
      ['blogs', 'Blog'],
      ['contacts', 'Contacts'],
      ['clients', 'Users'],
    ];

    const visibleContent = useMemo(() => {
      if (activeTab === 'services') return data.services;
      if (activeTab === 'projects') return data.projects;
      if (activeTab === 'team') return data.team;
      if (activeTab === 'testimonials') return data.testimonials;
      if (activeTab === 'blogs') return data.blogs;
      if (activeTab === 'contacts') return data.contacts;
      return data.clients;
    }, [activeTab, data]);

    return (
      <ProtectedRoute role="admin">
        <DashboardLayout title="Admin Dashboard" role="admin">
          <div className="grid gap-6 xl:grid-cols-4">
            <Panel title="Clients" value={data.stats.clients || data.clients.length || 0} note="Registered users" />
            <Panel title="Projects" value={data.stats.projects || data.projects.length || 0} note="Active engagements" />
            <Panel title="Services" value={data.stats.services || data.services.length || 0} note="Published offers" />
            <Panel title="Revenue" value={`$${data.stats.revenue || 0}`} note="Estimated pipeline" />
          </div>

          <div className="mt-8 -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {tabs.map(([key, label]) => (
              <button key={key} onClick={() => setActiveTab(key)} className={`chip px-4 py-3 text-sm ${activeTab === key ? 'border-cyan-300/40 bg-cyan-300/10 text-white' : ''}`}>
                {label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
            <SectionCard title={`Manage ${tabs.find(([key]) => key === activeTab)?.[1] || 'Content'}`}>
              {activeTab === 'blogs' ? (
                <div className="space-y-4 text-sm text-slate-300">
                  {(data.blogs || []).map((blog) => (
                    <div key={blog._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-white">{blog.title}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-cyan-300/70">{blog.category} · {blog.readingTime || blog.readTime}</p>
                          <p className="mt-2 max-w-xl text-slate-300">{blog.description || blog.excerpt}</p>
                        </div>
                        <span className={`chip text-xs ${blog.published === false ? 'border-amber-300/20 bg-amber-300/10 text-amber-100' : 'border-emerald-300/20 bg-emerald-300/10 text-emerald-100'}`}>
                          {blog.published === false ? 'Draft' : 'Published'}
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <button type="button" onClick={() => startEditingBlog(blog)} className="chip px-4 py-2 text-white">Edit</button>
                        <button type="button" onClick={() => toggleBlogPublish(blog)} className="chip px-4 py-2 text-white">{blog.published === false ? 'Publish' : 'Unpublish'}</button>
                        <button type="button" onClick={() => deleteBlog(blog._id)} className="chip px-4 py-2 text-white">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 text-sm text-slate-300">
                  {(visibleContent || []).map((item) => (
                    <div key={item._id || item.name || item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="font-medium text-white">{item.name || item.title || item.email}</p>
                      <p className="mt-1">{item.role || item.category || item.status || item.company || item.subject || item.email}</p>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

            <SectionCard title="Create content">
              {activeTab === 'services' ? (
                <form className="space-y-4" onSubmit={createService}>
                  <input value={serviceForm.name} onChange={(event) => setServiceForm({ ...serviceForm, name: event.target.value })} placeholder="Service name" className="input-field w-full" />
                  <textarea value={serviceForm.description} onChange={(event) => setServiceForm({ ...serviceForm, description: event.target.value })} placeholder="Description" className="input-field min-h-28 w-full" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <input value={serviceForm.price} onChange={(event) => setServiceForm({ ...serviceForm, price: event.target.value })} placeholder="Price" className="input-field w-full" />
                    <input value={serviceForm.deliveryTime} onChange={(event) => setServiceForm({ ...serviceForm, deliveryTime: event.target.value })} placeholder="Delivery time" className="input-field w-full" />
                  </div>
                  <input value={serviceForm.category} onChange={(event) => setServiceForm({ ...serviceForm, category: event.target.value })} placeholder="Category" className="input-field w-full" />
                  <input value={serviceForm.image} onChange={(event) => setServiceForm({ ...serviceForm, image: event.target.value })} placeholder="Image URL" className="input-field w-full" />
                  <button className="agency-button">Publish service</button>
                </form>
              ) : activeTab === 'projects' ? (
                <form className="space-y-4" onSubmit={createProject}>
                  <input value={projectForm.title} onChange={(event) => setProjectForm({ ...projectForm, title: event.target.value })} placeholder="Project title" className="input-field w-full" />
                  <input value={projectForm.industry} onChange={(event) => setProjectForm({ ...projectForm, industry: event.target.value })} placeholder="Industry" className="input-field w-full" />
                  <textarea value={projectForm.description} onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })} placeholder="Description" className="input-field min-h-28 w-full" />
                  <input value={projectForm.budget} onChange={(event) => setProjectForm({ ...projectForm, budget: event.target.value })} placeholder="Budget" className="input-field w-full" />
                  <button className="agency-button">Publish project</button>
                </form>
              ) : activeTab === 'team' ? (
                <form className="space-y-4" onSubmit={createTeamMember}>
                  <input value={teamForm.name} onChange={(event) => setTeamForm({ ...teamForm, name: event.target.value })} placeholder="Name" className="input-field w-full" />
                  <input value={teamForm.role} onChange={(event) => setTeamForm({ ...teamForm, role: event.target.value })} placeholder="Role" className="input-field w-full" />
                  <input value={teamForm.expertise} onChange={(event) => setTeamForm({ ...teamForm, expertise: event.target.value })} placeholder="Expertise" className="input-field w-full" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <input value={teamForm.experience} onChange={(event) => setTeamForm({ ...teamForm, experience: event.target.value })} placeholder="Experience" className="input-field w-full" />
                    <input value={teamForm.image} onChange={(event) => setTeamForm({ ...teamForm, image: event.target.value })} placeholder="Image URL" className="input-field w-full" />
                  </div>
                  <button className="agency-button">Add team member</button>
                </form>
              ) : activeTab === 'testimonials' ? (
                <form className="space-y-4" onSubmit={createTestimonial}>
                  <input value={testimonialForm.name} onChange={(event) => setTestimonialForm({ ...testimonialForm, name: event.target.value })} placeholder="Client name" className="input-field w-full" />
                  <input value={testimonialForm.company} onChange={(event) => setTestimonialForm({ ...testimonialForm, company: event.target.value })} placeholder="Company" className="input-field w-full" />
                  <input value={testimonialForm.projectType} onChange={(event) => setTestimonialForm({ ...testimonialForm, projectType: event.target.value })} placeholder="Project type" className="input-field w-full" />
                  <input value={testimonialForm.image} onChange={(event) => setTestimonialForm({ ...testimonialForm, image: event.target.value })} placeholder="Image URL" className="input-field w-full" />
                  <textarea value={testimonialForm.quote} onChange={(event) => setTestimonialForm({ ...testimonialForm, quote: event.target.value })} placeholder="Testimonial" className="input-field min-h-28 w-full" />
                  <button className="agency-button">Add testimonial</button>
                </form>
              ) : activeTab === 'blogs' ? (
                <form className="space-y-4" onSubmit={createBlog}>
                  <input value={blogForm.title} onChange={(event) => setBlogForm({ ...blogForm, title: event.target.value, slug: event.target.value ? event.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '' })} placeholder="Article title" className="input-field w-full" />
                  <input value={blogForm.slug} onChange={(event) => setBlogForm({ ...blogForm, slug: event.target.value })} placeholder="Slug" className="input-field w-full" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <select value={blogForm.category} onChange={(event) => setBlogForm({ ...blogForm, category: event.target.value })} className="input-field w-full">
                      <option value="Strategy">Strategy</option>
                      <option value="Product">Product</option>
                      <option value="Design">Design</option>
                      <option value="Development">Development</option>
                      <option value="Branding">Branding</option>
                      <option value="AI">AI</option>
                    </select>
                    <input value={blogForm.readingTime} onChange={(event) => setBlogForm({ ...blogForm, readingTime: event.target.value })} placeholder="Reading time" className="input-field w-full" />
                  </div>
                  <input value={blogForm.author} onChange={(event) => setBlogForm({ ...blogForm, author: event.target.value })} placeholder="Author" className="input-field w-full" />
                  <input value={blogForm.tags} onChange={(event) => setBlogForm({ ...blogForm, tags: event.target.value })} placeholder="Tags, separated by commas" className="input-field w-full" />
                  <input value={blogForm.publishDate} onChange={(event) => setBlogForm({ ...blogForm, publishDate: event.target.value })} type="date" className="input-field w-full" />
                  <textarea value={blogForm.description} onChange={(event) => setBlogForm({ ...blogForm, description: event.target.value, excerpt: event.target.value })} placeholder="Short description" className="input-field min-h-24 w-full" />
                  <textarea value={blogForm.content} onChange={(event) => setBlogForm({ ...blogForm, content: event.target.value })} placeholder="Article content" className="input-field min-h-40 w-full" />
                  <textarea value={blogForm.quote} onChange={(event) => setBlogForm({ ...blogForm, quote: event.target.value })} placeholder="Featured quote" className="input-field min-h-24 w-full" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <input value={blogForm.thumbnail} onChange={(event) => setBlogForm({ ...blogForm, thumbnail: event.target.value })} placeholder="Thumbnail URL" className="input-field w-full" />
                    <input type="file" accept="image/*" onChange={(event) => setBlogThumbnail(event.target.files?.[0] || null)} className="input-field w-full py-3" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="chip justify-between px-4 py-3 text-sm">
                      <span>Featured</span>
                      <input type="checkbox" checked={blogForm.featured} onChange={(event) => setBlogForm({ ...blogForm, featured: event.target.checked })} />
                    </label>
                    <label className="chip justify-between px-4 py-3 text-sm">
                      <span>Published</span>
                      <input type="checkbox" checked={blogForm.published} onChange={(event) => setBlogForm({ ...blogForm, published: event.target.checked })} />
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button className="agency-button">{editingBlogId ? 'Update article' : 'Add blog post'}</button>
                    {editingBlogId ? <button type="button" onClick={resetBlogForm} className="chip px-4 py-3 text-white">Cancel edit</button> : null}
                  </div>
                </form>
              ) : (
                <div className="space-y-4 text-sm text-slate-300">
                  {(data.contacts || []).map((contact) => <div key={contact._id} className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-medium text-white">{contact.subject || contact.name || 'Request'}</p><p className="mt-1">{contact.message || contact.body || contact.email}</p></div>)}
                </div>
              )}
            </SectionCard>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <SectionCard title="Project updates">
              <div className="space-y-3 text-sm text-slate-300">
                {(data.projects || []).map((project) => (
                  <div key={project._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="font-medium text-white">{project.title}</p>
                    <p>{project.status}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <select value={projectUpdates[project._id] || project.status} onChange={(event) => setProjectUpdates({ ...projectUpdates, [project._id]: event.target.value })} className="input-field w-full min-w-0 sm:w-auto sm:min-w-40">
                        <option value="submitted">submitted</option>
                        <option value="in review">in review</option>
                        <option value="in progress">in progress</option>
                        <option value="delivered">delivered</option>
                        <option value="completed">completed</option>
                      </select>
                      <button type="button" onClick={() => updateProjectStatus(project._id)} className="chip px-4 py-2 text-white">Update</button>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Admin notes">
              <div className="grid gap-4 md:grid-cols-2">
                <Panel title="Content Tabs" value={tabs.length} note="Services, projects, team, testimonials, blogs, contacts, users" />
                <Panel title="Workflow" value="REST" note="All actions flow through JSON API endpoints" />
              </div>
            </SectionCard>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  };
import { FaArrowTrendUp, FaBolt, FaChartLine, FaCheck, FaCode, FaComments, FaLayerGroup, FaPalette, FaPenFancy, FaVideo } from 'react-icons/fa6';

export const navItems = [
  ['Agency', '#hero'],
  ['About', '#about'],
  ['Team', '#team'],
  ['Services', '#services'],
  ['Projects', '#projects'],
  ['Reviews', '#reviews'],
  ['Pricing', '#pricing'],
  ['Contact', '#contact'],
];

export const heroStats = [
  { label: 'Projects Completed', value: 148, suffix: '+' },
  { label: 'Happy Clients', value: 96, suffix: '+' },
  { label: 'Technologies Used', value: 42, suffix: '+' },
  { label: 'Team Members', value: 12, suffix: '+' },
];

export const aboutBullets = [
  'MERN Stack Development built for conversion, reliability, and rapid scale.',
  'Creative UI/UX systems with cinematic motion and product-grade structure.',
  'Video editing, branding, and social content that reinforce a premium story.',
  'AI-focused experiences, dashboards, and workflow automation for modern teams.',
];

export const teamMembers = [
  { name: 'Yadav Shreyash', role: 'Lead MERN Developer', expertise: 'Auth architecture, scalable APIs, product engineering', experience: '6+ months', image: '/images/yadavshreyash.jpeg' },
  { name: 'Rishi Prasad Raut', role: 'Frontend Developer', expertise: 'React systems, motion design, responsive UI', experience: '6+ months', image: '/images/riship.jpeg' },
  { name: 'Yash Chauhan', role: 'UI/UX Designer', expertise: 'Research, wireframes, SaaS interfaces, prototyping', experience: '7+ years', image: "/images/yash.jpeg" },
  { name: 'Sara Khan', role: 'Video Editor', expertise: 'Launch reels, product edits, motion storytelling', experience: '5+ years', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80' },
  { name: 'Dev Patel', role: 'Branding Specialist', expertise: 'Identity systems, launch campaigns, visual language', experience: '9+ years', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80' },
  { name: 'Maya Singh', role: 'Social Media Manager', expertise: 'Content strategy, growth, launch sequencing', experience: '4+ years', image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80' },
];

export const services = [
  { title: 'MERN Stack Development', price: 'From $4,500', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80', icon: FaCode, technologies: ['MongoDB', 'Express', 'React', 'Node.js'], features: ['JWT auth', 'Admin dashboards', 'Client portals', 'REST APIs'], process: ['Discovery', 'Architecture', 'Build', 'Launch'], benefits: 'Production-grade business platforms built to support real client operations.' },
  { title: 'React Development', price: 'From $2,200', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80', icon: FaBolt, technologies: ['React', 'Framer Motion', 'Tailwind CSS'], features: ['Interactive UIs', 'Motion systems', 'Reusable components', 'Mobile-first layouts'], process: ['Wireframe', 'Design', 'Build', 'Optimize'], benefits: 'Fast, modern frontends that feel premium from the first scroll.' },
  { title: 'Landing Page Design', price: 'From $1,400', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80', icon: FaLayerGroup, technologies: ['Conversion copy', 'Brand systems', 'Analytics'], features: ['Lead capture', 'Hero storytelling', 'CTA strategy', 'Responsive builds'], process: ['Strategy', 'Layout', 'Animation', 'Conversion tuning'], benefits: 'Focused launch pages that convert business attention into qualified leads.' },
  { title: 'UI/UX Design', price: 'From $1,800', image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1000&q=80', icon: FaPalette, technologies: ['Figma', 'Design systems', 'Prototyping'], features: ['User flows', 'Design systems', 'Dashboards', 'Product research'], process: ['Research', 'Ideate', 'Prototype', 'Refine'], benefits: 'Clear interfaces that reduce friction and make premium services feel trustworthy.' },
  { title: 'Video Editing', price: 'From $900', image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1000&q=80', icon: FaVideo, technologies: ['Premiere Pro', 'After Effects', 'Motion graphics'], features: ['Launch reels', 'Ad cuts', 'Product explainers', 'Social edits'], process: ['Brief', 'Story cut', 'Motion', 'Delivery'], benefits: 'Sharply edited content that makes brands look larger and more polished.' },
  { title: 'Branding', price: 'From $1,600', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80', icon: FaPenFancy, technologies: ['Identity systems', 'Tone of voice', 'Launch kits'], features: ['Logos', 'Guidelines', 'Campaign direction', 'Asset kits'], process: ['Positioning', 'Identity', 'Assets', 'Rollout'], benefits: 'Distinct visual language that gives startups and studios instant credibility.' },
  { title: 'AI Dashboard Development', price: 'From $5,500', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1000&q=80', icon: FaChartLine, technologies: ['AI workflows', 'Analytics', 'Automation'], features: ['Prompt panels', 'Usage metrics', 'Workflow automations', 'Role permissions'], process: ['Data model', 'UX design', 'Feature build', 'QA'], benefits: 'High-trust internal tools for AI-enabled businesses and product teams.' },
];

export const featuredProjects = [
  { name: 'SY Digital Studio Cloud', industry: 'Creative SaaS', duration: '10 weeks', overview: 'A cinematic client platform for managing creative retainers, approvals, and payments.', technologies: ['React', 'Node.js', 'MongoDB', 'Framer Motion'], features: ['Multi-image gallery', 'Client approvals', 'Milestone tracking', 'Live chat'], results: '38% faster onboarding and a 2.4x increase in qualified leads.', testimonial: 'It looks and feels like a funded product, not a template.', images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80'], liveDemo: '#contact' },
  { name: 'Northstar Finance Launch', industry: 'Fintech', duration: '8 weeks', overview: 'A premium landing page and dashboard story for a subscription finance startup.', technologies: ['React', 'Express', 'Tailwind', 'MongoDB'], features: ['Lead funnel', 'Investor story', 'Analytics cards', 'Consultation booking'], results: 'Improved demo bookings by 61% in the first month.', testimonial: 'The final product instantly changed how prospects perceived the company.', images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=900&q=80'], liveDemo: '#contact' },
  { name: 'Signal House Brand System', industry: 'Media & Content', duration: '6 weeks', overview: 'A complete brand kit and content engine for a podcast and video-first media company.', technologies: ['Brand design', 'Motion', 'Video editing', 'Content strategy'], features: ['Launch visuals', 'Podcast cuts', 'Social templates', 'Motion pack'], results: 'Tripled weekly content output with a much sharper visual identity.', testimonial: 'Every touchpoint now feels connected and premium.', images: ['https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80'], liveDemo: '#contact' },
];

export const testimonials = [
  { name: 'Mason Lee', company: 'Aurora Labs', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', rating: 5, projectType: 'Website + client portal', quote: 'They delivered a premium digital presence that made our agency feel instantly credible in enterprise conversations.' },
  { name: 'Priya Desai', company: 'Northstar Finance', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', rating: 5, projectType: 'Fintech launch', quote: 'The strategy, motion, and dashboard experience all felt like a premium startup launch package.' },
  { name: 'Jamal Carter', company: 'Signal House Media', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', rating: 5, projectType: 'Brand system + editing', quote: 'We went from fragmented visuals to a polished content engine in one sprint.' },
];

export const workflow = [
  { step: 'Discovery', copy: 'Clarify goals, target users, and the premium experience the brand needs to project.' },
  { step: 'Planning', copy: 'Map scope, milestones, architecture, and launch sequencing for the full engagement.' },
  { step: 'Design', copy: 'Shape visual identity, layouts, motion, and interface systems that feel bespoke.' },
  { step: 'Development', copy: 'Build the MERN stack product with reusable components and production-ready APIs.' },
  { step: 'Testing', copy: 'Validate security, responsiveness, performance, and the client workflow end to end.' },
  { step: 'Launch', copy: 'Deploy, hand over, and support the agency or startup through the first growth cycle.' },
];

export const pricing = [
  { name: 'Starter Package', price: '$2,500', time: '2-3 weeks', revisions: '2 revisions', support: '7 days support', features: ['Single landing page', 'Inquiry form', 'Brand styling', 'Basic SEO setup'] },
  { name: 'Professional Package', price: '$6,500', time: '4-6 weeks', revisions: '4 revisions', support: '30 days support', features: ['Multi-section website', 'Auth flow', 'Client dashboard', 'Motion system'], featured: true },
  { name: 'Enterprise Package', price: '$12,000+', time: '6-10 weeks', revisions: 'Unlimited within scope', support: '90 days support', features: ['Custom platform', 'Admin tools', 'AI workflows', 'Dedicated launch support'] },
];

export const galleryItems = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
];

export const blogPosts = [
  { title: 'How premium agency websites convert better than generic templates', category: 'Strategy', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80' },
  { title: 'Why modern startups need client portals, not just landing pages', category: 'Product', readTime: '7 min read', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80' },
  { title: 'The role of motion and cinematic UI in premium B2B trust', category: 'Design', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1000&q=80' },
];

export const statsWithIcon = [
  { icon: FaBolt, label: 'Projects Delivered', value: 148 },
  { icon: FaComments, label: 'Client Conversations', value: 320 },
  { icon: FaArrowTrendUp, label: 'Growth Improvements', value: 87 },
  { icon: FaCheck, label: 'Launches Completed', value: 64 },
];

export const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
];

export const contactChannels = {
  email: 'hello@sydigitalstudio.io',
  phone: '+1 (415) 555-0148',
  whatsapp: 'https://wa.me/14155550148',
  booking: '#contact',
  address: '3120 Market Street, San Francisco, CA',
};

export const recruiterProfile = {
  title: 'Recruiter-friendly profile',
  summary: 'A concise view of experience, stack depth, certifications, and shipping discipline for clients and hiring teams.',
  resumeLabel: 'Download Resume',
  resumeHref: '/resume.pdf',
  experienceTimeline: [
    { label: '2022 - Present', title: 'Lead MERN Developer', copy: 'Build agency platforms, dashboards, and secure client portals.' },
    { label: '2021 - 2022', title: 'Frontend Specialist', copy: 'Delivered responsive React systems and motion-led user interfaces.' },
    { label: '2020 - 2021', title: 'Creative Technologist', copy: 'Worked across branding, editing, and product storytelling.' },
  ],
  certifications: [
    'MongoDB fundamentals',
    'React UI systems',
    'Brand strategy',
    'Motion design',
  ],
  techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Framer Motion', 'REST APIs', 'JWT'],
  achievements: [
    'Built full-stack agency systems with auth, dashboards, and CRM-style workflows.',
    'Improved conversion-focused layouts with premium visual direction and motion.',
    'Shipped client-ready experiences optimized for mobile, recruiters, and sales teams.',
  ],
};

export const socialProof = [
  { label: 'GitHub-ready codebase', value: '100%' },
  { label: 'Mobile performance focus', value: 'A+' },
  { label: 'Client trust indicators', value: '24/7' },
  { label: 'Startup-style delivery', value: 'Premium' },
];
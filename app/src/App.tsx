import { useState, useEffect, useRef } from 'react'
import {
  GraduationCap, BookOpen, FlaskConical, Award, Mail, Github, Linkedin,
  ExternalLink, MapPin, Calendar, Download, Menu, X, ChevronDown, Quote,
  Twitter, Globe, FileText, Star, Users, BarChart2, BookMarked
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import './App.css'

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const profile = {
  name: 'Wendi Ren',
  title: 'Ph.D. Candidate in Computer Science',
  department: 'School of Data Science',
  university: 'The Chinese University of Hong Kong, Shenzhen',
  location: 'Shenzhen, China',
  email: 'wren44@gatech.edu',
  github: 'https://github.com/conniemessi',
  linkedin: 'https://linkedin.com/in/WendiRen',
  // twitter: 'https://twitter.com/WendiRen',
  googleScholar: 'https://scholar.google.com/citations?user=V0vQt1YAAAAJ&hl=zh-CN',
  website: '#',
  bio: `I am a Ph.D. candidate in Computer Science at The Chinese University of Hong Kong, Shenzhen, advised by Prof. Shuang Li. My research focuses on neuro-symbolic AI, causal reasoning, and weak supervision — bridging data-driven and knowledge-driven paradigms to build more robust and interpretable intelligent systems.

Prior to my PhD, I earned my M.S. in Computational Science & Engineering from Georgia Institute of Technology (College of Computing, GPA: 3.8/4.0) and B.Eng. in Computer Science from Sun Yat-sen University. I also worked as an AI Algorithm Engineer (Team Leader) at Huawei, leading research on the third wave of AI for autonomous driving networks.`,
  researchInterests: ['Neuro-Symbolic AI', 'Causal Reasoning', 'Weak Supervision', 'Point Processes', 'Knowledge-Driven AI'],
  stats: [
    { label: 'Publications', value: '9', icon: BookOpen },
    { label: 'Citations', value: '400+', icon: Quote },
    { label: 'Top Venues', value: 'ICLR, NeurIPS, ICML, UAI, EMNLP', icon: BarChart2 },
    { label: 'Reviewer', value: 'ICLR, NeurIPS, ICML, KDD, UAI, ACL', icon: Users },
  ]
}

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'research', label: 'Research' },
  { id: 'publications', label: 'Publications' },
  { id: 'education', label: 'Education' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
]

const education = [
  {
    degree: 'Ph.D. in Computer Science',
    institution: 'The Chinese University of Hong Kong, Shenzhen',
    location: 'Shenzhen, China',
    period: 'Aug 2023 – Present',
    advisor: 'Prof. Shuang Li',
    description: 'Research on neuro-symbolic AI, causal reasoning in point processes, and AI-enhanced intelligent diagnosis. One paper accepted to ICLR 2025; one paper accepted to NeurIPS 2024.',
    logo: '🎓',
  },
  {
    degree: 'M.S. in Computational Science & Engineering',
    institution: 'Georgia Institute of Technology',
    location: 'Atlanta, GA, US',
    period: 'Aug 2018 – Aug 2020',
    advisor: 'Prof. Chao Zhang',
    description: 'College of Computing, GPA: 3.8/4.0. Full Scholarship, Marshall D. Williamson Fellowship (Top 1%). Thesis: "Learning from Multi-Source Weak Supervision for Neural Text Classification".',
    logo: '🏛️',
  },
  {
    degree: 'B.Eng. in Computer Science & Technology',
    institution: 'Sun Yat-sen University',
    location: 'Guangzhou, China',
    period: 'Sep 2014 – Jun 2018',
    description: 'GPA: 87/100 (3.7/4.0). Outstanding Graduate Thesis Award (Top 3%). Academic Innovation Prize (9/3500). 2nd Scholarship (top 15%).',
    logo: '🏫',
  },
]

type PubLinks = { paper?: string; code?: string; demo?: string }

const publications: Array<{
  title: string; authors: string; venue: string; year: number; type: string;
  highlight: boolean; abstract: string; tags: string[]; links: PubLinks; citations: number
}> = [
  {
    title: 'Logic-Logit: A Logic-Based Approach to Choice Modeling',
    authors: 'S. Zhang, W. Ren, S. Li',
    venue: 'ICLR 2025',
    year: 2025,
    type: 'Conference',
    highlight: true,
    abstract: 'A logic-based approach that integrates symbolic reasoning with choice modeling, enabling interpretable and accurate predictions of human decision-making behavior.',
    tags: ['Logic-Based AI', 'Choice Modeling', 'Neuro-Symbolic'],
    links: { paper: '#' },
    citations: 0,
  },
  {
    title: 'HyperLogic: Enhancing Diversity and Accuracy in Rule Learning with HyperNets',
    authors: 'Y. Yang, W. Ren, S. Li',
    venue: 'NeurIPS 2024',
    year: 2024,
    type: 'Conference',
    highlight: true,
    abstract: 'Proposes HyperNets to enhance both diversity and accuracy in rule learning, achieving state-of-the-art performance on multiple benchmarks.',
    tags: ['Rule Learning', 'HyperNetworks', 'Neuro-Symbolic AI'],
    links: { paper: '#' },
    citations: 0,
  },
  {
    title: 'Amortized Network Intervention to Steer the Excitatory Point Processes',
    authors: 'Z. Song, W. Ren, S. Li',
    venue: 'ICLR 2023',
    year: 2023,
    type: 'Conference',
    highlight: false,
    abstract: 'An amortized intervention framework for steering excitatory point processes, with applications in healthcare and network optimization.',
    tags: ['Point Processes', 'Network Intervention', 'Causal Inference'],
    links: { paper: '#' },
    citations: 0,
  },
  {
    title: 'Rule-Enhanced Active Learning for Semi-Automated Weak Supervision',
    authors: 'D. Kartchner, D. Nakajima An, W. Ren, C. Zhang, C. S. Mitchell',
    venue: 'AI Journal, 3(1), 211-228',
    year: 2022,
    type: 'Journal',
    highlight: false,
    abstract: 'Combines rule-enhanced active learning with weak supervision to reduce labeling costs while maintaining high-quality training data.',
    tags: ['Weak Supervision', 'Active Learning', 'Rule Learning'],
    links: { paper: '#' },
    citations: 0,
  },
  {
    title: 'Fine-Tuning Pre-trained Language Model with Weak Supervision: A Contrastive-Regularized Self-Training Approach',
    authors: 'Y. Yu, S. Zuo, H. Jiang, W. Ren, T. Zhao, C. Zhang',
    venue: 'NAACL-HLT 2021',
    year: 2021,
    type: 'Conference',
    highlight: false,
    abstract: 'A contrastive-regularized self-training approach for fine-tuning pre-trained language models under weak supervision signals.',
    tags: ['Weak Supervision', 'PLM', 'Self-Training'],
    links: { paper: '#' },
    citations: 0,
  },
  {
    title: 'Denoising Multi-Source Weak Supervision for Neural Text Classification',
    authors: 'W. Ren, Y. Li, H. Su, D. Kartchner, C. Mitchell, C. Zhang',
    venue: 'Findings of EMNLP 2020',
    year: 2020,
    type: 'Conference',
    highlight: false,
    abstract: 'Proposes a denoising framework for multi-source weak supervision that effectively aggregates noisy labels from multiple weak supervisors.',
    tags: ['Weak Supervision', 'Text Classification', 'Denoising'],
    links: { paper: '#' },
    citations: 0,
  },
  {
    title: 'Sequential Restorations of Complex Networks After Cascading Failures',
    authors: 'Y. Huang, J. Wu, W. Ren, K. T. Chi, Z. Zheng',
    venue: 'IEEE Trans. on Systems, Man, and Cybernetics: Systems (IF=7.35)',
    year: 2018,
    type: 'Journal',
    highlight: false,
    abstract: 'Studies sequential restoration strategies for complex networks after cascading failures, providing optimal recovery sequences.',
    tags: ['Complex Networks', 'Cascading Failures', 'Network Resilience'],
    links: { paper: '#' },
    citations: 0,
  },
  {
    title: 'A Stochastic Model of Cascading Failure Dynamics in Communication Networks',
    authors: 'W. Ren, J. Wu, X. Zhang, R. Lai, L. Chen',
    venue: 'IEEE Trans. on Circuits and Systems II: Express Briefs, 65(5)',
    year: 2018,
    type: 'Journal',
    highlight: false,
    abstract: 'Proposes a stochastic model to characterize cascading failure dynamics in communication networks using Markov processes.',
    tags: ['Communication Networks', 'Cascading Failures', 'Stochastic Modeling'],
    links: { paper: '#' },
    citations: 0,
  },
]

const research = [
  {
    title: 'Neuro-Symbolic AI & Rule Learning',
    description: 'Bridging data-driven and knowledge-driven paradigms by integrating symbolic logic with neural networks for interpretable and robust AI systems.',
    icon: FlaskConical,
    keywords: ['HyperLogic', 'Logic-Logit', 'Rule Learning', 'HyperNets'],
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Weak Supervision & NLP',
    description: 'Learning from multiple noisy label sources without gold-standard annotations, enabling scalable text classification with limited supervision.',
    icon: BookMarked,
    keywords: ['Multi-Source Weak Supervision', 'Denoising', 'Self-Training', 'Active Learning'],
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600',
  },
  {
    title: 'Point Processes & Causal Reasoning',
    description: 'Modeling and intervening in excitatory point processes with applications in healthcare, network optimization, and Granger causality analysis.',
    icon: Star,
    keywords: ['Hawkes Process', 'Network Intervention', 'Granger Causality', 'Healthcare AI'],
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
  },
]

const awards = [
  {
    title: 'Huawei Future Star Award',
    organization: 'Huawei Technologies',
    year: 'Dec 2021 & Dec 2022',
    description: 'Recognized as a top-performing engineer, awarded twice consecutively.',
  },
  {
    title: 'Marshall D. Williamson Fellowship',
    organization: 'Georgia Institute of Technology',
    year: 'Apr 2020',
    description: 'Top 1% — the only Master student selected as the school annual star.',
  },
  {
    title: '"Thank a Teacher" Award',
    organization: 'Georgia Institute of Technology',
    year: 'Fall 2019 & Summer 2020',
    description: 'Nominated by students for outstanding teaching as Head TA.',
  },
  {
    title: 'Outstanding Bachelor Thesis Award',
    organization: 'Sun Yat-sen University',
    year: 'Jun 2018',
    description: 'Awarded to top 3% of graduating students.',
  },
  {
    title: 'Academic Innovation Prize',
    organization: 'Sun Yat-sen University',
    year: 'Oct 2017',
    description: 'Only 9 out of 3,500 undergraduates received this award.',
  },
  {
    title: 'Meritorious Winner, ICM',
    organization: 'Interdisciplinary Contest in Modeling',
    year: 'Apr 2017',
    description: 'Meritorious Winner in the international mathematical modeling competition.',
  },
]

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────

function useIntersection(ref: React.RefObject<Element>, threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return visible
}

// ─────────────────────────────────────────────
// SECTION WRAPPER
// ─────────────────────────────────────────────

function Section({ id, className = '', children }: { id: string; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const visible = useIntersection(ref as React.RefObject<Element>)
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </section>
  )
}

function SectionTitle({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <div className="p-2 rounded-lg bg-zinc-900">
        <Icon size={20} className="text-white" />
      </div>
      <h2 className="font-serif text-3xl font-semibold text-zinc-900">{children}</h2>
      <div className="flex-1 h-px bg-zinc-200 ml-2" />
    </div>
  )
}

// ─────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('about')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navLinks.map(l => document.getElementById(l.id))
      let cur = 'about'
      sections.forEach(sec => {
        if (sec && window.scrollY >= sec.offsetTop - 100) cur = sec.id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-zinc-100' : 'bg-transparent'}`}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#about" className="font-serif text-xl font-semibold text-zinc-900 hover:text-blue-600 transition-colors">
          {profile.name}
        </a>
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(l => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`text-sm font-medium transition-colors duration-200 pb-0.5 border-b-2 ${active === l.id ? 'text-zinc-900 border-blue-600' : 'text-zinc-500 border-transparent hover:text-zinc-900'}`}
            >
              {l.label}
            </a>
          ))}
          <Button size="sm" variant="outline" className="gap-1.5 text-xs" asChild>
            <a href="#" download>
              <Download size={13} /> CV
            </a>
          </Button>
        </div>
        {/* Mobile */}
        <button className="md:hidden p-1" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-zinc-100 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────

function Hero() {
  return (
    <section id="about" className="min-h-screen flex items-center pt-20 pb-16 bg-gradient-to-br from-zinc-50 via-white to-blue-50/30">
      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
          <div className="animate-slide-up">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {profile.researchInterests.slice(0, 3).map(r => (
                <Badge key={r} variant="secondary" className="text-xs px-3 py-1 bg-blue-50 text-blue-700 border-blue-200">{r}</Badge>
              ))}
            </div>
            {/* Name */}
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-zinc-900 mb-3 leading-tight">
              {profile.name}
            </h1>
            <p className="text-xl text-blue-600 font-medium mb-1">{profile.title}</p>
            <div className="flex items-center gap-1.5 text-zinc-500 text-sm mb-6">
              <GraduationCap size={15} />
              <span>{profile.department}, {profile.university}</span>
              <span className="mx-1">·</span>
              <MapPin size={14} />
              <span>{profile.location}</span>
            </div>
            {/* Bio */}
            <p className="text-zinc-600 leading-relaxed max-w-2xl mb-8 text-base whitespace-pre-line">
              {profile.bio.split('\n\n')[0]}
            </p>
            {/* Actions */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Button className="gap-2 bg-zinc-900 hover:bg-zinc-700" asChild>
                <a href={`mailto:${profile.email}`}><Mail size={15} /> Contact Me</a>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <a href="#" download><Download size={15} /> Download CV</a>
              </Button>
              <Button variant="ghost" size="icon" className="w-9 h-9" asChild>
                <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /></a>
              </Button>
              <Button variant="ghost" size="icon" className="w-9 h-9" asChild>
                <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /></a>
              </Button>
              <Button variant="ghost" size="icon" className="w-9 h-9" asChild>
                <a href={profile.twitter} target="_blank" rel="noreferrer"><Twitter size={17} /></a>
              </Button>
              <Button variant="ghost" size="icon" className="w-9 h-9" asChild>
                <a href={profile.googleScholar} target="_blank" rel="noreferrer"><Globe size={17} /></a>
              </Button>
            </div>
            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              {profile.stats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={16} className="text-blue-500" />
                  <span className="text-2xl font-bold text-zinc-900">{value}</span>
                  <span className="text-sm text-zinc-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
              <img 
                src="/avatar.png" 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-zinc-500 flex items-center gap-1 justify-center">
                <Mail size={13} />
                <a href={`mailto:${profile.email}`} className="hover:text-blue-600 transition-colors">{profile.email}</a>
              </p>
            </div>
          </div>
        </div>
        {/* Scroll hint */}
        <div className="mt-16 flex justify-center">
          <a href="#research" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-zinc-600 transition-colors group">
            <span className="text-xs">Scroll to explore</span>
            <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// RESEARCH
// ─────────────────────────────────────────────

function Research() {
  return (
    <Section id="research" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle icon={FlaskConical}>Research</SectionTitle>
        <div className="grid md:grid-cols-3 gap-6">
          {research.map(({ title, description, icon: Icon, keywords, color, iconColor }) => (
            <Card key={title} className={`border ${color} hover:shadow-md transition-shadow duration-300`}>
              <CardHeader>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
                  <Icon size={20} className={iconColor} />
                </div>
                <CardTitle className="text-base font-semibold text-zinc-900">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 leading-relaxed mb-4">{description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {keywords.map(k => (
                    <Badge key={k} variant="outline" className="text-xs px-2 py-0.5">{k}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────
// PUBLICATIONS
// ─────────────────────────────────────────────

const venueColors: Record<string, string> = {
  'Conference': 'bg-blue-100 text-blue-700',
  'Workshop': 'bg-orange-100 text-orange-700',
  'Preprint': 'bg-zinc-100 text-zinc-600',
  'Journal': 'bg-green-100 text-green-700',
}

function Publications() {
  const [filter, setFilter] = useState<'All' | 'Conference' | 'Journal' | 'Preprint'>('All')
  const filtered = filter === 'All' ? publications : publications.filter(p => p.type === filter)

  return (
    <Section id="publications" className="py-20 bg-zinc-50">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle icon={BookOpen}>Publications</SectionTitle>

        {/* Filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {(['All', 'Conference', 'Journal', 'Preprint'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === f ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-400'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((pub, i) => (
            <Card key={i} className={`border transition-all duration-300 hover:shadow-md ${pub.highlight ? 'border-blue-300 bg-blue-50/30' : 'border-zinc-200 bg-white'}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {pub.highlight && (
                        <Badge className="bg-blue-600 text-white text-xs px-2 py-0.5 gap-1">
                          <Star size={10} /> Featured
                        </Badge>
                      )}
                      <Badge className={`text-xs px-2 py-0.5 ${venueColors[pub.type] ?? 'bg-zinc-100 text-zinc-600'}`}>
                        {pub.type}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-zinc-900 mb-1 leading-snug text-base">{pub.title}</h3>
                    <p className="text-sm text-zinc-500 mb-1">{pub.authors}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-medium text-blue-600">{pub.venue}</span>
                      <span className="text-zinc-400">·</span>
                      <span className="text-zinc-500 flex items-center gap-1">
                        <Calendar size={12} /> {pub.year}
                      </span>
                      {pub.citations > 0 && (
                        <>
                          <span className="text-zinc-400">·</span>
                          <span className="text-zinc-500 flex items-center gap-1">
                            <Quote size={12} /> {pub.citations} citations
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-zinc-600 mt-2 leading-relaxed line-clamp-2">{pub.abstract}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {pub.tags.map(t => (
                        <Badge key={t} variant="outline" className="text-xs px-2 py-0">{t}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Links */}
                <div className="flex gap-3 mt-4 flex-wrap">
                  {pub.links.paper && (
                    <a href={pub.links.paper} className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-blue-600 transition-colors border border-zinc-200 rounded-md px-3 py-1.5 hover:border-blue-300">
                      <FileText size={12} /> Paper
                    </a>
                  )}
                  {pub.links.code && (
                    <a href={pub.links.code} className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-blue-600 transition-colors border border-zinc-200 rounded-md px-3 py-1.5 hover:border-blue-300">
                      <Github size={12} /> Code
                    </a>
                  )}
                  {pub.links.demo && (
                    <a href={pub.links.demo} className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-blue-600 transition-colors border border-zinc-200 rounded-md px-3 py-1.5 hover:border-blue-300">
                      <ExternalLink size={12} /> Demo
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href={profile.googleScholar} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
            View all publications on Google Scholar <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────
// EDUCATION
// ─────────────────────────────────────────────

function Education() {
  return (
    <Section id="education" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle icon={GraduationCap}>Education</SectionTitle>
        <div className="relative pl-6 border-l-2 border-zinc-200 space-y-10">
          {education.map((edu, i) => (
            <div key={i} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-zinc-400 group-hover:border-blue-500 transition-colors" />
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-zinc-900 text-base">{edu.degree}</h3>
                      {i === 0 && <Badge className="bg-green-100 text-green-700 text-xs">Current</Badge>}
                    </div>
                    <p className="text-blue-600 font-medium text-sm mb-1">{edu.institution}</p>
                    <div className="flex items-center gap-4 text-zinc-500 text-xs mb-3">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {edu.period}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {edu.location}</span>
                    </div>
                    {edu.advisor && (
                      <p className="text-sm text-zinc-600 mb-2">
                        <span className="font-medium">Advisor:</span> {edu.advisor}
                      </p>
                    )}
                    <p className="text-sm text-zinc-600 leading-relaxed">{edu.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────
// AWARDS
// ─────────────────────────────────────────────

function Awards() {
  return (
    <Section id="awards" className="py-20 bg-zinc-50">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle icon={Award}>Awards & Honors</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-4">
          {awards.map((award, i) => (
            <div key={i} className="flex gap-4 bg-white border border-zinc-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-300">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
                <Award size={18} className="text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 text-sm">{award.title}</h3>
                <p className="text-blue-600 text-xs font-medium mt-0.5">{award.organization} · {award.year}</p>
                <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────

function Contact() {
  return (
    <Section id="contact" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle icon={Mail}>Contact</SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-zinc-600 leading-relaxed mb-6">
              I'm always open to discussions about research collaborations, academic opportunities, or conversations about neuro-symbolic AI, causal reasoning, and weak supervision. Feel free to reach out!
            </p>
            <div className="space-y-4">
              <a href={`mailto:${profile.email}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Mail size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-medium">Email</p>
                  <p className="text-sm text-zinc-800 font-medium">{profile.email}</p>
                </div>
                <ExternalLink size={14} className="ml-auto text-zinc-300 group-hover:text-blue-400 transition-colors" />
              </a>

              <a href={profile.github} target="_blank" rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-200 transition-colors">
                  <Github size={18} className="text-zinc-700" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-medium">GitHub</p>
                  <p className="text-sm text-zinc-800 font-medium">@{profile.github.split('/').pop()}</p>
                </div>
                <ExternalLink size={14} className="ml-auto text-zinc-300 group-hover:text-zinc-500 transition-colors" />
              </a>

              <a href={profile.googleScholar} target="_blank" rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Globe size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-medium">Google Scholar</p>
                  <p className="text-sm text-zinc-800 font-medium">View Profile</p>
                </div>
                <ExternalLink size={14} className="ml-auto text-zinc-300 group-hover:text-blue-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick note */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8">
            <h3 className="font-semibold text-zinc-900 mb-4 text-lg">Open to</h3>
            <ul className="space-y-3 text-sm text-zinc-600">
              {[
                'Research collaborations in neuro-symbolic AI & causal reasoning',
                'Academic visits & exchange programs',
                'Invited talks & paper discussions',
                'Reviewing for ICLR, NeurIPS, ICML',
                'Industry research internships',
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-8 bg-zinc-900 text-zinc-400">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React + Tailwind.</p>
        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Github size={16} /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Linkedin size={16} /></a>
          <a href={profile.twitter} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Twitter size={16} /></a>
          <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors"><Mail size={16} /></a>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Research />
      <Publications />
      <Education />
      <Awards />
      <Contact />
      <Footer />
    </div>
  )
}

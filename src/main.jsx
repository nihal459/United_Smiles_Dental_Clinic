import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Award, Check, ChevronLeft, ChevronRight, ClipboardList, Clock3, Hand, Heart, HeartHandshake, Users,
  Instagram, MapPin, Menu, MessageCircle, Phone, Mail, Play, Plus, ShieldCheck, Sparkles, Star, X, CalendarCheck
} from 'lucide-react';
import Tooth3D from './Tooth3D.jsx';
import './styles.css';

// Clinic details shown across the site.
const CLINIC = {
  name: 'United Smiles Family Dentistry',
  city: 'Kochi, Kerala',
  address: '67/3596-A, Highcourt Road, Shanmugham Road P.O., Opp. High Court of Kerala, Ernakulam',
  phone: '+91 94464 06942',
  whatsapp: '919446406942',
  hours: 'Mon – Sat · 10:00 AM – 1:30 PM, 2:00 – 7:00 PM',
  email: 'unitedsmiles.k@gmail.com',
  instagram: 'https://www.instagram.com/unitedsmilesfamilydentist/',
  igHandle: 'unitedsmilesfamilydentist',
  maps: 'https://share.google/Z5Qi2lvWD4hViJBU2',
  mapEmbed: 'https://www.google.com/maps?q=9.985011,76.274786&z=16&output=embed',
};
const tel = `tel:${CLINIC.phone.replace(/\s/g, '')}`;
const wa = (text = '') => `https://wa.me/${CLINIC.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
const ext = { target: '_blank', rel: 'noreferrer' };
const FORMSPREE = 'https://formspree.io/f/xjywjdnj';

const LOGO = `${import.meta.env.BASE_URL}logo.jpg`; // BASE_URL keeps it working under the GitHub Pages sub-path
const img = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const SAMPLE_VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'; // TODO: replace with clinic reels

const treatments = [
  { title: 'Orthodontics & Braces', tag: 'Beautifully aligned', desc: 'Transforming crooked, crowded and misaligned teeth into healthier, beautifully aligned smiles with personalised orthodontic treatment.', img: img('1468493858157-0da44aaf1d13') },
  { title: 'Invisalign & Clear Aligners', tag: 'Discreet straightening', desc: 'A modern approach to teeth straightening with custom-made, removable and discreet clear aligners.', img: img('1609840114035-3c981b782dfe') },
  { title: 'Dental Implants', tag: 'Natural-looking smiles', desc: 'Restore missing teeth with dental implant solutions designed to bring back function, comfort and natural-looking smiles.', img: img('1593022356769-11f762e25ed9') },
  { title: 'Cosmetic Dentistry & Smile Designing', tag: 'Enhance your smile', desc: 'Enhance your smile with treatments that improve the appearance, shape and colour of your teeth.', img: img('1494790108377-be9c29b29330') },
  { title: 'Root Canal Treatment', tag: 'Save your natural tooth', desc: 'Helping preserve natural teeth by treating infection and relieving dental pain.', img: img('1606811971618-4486d14f3f99') },
  { title: 'Family & Preventive Dentistry', tag: 'For every generation', desc: 'Gentle dental care, regular check-ups and preventive treatments for children and adults.', img: img('1609220136736-443140cffec6') },
];

const whyUs = [
  { icon: Award, title: '25 Years of Excellence', text: 'Guided by the expertise and clinical experience of our chief dentist.' },
  { icon: ShieldCheck, title: 'Trusted Since 2008', text: 'A longstanding commitment to caring for smiles and building lasting relationships.' },
  { icon: HeartHandshake, title: 'Patient-Centred Care', text: 'Every treatment begins with understanding your needs and expectations.' },
  { icon: Sparkles, title: 'Modern Treatment Options', text: 'Advanced dental solutions for a wide range of dental concerns.' },
  { icon: Users, title: 'Family-Friendly Environment', text: 'Welcoming dental care for every generation.' },
  { icon: ClipboardList, title: 'Personalised Treatment Plans', text: 'Tailored care designed around every individual’s smile.' },
];

const doctorPhoto = file => `${import.meta.env.BASE_URL}doctors/${file}`;
// Non-breaking spaces in names keep initials on one line.
const doctors = [
  { name: 'Dr. Annie Mohan', role: 'Chief Dental Surgeon', degree: 'BDS', note: '25+ years of experience', img: doctorPhoto('annie-mohan.jpg') },
  { name: 'Dr. Anupama P P', role: 'Orthodontist', degree: 'MDS', note: 'Visiting · By appointment', img: doctorPhoto('anupama-pp.jpg') },
  { name: 'Dr. Basil M Jacob', role: 'Oral Surgeon', degree: 'MDS', note: 'Visiting · By appointment', img: doctorPhoto('basil-m-jacob.jpg') },
  { name: 'Dr. Biju Balakrishnan', role: 'Implantologist & Laser Specialist', degree: 'MDS', note: 'Visiting · By appointment', img: doctorPhoto('biju-balakrishnan.jpg') },
];

const gallery = [
  '1629909613638-0e4a1fad8f81', '1629909613654-28e377c37b09', '1629909615184-74f495363b67', '1598256989800-fe5f95da9787',
  '1616391182219-e080b4d1043a', '1643660527072-9c702932f606', '1609207825181-52d3214556dd', '1519494026892-80bbd2d6fd0d',
  '1607613009820-a29f7bb81c04', '1606811841689-23dfddce3e95',
];

const reels = [
  { img: '1607613009820-a29f7bb81c04', caption: 'Brushing right, the easy way 🪥', views: '12.4K' },
  { img: '1600170311833-c2cf5280ce49', caption: 'Inside a digital smile scan ✨', views: '8.1K' },
  { img: '1609840114035-3c981b782dfe', caption: 'Aligner day! Here’s what to expect', views: '15.7K' },
  { img: '1468493858157-0da44aaf1d13', caption: 'Retainers, explained in 30 seconds', views: '6.3K' },
  { img: '1606265752439-1f18756aa5fc', caption: 'What happens at a gentle check-up', views: '9.9K' },
  { img: '1667133295315-820bb6481730', caption: 'Smile makeover reveal 😁', views: '21.2K' },
];

const NAV = [['About', 'about'], ['Doctors', 'doctors'], ['Treatments', 'treatments'], ['Gallery', 'gallery'], ['Reviews', 'reviews'], ['Contact', 'contact']];
const HOME = import.meta.env.BASE_URL;
const ABOUT_PAGE = `${HOME}about/`;
// Sections missing on this page (e.g. Gallery on the About page) live on the home page.
const scrollTo = id => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); else location.href = `${HOME}#${id}`; };
// Every "Book" button scrolls to the appointment form (both pages have one).
const book = { href: '#contact', onClick: e => { e.preventDefault(); scrollTo('contact'); } };

function useWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => { const on = () => setW(window.innerWidth); window.addEventListener('resize', on); return () => window.removeEventListener('resize', on); }, []);
  return w;
}

const Reveal = ({ children, className = '', delay = 0 }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .7, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>
);

const Eyebrow = ({ children }) => <div className="eyebrow"><span className="eyebrow-line" />{children}</div>;

const Stars = ({ size = 16 }) => <span className="stars" aria-label="5 out of 5 stars">{[0, 1, 2, 3, 4].map(i => <Star key={i} size={size} fill="currentColor" strokeWidth={0} />)}</span>;

const GoogleG = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-label="Google"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" /><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" /><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" /><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.2-.1-2.3-.4-3.5z" /></svg>
);

function Header() {
  const [open, setOpen] = useState(false);
  const go = id => { scrollTo(id); setOpen(false); };
  return <>
    <header className="nav glass">
      <a className="brand" href={HOME} aria-label={`${CLINIC.name} home`}>
        <img className="brand-mark" src={LOGO} alt="" />
        <span>United Smiles<small>FAMILY DENTISTRY · KOCHI</small></span>
      </a>
      <nav className="desktop-nav">{NAV.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</nav>
      <a className="btn btn-primary nav-cta" {...book}>Book a visit <ArrowUpRight size={18} /></a>
      <button className="menu-toggle glass" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    </header>
    <AnimatePresence>{open && <motion.div className="mobile-menu glass" initial={{ opacity: 0, y: -10, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: .97 }}>
      {NAV.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}<ArrowUpRight size={18} /></button>)}
    </motion.div>}</AnimatePresence>
  </>;
}

function Hero() {
  return <section className="hero section-pad" id="top">
    <div className="blob blob-a" /><div className="blob blob-b" />
    <div className="hero-copy">
      <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .1 }}><Eyebrow>Trusted dental care since 2008</Eyebrow></motion.div>
      <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .8 }}>Every smile has a story.<br /><em>Let yours shine.</em></motion.h1>
      <motion.p className="lead" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 }}>From routine check-ups to advanced smile transformations, United Smiles Family Dentistry brings together compassionate care and modern dental solutions for every member of the family.</motion.p>
      <motion.div className="hero-actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5 }}>
        <a className="btn btn-primary" {...book}>Book an appointment <ArrowUpRight size={19} /></a>
        <a className="btn btn-glass glass" href={wa()} {...ext}><MessageCircle size={19} /> WhatsApp us</a>
      </motion.div>
      <div className="hero-proof">
        <GoogleG size={26} />
        <div><Stars /><small>Loved by families across Kochi</small></div>
      </div>
    </div>
    <div className="hero-art">
      <div className="tooth-halo" />
      <Tooth3D />
      <div className="float-chip glass chip-a"><ShieldCheck size={20} /> Preventive protection</div>
      <div className="float-chip glass chip-b"><Sparkles size={20} /> Modern & painless</div>
      <div className="drag-hint"><Hand size={16} /> Drag to rotate</div>
    </div>
  </section>;
}

// Home page shows a short version with "Know More"; the About page (full) shows everything.
function About({ full = false }) {
  return <section className="about section-pad" id="about">
    {!full && <div className="kasavu" />}
    <div className="about-grid">
      <Reveal className="about-media">
        <div className="arch arch-main"><img src={img('1606811841689-23dfddce3e95', 1000)} alt="Dentist explaining treatment to a patient" loading="lazy" /></div>
        <div className="arch-round"><img src={img('1629909615184-74f495363b67', 500)} alt="Clean, modern treatment room" loading="lazy" /></div>
        <div className="about-badge glass"><Heart size={22} /><span><b>Gentle care</b><small>for every age</small></span></div>
      </Reveal>
      <div className="about-copy">
        <Reveal><Eyebrow>About United Smiles</Eyebrow><h2>Trusted dental care <em>since 2008.</em></h2></Reveal>
        <Reveal delay={.1}>
          <p className="large">At United Smiles Family Dentistry, we believe a healthy smile is the beginning of confidence.</p>
          <p>Since 2008, we have been committed to making quality dental care accessible, comfortable and personalised for every member of the family.</p>
          {full && <p>From routine dental check-ups to advanced smile transformations, we bring together compassionate care and modern dental solutions to help you smile with confidence.</p>}
        </Reveal>
        {full ? null : <>
          <Reveal delay={.2} className="lead-doctor glass">
            <div className="lead-photo"><img src={doctorPhoto('annie-mohan.jpg')} alt="Dr. Annie Mohan" loading="lazy" /></div>
            <div>
              <span className="tag">Chief Dental Surgeon</span>
              <h3>Dr. Annie Mohan</h3>
              <p>Caring for smiles at United Smiles since 2008.</p>
              <small>BDS · 25+ years of experience</small>
            </div>
          </Reveal>
          <Reveal delay={.25}><a className="btn btn-primary know-more" href={ABOUT_PAGE}>Know More <ArrowRight size={19} /></a></Reveal>
        </>}
      </div>
    </div>
    {full && <div className="why">
      <Reveal className="why-head"><Eyebrow>Why choose United Smiles?</Eyebrow><h2>More than dentistry. <em>A relationship built on trust.</em></h2>
        <p>We combine experience, modern dentistry and compassionate care to make every smile matter.</p></Reveal>
      <div className="why-grid">
        {whyUs.map(({ icon: Icon, title, text }, i) => <Reveal key={title} delay={i * .06} className="why-card glass">
          <span className="why-icon"><Icon size={24} /></span>
          <h3>{title}</h3>
          <p>{text}</p>
        </Reveal>)}
      </div>
    </div>}
  </section>;
}

function MeetAnnie() {
  return <section className="annie section-pad" id="dr-annie">
    <Reveal className="annie-photo"><img src={doctorPhoto('annie-mohan.jpg')} alt="Dr. Annie Mohan" /></Reveal>
    <Reveal className="annie-copy" delay={.1}>
      <Eyebrow>Meet our chief dentist</Eyebrow>
      <h2>Dr. Annie <em>Mohan</em></h2>
      <p className="annie-role">BDS · Chief Dental Surgeon</p>
      <div className="annie-stats">
        <div className="glass"><b>25+</b><small>Years of experience</small></div>
        <div className="glass"><b>2008</b><small>Caring for smiles since</small></div>
      </div>
      <p>Dr. Annie Mohan leads United Smiles Family Dentistry, guiding every treatment with the expertise and clinical experience she has built over more than 25 years.</p>
      <p>Since founding the clinic in 2008, her focus has stayed the same: understanding each patient’s needs and expectations, and creating personalised, family-friendly care for every generation.</p>
      <a className="btn btn-primary" {...book}>Book with Dr. Annie <ArrowUpRight size={19} /></a>
    </Reveal>
  </section>;
}

function Doctors({ visitingOnly = false }) {
  const list = visitingOnly ? doctors.filter(d => d.note.startsWith('Visiting')) : doctors;
  return <section className="doctors section-pad" id="doctors">
    <div className="doctors-head">
      <Reveal><Eyebrow>{visitingOnly ? 'Visiting specialists' : 'Our doctors'}</Eyebrow><h2>Expert hands, <em>under one roof.</em></h2></Reveal>
      <Reveal className="doctors-aside"><p>{visitingOnly ? 'Alongside Dr. Annie, these specialists visit United Smiles regularly' : 'Led by Dr. Annie Mohan, with visiting specialists in orthodontics, oral surgery, implantology and laser dentistry'} — so you get specialist care without leaving Kochi.</p></Reveal>
    </div>
    <div className="doctor-row">
      {list.map((d, i) => <Reveal key={i} delay={i * .08} className={`doctor-card d${i}`}>
        <div className="doctor-arch"><img src={d.img} alt={d.name} loading="lazy" /></div>
        <div className="doctor-info glass">
          <span className="tag">{d.degree} · {d.role}</span>
          <h3>{d.name}</h3>
          <small>{d.note}</small>
        </div>
      </Reveal>)}
    </div>
  </section>;
}

function Treatments() {
  const n = treatments.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const w = useWidth();
  const rx = Math.min(w * .34, 440), rz = 260;
  const go = d => setActive(a => (a + d + n) % n);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => go(1), 4500);
    return () => clearInterval(t);
  }, [paused]);

  return <section className="treatments section-pad" id="treatments">
    <div className="treat-head">
      <Reveal><Eyebrow>Our dental specialities</Eyebrow><h2>Complete dental care. <em>Beautifully connected.</em></h2></Reveal>
      <Reveal className="slider-controls">
        <button className="glass" onClick={() => go(-1)} aria-label="Previous treatment"><ChevronLeft /></button>
        <button className="glass" onClick={() => go(1)} aria-label="Next treatment"><ChevronRight /></button>
      </Reveal>
    </div>
    <div className="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <motion.div className="carousel-stage" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={.12}
        onDragStart={() => setPaused(true)}
        onDragEnd={(e, { offset }) => { if (offset.x < -50) go(1); else if (offset.x > 50) go(-1); }}>
        {treatments.map((t, i) => {
          let off = ((i - active) % n + n) % n;
          if (off > n / 2) off -= n;
          const th = off * 2 * Math.PI / n, abs = Math.abs(off);
          return <motion.article key={t.title} className={`t-card ${off === 0 ? 'front' : ''}`}
            style={{ zIndex: 10 - abs }}
            animate={{ x: Math.sin(th) * rx, z: (Math.cos(th) - 1) * rz, rotateY: Math.sin(th) * 24, scale: off === 0 ? 1 : .88, opacity: abs >= 3 ? 0 : 1, filter: `brightness(${1 - abs * .1})` }}
            transition={{ type: 'spring', stiffness: 70, damping: 18 }}
            onClick={() => off !== 0 && setActive(i)} aria-hidden={off !== 0}>
            <div className="t-img"><img src={t.img} alt={t.title} loading="lazy" draggable="false" /><span className="t-no">0{i + 1}</span></div>
            <div className="t-body">
              <span className="tag">{t.tag}</span>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <a className="t-link" tabIndex={off === 0 ? 0 : -1} {...book}>Book a consultation <ArrowRight size={17} /></a>
            </div>
          </motion.article>;
        })}
      </motion.div>
    </div>
    <div className="dots">{treatments.map((t, i) => <button key={t.title} className={i === active ? 'on' : ''} onClick={() => setActive(i)} aria-label={`Show ${t.title}`} />)}</div>
  </section>;
}

function Gallery() {
  const [more, setMore] = useState(false);
  const shown = gallery.slice(0, 5), rest = gallery.slice(5);
  return <section className="gallery section-pad" id="gallery">
    <div className="kasavu" />
    <div className="treat-head">
      <Reveal><Eyebrow>Inside our clinic</Eyebrow><h2>A calm space, <em>made for you.</em></h2></Reveal>
    </div>
    <div className="collage">
      {shown.map((id, i) => <Reveal key={id} delay={i * .05} className={`tile tile-${i}`}>
        <img src={img(id, i === 0 ? 1100 : 700)} alt="United Smiles clinic" loading="lazy" />
        {i === 4 && !more && <button className="tile-more glass" onClick={() => setMore(true)}><b>+{rest.length}</b>View more</button>}
      </Reveal>)}
    </div>
    <AnimatePresence>{more && <motion.div className="collage-more" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
      {rest.map(id => <div key={id} className="tile"><img src={img(id, 700)} alt="United Smiles clinic" loading="lazy" /></div>)}
    </motion.div>}</AnimatePresence>
    {more && <div className="center"><button className="btn btn-glass glass" onClick={() => setMore(false)}>Show less</button></div>}
  </section>;
}

// Live Google reviews via a Jotform website widget (configured in the Jotform dashboard).
const REVIEWS_WIDGET = '01a2125bae4070008ee93d2ce1204d281fe7';

function Reviews() {
  useEffect(() => {
    const s = document.createElement('script');
    s.src = `https://www.jotform.com/website-widgets/embed/${REVIEWS_WIDGET}`;
    s.defer = true;
    document.body.appendChild(s);
    return () => s.remove();
  }, []);
  return <section className="reviews section-pad" id="reviews">
    <div className="treat-head">
      <Reveal><Eyebrow>Patient reviews</Eyebrow><h2>Kind words from <em>our patients.</em></h2></Reveal>
    </div>
    <div className="reviews-widget" id={`JFWebsiteWidget-${REVIEWS_WIDGET}`} />
  </section>;
}

function InstaFeed() {
  const [playing, setPlaying] = useState(null);
  useEffect(() => {
    if (!playing) return;
    const onKey = e => e.key === 'Escape' && setPlaying(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [playing]);

  return <section className="insta section-pad" id="instagram">
    <Reveal className="insta-copy">
      <Eyebrow>On Instagram</Eyebrow>
      <h2>Smile tips & <em>clinic moments.</em></h2>
      <p>Quick tips, real smile stories and a peek behind the scenes. Tap any reel to watch.</p>
      <a className="btn btn-glass glass" href={CLINIC.instagram} target="_blank" rel="noreferrer"><Instagram size={19} /> Follow @{CLINIC.igHandle}</a>
    </Reveal>
    <Reveal className="ig-feed glass" delay={.1}>
      <div className="ig-profile">
        <span className="ig-ring"><img src={LOGO} alt="" /></span>
        <div className="ig-meta">
          <b>{CLINIC.igHandle}</b>
          <div className="ig-stats"><span><b>120</b> posts</span><span><b>4.8K</b> followers</span></div>
          <small>Dental clinic · {CLINIC.city}</small>
        </div>
        <a className="ig-follow" href={CLINIC.instagram} target="_blank" rel="noreferrer">Follow</a>
      </div>
      <div className="ig-grid">
        {reels.map(r => <button className="ig-tile" key={r.img} onClick={() => setPlaying(r)} aria-label={`Play reel: ${r.caption}`}>
          <img src={img(r.img, 400)} alt="" loading="lazy" />
          <span className="ig-play"><Play size={22} fill="currentColor" /></span>
          <span className="ig-views"><Play size={12} fill="currentColor" /> {r.views}</span>
        </button>)}
      </div>
    </Reveal>
    <AnimatePresence>{playing && <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPlaying(null)} role="dialog" aria-modal="true" aria-label={playing.caption}>
      <motion.div className="modal-card glass" initial={{ scale: .9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .9, y: 20 }} onClick={e => e.stopPropagation()}>
        <video src={SAMPLE_VIDEO} poster={img(playing.img, 600)} autoPlay controls playsInline loop />
        <div className="modal-caption"><span className="ig-ring small"><img src={LOGO} alt="" /></span><div><b>{CLINIC.igHandle}</b><p>{playing.caption}</p></div></div>
        <button className="modal-close glass round" onClick={() => setPlaying(null)} aria-label="Close video" autoFocus><X /></button>
      </motion.div>
    </motion.div>}</AnimatePresence>
  </section>;
}

function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const submit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      // Formspree emails every field to the clinic.
      const res = await fetch(FORMSPREE, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };
  return <section className="contact section-pad" id="contact">
    <div className="blob blob-c" />
    <div className="contact-left">
      <Reveal>
        <Eyebrow>Visit us</Eyebrow>
        <h2>Let’s make you <em>smile more.</em></h2>
        <p>Have a question or ready to book? Send us a note, call or WhatsApp — our team will help you find the right next step.</p>
        <div className="contact-list">
          <a className="glass" href={CLINIC.maps} {...ext}><MapPin size={20} /><p><small>FIND US · GET DIRECTIONS</small>{CLINIC.address}</p></a>
          <div className="glass"><Clock3 size={20} /><p><small>OPENING HOURS</small>{CLINIC.hours}</p></div>
          <a className="glass" href={tel}><Phone size={20} /><p><small>CALL / WHATSAPP</small>{CLINIC.phone}</p></a>
          <a className="glass" href={`mailto:${CLINIC.email}`}><Mail size={20} /><p><small>EMAIL</small>{CLINIC.email}</p></a>
        </div>
      </Reveal>
    </div>
    <Reveal className="contact-right">
      <form className="contact-form glass" onSubmit={submit}>
        {status === 'sent' ? <div className="success"><span><Check size={26} /></span><h3>Thank you!</h3><p>Your appointment request has been sent. Our team will contact you shortly to confirm.</p><button type="button" className="t-link" onClick={() => setStatus('idle')}>Send another request</button></div> : <>
          <h3>Request an appointment</h3>
          <input type="hidden" name="_subject" value="New appointment request — United Smiles website" />
          <div className="form-row">
            <label>Your name<input name="name" required placeholder="Full name" autoComplete="name" /></label>
            <label>Phone number<input name="phone" type="tel" required placeholder="+91" autoComplete="tel" /></label>
          </div>
          <div className="form-row">
            <label>Preferred date<input name="preferred_date" type="date" required min={today} /></label>
            <label>Preferred time<input name="preferred_time" type="time" required min="10:00" max="19:00" /></label>
          </div>
          <label>Treatment<select name="treatment" defaultValue=""><option value="" disabled>Choose a treatment</option>{treatments.map(t => <option key={t.title}>{t.title}</option>)}<option>General check-up</option></select></label>
          <label>Message<textarea name="message" rows="3" placeholder="Anything we should know?" /></label>
          {status === 'error' && <p className="form-error" role="alert">Sorry, the request couldn’t be sent. Please try again, or call / WhatsApp us on {CLINIC.phone}.</p>}
          <div className="form-actions">
            <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : <>Send request <ArrowUpRight size={19} /></>}</button>
            <a className="btn btn-glass glass" href={wa('Hello United Smiles, I would like to book an appointment.')} {...ext}><MessageCircle size={19} /> WhatsApp</a>
            <a className="btn btn-glass glass" href={tel}><Phone size={19} /> Call</a>
          </div>
          <small className="form-note">Clinic hours: {CLINIC.hours}. We’ll confirm your slot by phone.</small>
        </>}
      </form>
      <iframe className="map glass" title="United Smiles location map" loading="lazy" src={CLINIC.mapEmbed} />
    </Reveal>
  </section>;
}

function Footer() {
  return <footer className="footer section-pad">
    <div className="footer-panel glass">
      <div className="footer-brand">
        <a className="brand light" href={HOME}><img className="brand-mark" src={LOGO} alt="" /><span>United Smiles<small>FAMILY DENTISTRY · KOCHI</small></span></a>
        <p>Traditional care.<br />Modern smiles.</p>
      </div>
      <div className="footer-col"><span>EXPLORE</span>{NAV.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</div>
      <div className="footer-col"><span>CONTACT</span>
        <a href={tel}><Phone size={16} /> {CLINIC.phone}</a>
        <a href={`mailto:${CLINIC.email}`}><Mail size={16} /> {CLINIC.email}</a>
        <a href={CLINIC.maps} {...ext}><MapPin size={16} /> {CLINIC.address}</a>
      </div>
      <div className="footer-col"><span>FOLLOW</span>
        <a className="btn btn-glass glass" href={CLINIC.instagram} target="_blank" rel="noreferrer"><Instagram size={18} /> Instagram</a>
        <a className="btn btn-glass glass" href={wa()} {...ext}><MessageCircle size={18} /> WhatsApp</a>
      </div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} United Smiles Family Dentistry, Kochi.</span><button onClick={() => scrollTo('top')}>Back to top ↑</button></div>
  </footer>;
}

function QuickActions() {
  const [open, setOpen] = useState(false);
  const actions = [
    { label: 'Call us', href: tel, icon: <Phone size={22} />, cls: 'qa-call' },
    { label: 'Book appointment', icon: <CalendarCheck size={22} />, cls: 'qa-book', ...book },
    { label: 'WhatsApp', href: wa('Hello United Smiles, I have a question.'), icon: <MessageCircle size={22} />, cls: 'qa-wa', ...ext },
  ];
  return <div className="quick-actions">
    <AnimatePresence>{open && actions.map(({ label, icon, cls, ...link }, i) =>
      <motion.a key={label} className={`qa-item ${cls}`} {...link} aria-label={label}
        initial={{ opacity: 0, y: 20, scale: .6 }} animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: i * .05 } }} exit={{ opacity: 0, y: 20, scale: .6, transition: { delay: (2 - i) * .04 } }}>
        <span className="qa-label glass">{label}</span><span className="qa-icon">{icon}</span>
      </motion.a>)}
    </AnimatePresence>
    <button className="qa-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close quick actions' : 'Open quick actions'}>
      <motion.span animate={{ rotate: open ? 45 : 0 }} style={{ display: 'grid' }}><Plus size={28} /></motion.span>
    </button>
  </div>;
}

function AboutHero() {
  return <section className="page-hero section-pad" id="top">
    <div className="blob blob-a" /><div className="blob blob-b" />
    <nav className="crumbs" aria-label="Breadcrumb"><a href={HOME}>Home</a> / <span>About us</span></nav>
    <Eyebrow>United Smiles Family Dentistry</Eyebrow>
    <h1>Every smile has a story. <em>Let yours shine.</em></h1>
    <p className="lead">Trusted dental care since 2008 — compassionate, modern and personalised for every member of the family.</p>
  </section>;
}

const isAboutPage = document.body.dataset.page === 'about';

function App() {
  // Sections render after load, so the browser's own jump to #section (from the other page) misses; redo it once mounted.
  useEffect(() => { if (location.hash) setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView(), 300); }, []);
  return <div className="site">
    <Header />
    {isAboutPage
      ? <main><AboutHero /><About full /><MeetAnnie /><Doctors visitingOnly /><Treatments /><Reviews /><Contact /></main>
      : <main><Hero /><About /><Doctors /><Treatments /><Gallery /><Reviews /><InstaFeed /><Contact /></main>}
    <Footer />
    <QuickActions />
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);

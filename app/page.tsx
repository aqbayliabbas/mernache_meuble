'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowDownRight, ArrowLeft, ArrowRight, Camera, MapPin, Menu, Search, X } from 'lucide-react'

const images = {
  hero: '/hero.webp',
  intro: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
  wood: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=85',
  salon: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=85',
  bedroom: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=1400&q=85',
  storage: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1400&q=85',
  craft: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1600&q=85',
  custom: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85',
  showroom: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
}

const collections = [
  { name: 'Salons', description: 'Des espaces pensés pour vivre, recevoir et partager.', image: images.salon },
  { name: 'Chambres', description: 'Le confort comme point de départ.', image: images.bedroom },
  { name: 'Rangement', description: 'Optimiser chaque espace avec justesse.', image: images.storage },
  { name: 'Literie', description: 'Des nuits qui commencent par le bon choix.', image: images.bedroom },
  { name: 'Séparations', description: 'Dessiner les volumes autrement.', image: images.custom },
  { name: 'Sur mesure', description: 'Votre projet, notre savoir-faire.', image: images.wood },
]

const articles = [
  { category: 'Conseils', title: 'Comment aménager un salon contemporain', image: images.salon },
  { category: 'Inspiration', title: 'Le bois dans l’aménagement intérieur', image: images.wood },
  { category: 'Maison', title: 'Optimiser les petits espaces', image: images.storage },
]

const storyItems = [
  { title: 'Le salon', text: 'Des espaces pensés pour vivre, recevoir et partager.', image: images.salon },
  { title: 'La chambre', text: 'Créer un environnement où confort et esthétique se rencontrent.', image: images.bedroom },
  { title: 'Le rangement', text: 'Des solutions pensées pour optimiser chaque espace.', image: images.storage },
]

const brandValues = ['Fabrication locale', 'Savoir-faire depuis 1993', 'Finitions soignées', 'Création sur mesure', 'Matières choisies']

function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  return <span className={`brand-logo ${inverse ? 'brand-logo--inverse' : ''}`}><Image className="brand-logo-image" src="/mernach logo.svg" alt="Mernache Meubles" width={520} height={149} priority /></span>
}

function AnimatedTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion()

  return <motion.h2
    className={`animated-title ${className}`}
    initial={shouldReduceMotion ? false : { y: 24 }}
    whileInView={shouldReduceMotion ? {} : { y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
  >{children}</motion.h2>
}

function SectionIntro({ title, children, dark = false }: { title: string; children?: React.ReactNode; dark?: boolean }) {
  const shouldReduceMotion = useReducedMotion()

  return <div className={`section-intro ${dark ? 'section-intro--dark' : ''}`}>
    <AnimatedTitle>{title}</AnimatedTitle>
    {children && <motion.p initial={shouldReduceMotion ? false : { opacity: .55, y: 14 }} whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: .65 }}>{children}</motion.p>}
  </div>
}

const reveal: Variants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }

export default function Page() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [heroSlide, setHeroSlide] = useState(0)
  const [heroPaused, setHeroPaused] = useState(false)
  const [story, setStory] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const motionProps = shouldReduceMotion ? {} : { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.2 }, variants: reveal }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (shouldReduceMotion || heroPaused) return
    const interval = window.setInterval(() => setHeroSlide((current) => (current + 1) % collections.length), 6500)
    return () => window.clearInterval(interval)
  }, [heroPaused, heroSlide, shouldReduceMotion])

  const changeHeroSlide = (direction: number) => setHeroSlide((current) => (current + direction + collections.length) % collections.length)
  const changeStory = (direction: number) => setStory((current) => (current + direction + storyItems.length) % storyItems.length)

  return <main>
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <a href="#top" aria-label="Mernache Meubles, accueil"><BrandLogo inverse={!scrolled} /></a>
      <nav className="desktop-nav" aria-label="Navigation principale"><a href="#collections">Collections</a><a href="#savoir-faire">Savoir-faire</a><a href="#histoire">À propos</a><a href="#journal">Journal</a></nav>
      <div className="header-actions"><button className="icon-button" onClick={() => setSearchOpen(true)} aria-label="Rechercher"><Search size={17} /></button><a className="header-instagram" href="https://instagram.com/mernache_meubles" target="_blank" rel="noreferrer"><Camera size={16} /> Instagram</a><a className="header-contact" href="#contact">Contact</a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button></div>
      {menuOpen && <div className="mobile-menu"><a href="#collections" onClick={() => setMenuOpen(false)}>Collections</a><a href="#savoir-faire" onClick={() => setMenuOpen(false)}>Savoir-faire</a><a href="#histoire" onClick={() => setMenuOpen(false)}>À propos</a><a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></div>}
    </header>

    {searchOpen && <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Recherche"><button onClick={() => setSearchOpen(false)} aria-label="Fermer"><X size={26} /></button><h2 className="search-title">Rechercher dans l’univers Mernache</h2><label htmlFor="search">Que recherchez-vous ?</label><div className="search-field"><input id="search" autoFocus placeholder="Salon, chambre, rangement…" /><ArrowRight size={22} /></div></div>}

    <section className="hero hero--premium" id="top">
      <AnimatePresence initial={false}>
        <motion.div className="hero-image-slide" key={collections[heroSlide].name} initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <Image src={heroSlide === 0 ? images.hero : collections[heroSlide].image} alt={`Collection ${collections[heroSlide].name} dans un intérieur contemporain`} fill priority={heroSlide === 0} sizes="100vw" className="hero-image" />
        </motion.div>
      </AnimatePresence>
      <div className="hero-shade" />
      <div className="hero-gridline hero-gridline--one" />
      <div className="hero-gridline hero-gridline--two" />
      <motion.div className="hero-content" initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }} animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
        <h1>Des intérieurs<br /><em>qui restent.</em></h1>
        <p>Le mobilier comme une signature. Des lignes justes, des matières choisies et un savoir-faire transmis depuis plus de 30 ans.</p>
        <div className="hero-ctas"><a href="#collections" className="button button--yellow">Explorer la maison <ArrowRight size={16} /></a><a href="#savoir-faire" className="button button--outline">Notre savoir-faire</a></div>
      </motion.div>
      <motion.div className="hero-feature-card" initial={shouldReduceMotion ? false : { opacity: 0, x: 36 }} animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.4 }} onMouseEnter={() => setHeroPaused(true)} onMouseLeave={() => setHeroPaused(false)} onFocusCapture={() => setHeroPaused(true)} onBlurCapture={() => setHeroPaused(false)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div className="hero-feature-copy" key={collections[heroSlide].name} initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} aria-live="polite">
            <span>{String(heroSlide + 1).padStart(2, '0')} / {String(collections.length).padStart(2, '0')}</span>
            <strong>La collection<br />{collections[heroSlide].name}</strong>
            <a href="#collections">Voir la collection <ArrowRight size={15} /></a>
          </motion.div>
        </AnimatePresence>
        <div className="slider-arrows hero-slider-arrows">
          <button type="button" onClick={() => changeHeroSlide(-1)} aria-label="Collection précédente"><ArrowLeft size={16} /></button>
          <button type="button" onClick={() => changeHeroSlide(1)} aria-label="Collection suivante"><ArrowRight size={16} /></button>
        </div>
      </motion.div>
      <div className="hero-bottom"><span>Mobilier · Savoir-faire · Bejaïa</span><a href="#intro" aria-label="Découvrir la suite"><ArrowDownRight size={25} /></a></div>
    </section>

    <section className="values-marquee" aria-label="Les valeurs Mernache">
      <motion.div className="values-track" animate={shouldReduceMotion ? undefined : { x: ['0%', '-50%'] }} transition={shouldReduceMotion ? undefined : { duration: 36, ease: 'linear', repeat: Infinity }}>
        {[0, 1].map((group) => <div className="values-group" key={group} aria-hidden={group === 1}>{brandValues.map((value) => <span key={`${group}-${value}`}><i />{value}</span>)}</div>)}
      </motion.div>
    </section>

    <section className="intro section-pad" id="intro"><div className="intro-copy"><AnimatedTitle>Plus de <strong>30 ans</strong> de savoir-faire au service de votre intérieur.</AnimatedTitle><p>De la conception à la fabrication, Mernache Meubles propose des solutions d’ameublement pensées pour conjuguer qualité, fonctionnalité et esthétique.</p><a href="#histoire" className="text-link">Découvrir notre histoire <ArrowRight size={17} /></a></div><motion.div className="intro-image" initial={shouldReduceMotion ? false : { opacity: 0, x: 46 }} whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}><Image src={images.intro} alt="Détail d'un intérieur contemporain" fill sizes="(max-width: 900px) 100vw, 48vw" /></motion.div></section>

    <section className="history section-pad" id="histoire"><SectionIntro dark title="Une expertise ancrée dans le temps.">Plus de trois décennies à façonner des intérieurs qui ressemblent à ceux qui les habitent.</SectionIntro><div className="timeline">{[{ year: '1993', title: 'Les débuts', text: 'L’histoire de Mernache Meubles commence dans l’univers du mobilier.' }, { year: '2001', title: 'Une entreprise structurée', text: 'L’entreprise est officiellement enregistrée.' }, { year: 'Aujourd’hui', title: 'Une expertise à Bejaïa', text: 'Mernache Meubles poursuit son activité dans la fabrication, la distribution et la vente de mobilier.' }].map((item, index) => <motion.div className="timeline-item" key={item.year} initial={shouldReduceMotion ? false : { opacity: 0, x: 28 }} whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.65, delay: index * 0.1 }}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></motion.div>)}</div></section>

    <section className="collections section-pad" id="collections"><SectionIntro title="Nos collections.">Des solutions pensées pour chaque espace de la maison.</SectionIntro><div className="collection-grid">{collections.map((item, i) => <motion.a {...motionProps} className={`collection-card collection-card--${i}`} href="#contact" key={item.name} whileHover={shouldReduceMotion ? {} : { y: -8 }} transition={{ duration: 0.35 }}><div className="collection-image"><Image src={item.image} alt={`Collection ${item.name}`} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><div className="collection-overlay" /><div className="collection-copy"><span>{item.name}</span><p>{item.description}</p><ArrowRight size={20} /></div></motion.a>)}</div></section>

    <section className="featured section-pad"><SectionIntro title="Nos pièces incontournables.">Un aperçu de notre univers. Pour connaître les disponibilités, contactez-nous.</SectionIntro><div className="featured-grid">{[{ name: 'Ligne de vie', category: 'Salon', image: images.salon, tag: 'SUR COMMANDE' }, { name: 'Épure', category: 'Chambre', image: images.bedroom, tag: 'NOUVEAUTÉ' }, { name: 'Le juste rangement', category: 'Rangement', image: images.storage, tag: 'À DÉCOUVRIR' }].map((item) => <article className="product-card" key={item.name}><div className="product-image"><Image src={item.image} alt={item.name} fill sizes="(max-width: 700px) 100vw, 33vw" /><span>{item.tag}</span><a href="#contact" className="product-quick">Demander des informations <ArrowRight size={15} /></a></div><div className="product-meta"><span>{item.category}</span><h3>{item.name}</h3><a href="#contact" aria-label={`Découvrir ${item.name}`}><ArrowRight size={18} /></a></div></article>)}</div></section>

    <section className="story" id="story">
      <div className="story-image">
        <AnimatePresence initial={false}>
          <motion.div className="story-image-slide" key={storyItems[story].title} initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <Image src={storyItems[story].image} alt={storyItems[story].title} fill sizes="(max-width: 600px) 100vw, 54vw" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="story-content">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div className="story-copy-slide" key={storyItems[story].title} initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} aria-live="polite">
            <p className="story-count">0{story + 1} <i>/ 0{storyItems.length}</i></p>
            <h2>{storyItems[story].title}</h2>
            <p>{storyItems[story].text}</p>
          </motion.div>
        </AnimatePresence>
        <div className="story-controls">
          <div className="story-dots">{storyItems.map((item, i) => <button key={item.title} className={story === i ? 'active' : ''} onClick={() => setStory(i)} aria-label={`Afficher ${item.title}`} aria-pressed={story === i} />)}</div>
          <div className="slider-arrows story-arrows"><button type="button" onClick={() => changeStory(-1)} aria-label="Espace précédent"><ArrowLeft size={18} /></button><button type="button" onClick={() => changeStory(1)} aria-label="Espace suivant"><ArrowRight size={18} /></button></div>
        </div>
      </div>
    </section>

    <section className="craft section-pad" id="savoir-faire"><div className="craft-copy"><AnimatedTitle>Donner forme au bois. Créer pour durer.</AnimatedTitle><p>Notre expertise repose sur un savoir-faire développé au fil des années, avec une attention portée à la qualité, à la finition et à la durabilité de chaque pièce.</p><span className="gold-line" /></div><motion.div className="craft-image" initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.04 }} whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1 }}><Image src={images.craft} alt="Détail de bois et de fabrication de mobilier" fill sizes="50vw" /></motion.div></section>

    <section className="custom section-pad"><motion.div className="custom-image" initial={shouldReduceMotion ? false : { opacity: 0, x: -42 }} whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9 }}><Image src={images.custom} alt="Intérieur architectural aménagé sur mesure" fill sizes="60vw" /></motion.div><div className="custom-copy"><AnimatedTitle>Votre intérieur. Votre projet.</AnimatedTitle><p>Du mobilier prêt à vivre aux projets personnalisés, Mernache Meubles accompagne vos besoins d’aménagement.</p><a href="#contact" className="button button--teal">Parler de votre projet <ArrowRight size={16} /></a></div></section>

    <section className="showroom section-pad"><div className="showroom-copy"><SectionIntro title="Venez découvrir Mernache Meubles.">Retrouvez nos collections directement dans notre showroom.</SectionIntro><div className="address"><MapPin size={19} /><p>Rue Krim Belkacem<br />Iheddaden, Bejaïa<br />06000, Algérie</p></div><div className="showroom-actions"><a href="#contact" className="button button--teal">Nous contacter <ArrowRight size={16} /></a><a href="#hours" className="text-link">Voir les horaires <ArrowRight size={16} /></a></div></div><div className="showroom-image"><Image src={images.showroom} alt="Espace showroom de mobilier contemporain" fill sizes="50vw" /></div></section>

    <section className="stats section-pad"><div><strong>30+</strong><span>ANNÉES D’EXPÉRIENCE</span></div><div><strong>1993</strong><span>DEPUIS</span></div><div><strong>4.7<span>★</span></strong><span>AVIS GOOGLE</span></div></section>

    <section className="journal section-pad" id="journal"><SectionIntro title="Le Journal Mernache.">Des idées pour penser, aménager et habiter autrement.</SectionIntro><div className="article-grid">{articles.map((article, i) => <article className={`article article--${i}`} key={article.title}><div className="article-image"><Image src={article.image} alt={article.title} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><div className="article-meta"><span>{article.category} · 2026</span><h3>{article.title}</h3><a href="#contact" className="text-link">Lire l’article <ArrowRight size={15} /></a></div></article>)}</div></section>

    <section className="instagram-section section-pad"><div><AnimatedTitle>Suivez notre univers <span>@mernache_meubles</span></AnimatedTitle></div><a href="https://instagram.com/mernache_meubles" target="_blank" rel="noreferrer" className="button button--outline button--dark"><Camera size={17} /> Suivre sur Instagram</a></section>

    <section className="contact section-pad" id="contact"><div className="contact-heading"><AnimatedTitle>Parlons de votre projet.</AnimatedTitle><p>Notre équipe est à votre écoute pour vous guider dans vos choix.</p></div><motion.form className="contact-form" initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }} whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75 }} onSubmit={(e) => e.preventDefault()}><label>Nom<input placeholder="Votre nom" required /></label><label>Email<input type="email" placeholder="votre@email.com" required /></label><label>Téléphone<input placeholder="+213 …" /></label><label>Sujet<select defaultValue=""><option value="" disabled>Choisir un sujet</option><option>Projet sur mesure</option><option>Disponibilité d’un produit</option><option>Informations showroom</option></select></label><label className="full">Message<textarea placeholder="Parlez-nous de votre projet" rows={4} /></label><button className="button button--yellow" type="submit">Envoyer la demande <ArrowRight size={16} /></button></motion.form></section>

    <section className="hours section-pad" id="hours"><div><AnimatedTitle>Venez quand vous voulez.</AnimatedTitle></div><motion.div className="hours-list" initial={shouldReduceMotion ? false : { opacity: 0, x: 32 }} whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.75 }}><div><span>SAMEDI — JEUDI</span><strong>08:30 — 18:30</strong></div><div><span>VENDREDI</span><strong>Fermé</strong></div><p>Les horaires peuvent varier pendant certaines périodes ou jours fériés. Contactez-nous pour confirmation.</p></motion.div></section>

    <footer className="footer"><div className="footer-top"><div className="footer-brand"><BrandLogo inverse /><p>Mobilier & savoir-faire depuis 1993.<br />Bejaïa, Algérie.</p><a href="#contact" className="button button--yellow">Parlons de votre projet <ArrowRight size={16} /></a></div><div className="footer-column"><span>COLLECTIONS</span><a href="#collections">Salons</a><a href="#collections">Chambres</a><a href="#collections">Rangement</a><a href="#collections">Literie</a><a href="#collections">Sur mesure</a></div><div className="footer-column"><span>ENTREPRISE</span><a href="#histoire">À propos</a><a href="#savoir-faire">Savoir-faire</a><a href="#journal">Journal</a><a href="#top">Showroom</a></div><div className="footer-column"><span>CONTACT</span><a href="tel:+213770340102">+213 770 34 01 02</a><a href="tel:+21334170822">+213 34 17 08 22</a><a href="viber://chat?number=%2B213770340102">Viber</a><a href="https://instagram.com/mernache_meubles" target="_blank" rel="noreferrer">Instagram <Camera size={13} /></a></div></div><div className="footer-bottom"><span>© 2026 Mernache Meubles</span><span>Tous droits réservés.</span><span>Bejaïa · Algérie</span></div></footer>
  </main>
}

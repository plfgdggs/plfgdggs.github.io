import { StrictMode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import SplitText from './SplitText'

const workGroups = {
  residential: {
    label: '私宅效果图', en: 'RESIDENTIAL',
    items: [
      { name: '王女士雅居', en: 'WANG RESIDENCE', meta: '上海 · 私宅改造', image: '/assets/project-living.webp', wide: true },
      { name: '生活客厅', en: 'LIVING ROOM', meta: '私宅 · 效果呈现', image: '/assets/residential-living-room.jpg' },
      { name: '静谧主卧', en: 'SERENE BEDROOM', meta: '私宅 · 收纳与休憩', image: '/assets/master-bedroom.webp' },
      { name: '平型关路雅居', en: 'PINGXINGGUAN RESIDENCE', meta: '静安 · 客餐厅全景漫游', image: '/assets/pingxingguan-residence-vr.webp', url: 'https://vr.justeasy.cn/view/17842422k8z686b5-1785661647.html', action: '进入全景漫游' },
      { name: '环镇北路雅居', en: 'HUANZHEN NORTH ROAD RESIDENCE', meta: '宝山 · 客厅全景漫游', image: '/assets/huanzhen-residence-vr.webp', url: 'https://yun.kujiale.com/design/3FO3ATVM16QO/show', action: '进入全景漫游' },
    ],
  },
  commercial: {
    label: '商业空间', en: 'COMMERCIAL',
    items: [
      { name: '招商银行信用卡中心', en: 'CHINA MERCHANTS BANK', meta: '成都 · 办公空间设计', image: '/assets/bank-reception.webp', wide: true },
      { name: '客户等候区', en: 'WAITING LOUNGE', meta: '办公空间 · 公共区域', image: '/assets/bank-waiting-01.webp' },
      { name: '品牌接待厅', en: 'BRAND LOBBY', meta: '办公空间 · 入口形象', image: '/assets/bank-lobby.webp', imagePosition: 'right center' },
      { name: '开放办公区', en: 'OPEN WORKSPACE', meta: '办公空间 · 工作区域', image: '/assets/bank-workspace.webp' },
      { name: '茶水与协作区', en: 'PANTRY SPACE', meta: '办公空间 · 配套空间', image: '/assets/bank-pantry.webp' },
      { name: '办公走廊', en: 'WORKPLACE CORRIDOR', meta: '办公空间 · 动线设计', image: '/assets/bank-corridor.webp' },
      { name: '经理办公室', en: 'EXECUTIVE OFFICE', meta: '办公空间 · 独立办公与会客', image: '/assets/executive-office.webp' },
    ],
  },
  plans: {
    label: '平面方案', en: 'FLOOR PLANS',
    items: [
      { name: '重庆平面改造', en: 'CHONGQING RENOVATION', meta: '重庆 · 私宅改造方案', image: '/assets/chongqing-renovation.webp', wide: true, plan: true },
      { name: '两居布局方案', en: 'TWO BEDROOM PLAN', meta: '私宅 · 平面布局', image: '/assets/residence-plan-01.png', plan: true },
      { name: '两居优化方案', en: 'TWO BEDROOM STUDY', meta: '私宅 · 平面布局', image: '/assets/residence-plan-03.png', plan: true },
      { name: '王女士雅居 · 方案一', en: 'WANG RESIDENCE / 01', meta: '私宅 · 平面深化', image: '/assets/wang-plan-01.png', plan: true },
      { name: '王女士雅居 · 方案二', en: 'WANG RESIDENCE / 02', meta: '私宅 · 平面深化', image: '/assets/wang-plan-02.png', plan: true },
      { name: '惠先生雅居 · 方案一', en: 'HUI RESIDENCE / 01', meta: '私宅 · 平面深化', image: '/assets/wang-option-03.png', plan: true },
      { name: '惠先生雅居 · 方案二', en: 'HUI RESIDENCE / 02', meta: '私宅 · 平面深化', image: '/assets/wang-option-04.png', plan: true },
      { name: '李先生雅居方案一', en: 'LI RESIDENCE / 01', meta: '私宅 · 平面布局深化', image: '/assets/li-residence-plan-01.png', plan: true },
      { name: '李先生雅居方案二', en: 'LI RESIDENCE / 02', meta: '私宅 · 平面布局深化', image: '/assets/li-residence-plan-02.png', plan: true },
      { name: '天辰合院设计方案', en: 'TIANCHEN COURTYARD / FLOOR PLAN', meta: 'PDF · 5 页 · 2.1 MB', image: '/assets/tianchen-courtyard-cover.jpg', file: '/assets/tianchen-courtyard-residence.pdf', action: '在线查看 PDF', wide: true, plan: true },
    ],
  },
  documents: {
    label: '方案资料', en: 'DOCUMENTS',
    items: [
      { name: '广中西路王女士雅居方案', en: 'WANG RESIDENCE PROPOSAL', meta: 'PDF · 7.5 MB', action: '在线查看 PDF', document: 'PDF', cover: '/assets/wang-residence-proposal-cover.jpg', file: '/assets/wang-residence-proposal.pdf', wide: true },
      { name: '殷先生现代意式家居住宅', en: 'YIN RESIDENCE / MODERN ITALIAN', meta: 'PDF · 11.0 MB', action: '在线查看 PDF', document: 'PDF', cover: '/assets/yin-residence-pdf-cover.jpg', file: '/assets/yin-residence-modern-italian.pdf' },
      { name: '马先生雅居设计方案册', en: 'MA RESIDENCE DESIGN BOOK', meta: 'PDF · 7.3 MB', action: '在线查看 PDF', document: 'PDF', cover: '/assets/ma-residence-design-book-cover.jpg', file: '/assets/ma-residence-design-book.pdf' },
    ],
  },
}

const strengths = [
  ['01', '空间叙事', '从居住者的生活方式出发，让每一处动线都有清晰的情绪与意义。'],
  ['02', '整体统筹', '覆盖概念、深化、选材与落地，让设计的完整度经得起时间检验。'],
  ['03', '细部把控', '关注尺度、光线和材质交接，在克制中建立恰到好处的质感。'],
]

function Arrow() { return <span className="arrow">↗</span> }

function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      await audio.play()
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  useEffect(() => () => audioRef.current?.pause(), [])

  return <><audio ref={audioRef} src="/assets/background-music.mp3" loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} /><button className={`music-toggle ${playing ? 'is-playing' : ''}`} type="button" aria-label={playing ? '暂停音乐' : '播放音乐'} aria-pressed={playing} onClick={toggleMusic}><span aria-hidden="true">♪</span></button></>
}

function DockNav({ children }) {
  const updateMagnification = (event) => {
    const links = event.currentTarget.querySelectorAll('a')
    links.forEach((link) => {
      const { left, width } = link.getBoundingClientRect()
      const distance = Math.abs(event.clientX - (left + width / 2))
      const scale = 1 + Math.max(0, 1 - distance / 150) * 0.32
      link.style.setProperty('--dock-scale', scale.toFixed(3))
    })
  }

  const resetMagnification = (event) => {
    event.currentTarget.querySelectorAll('a').forEach((link) => link.style.removeProperty('--dock-scale'))
  }

  return <nav className="dock-nav" onMouseMove={updateMagnification} onMouseLeave={resetMagnification}>{children}</nav>
}

function DockText({ children, className = '' }) {
  const updateMagnification = (event) => {
    event.currentTarget.querySelectorAll('[data-dock-text]').forEach((item) => {
      const { left, width } = item.getBoundingClientRect()
      const distance = Math.abs(event.clientX - (left + width / 2))
      const scale = 1 + Math.max(0, 1 - distance / 110) * 0.16
      item.style.setProperty('--dock-text-scale', scale.toFixed(3))
    })
  }

  const resetMagnification = (event) => {
    event.currentTarget.querySelectorAll('[data-dock-text]').forEach((item) => item.style.removeProperty('--dock-text-scale'))
  }

  return <div className={`dock-text ${className}`} onMouseMove={updateMagnification} onMouseLeave={resetMagnification}>{children}</div>
}

function useSectionReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add('is-visible')
        observer.disconnect()
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return ref
}

function useElementReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible')
        observer.disconnect()
      }
    }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return ref
}

function useImageFlow(rootRef, dependency) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      root.querySelectorAll('.project-reveal').forEach((card) => card.style.setProperty('--image-flow-y', '0%'))
      return undefined
    }

    let frame = 0
    const updateFlow = () => {
      frame = 0
      root.querySelectorAll('.project-reveal').forEach((card) => {
        const { top, height } = card.getBoundingClientRect()
        const progress = (window.innerHeight - top) / (window.innerHeight + height)
        const offset = Math.max(-7, Math.min(7, (progress - 0.5) * 18))
        card.style.setProperty('--image-flow-y', `${offset.toFixed(2)}%`)
      })
    }
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateFlow)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [rootRef, dependency])
}

function HeroMedia() {
  const [loadVideo, setLoadVideo] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 800px), (prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return undefined

    const scheduleLoad = () => setLoadVideo(true)
    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(scheduleLoad, { timeout: 1800 })
      : window.setTimeout(scheduleLoad, 1200)

    return () => {
      if (window.cancelIdleCallback && window.requestIdleCallback) window.cancelIdleCallback(idleId)
      else window.clearTimeout(idleId)
    }
  }, [])

  return <>
    <img className="hero-poster" src="/assets/project-living.webp" alt="" aria-hidden="true" fetchPriority="high" decoding="async" />
    {loadVideo && <video className={`hero-video ${videoReady ? 'is-ready' : ''}`} autoPlay muted loop playsInline preload="metadata" onCanPlay={() => setVideoReady(true)}>
      <source src="/assets/hero.mp4" type="video/mp4" />
    </video>}
  </>
}

function useTextCharacterReveal(rootRef, dependency) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const elements = [...root.querySelectorAll('h1, h2, h3, em')]
      .filter((element) => !element.classList.contains('split-parent') && !element.closest('.card-info'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const animationFrames = []
    const reveal = (element) => {
      const frame = window.requestAnimationFrame(() => element.classList.add('is-visible'))
      animationFrames.push(frame)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })

    elements.forEach((element) => {
      if (!element.classList.contains('text-character-parent')) {
        const textNodes = [...element.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim())
        textNodes.forEach((node) => {
          const characters = [...node.textContent].map((character, index) => {
            const span = document.createElement('span')
            span.className = 'split-char'
            span.style.setProperty('--delay', `${Math.min(index * 30, 900)}ms`)
            span.textContent = character === ' ' ? '\u00a0' : character
            return span
          })
          node.replaceWith(...characters)
        })
        element.classList.add('text-character-parent')
      }

      if (element.closest('.nav') || element.getBoundingClientRect().top < window.innerHeight * 0.88) {
        if (!element.classList.contains('is-visible')) reveal(element)
      } else if (!element.classList.contains('is-visible')) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
      animationFrames.forEach((frame) => window.cancelAnimationFrame(frame))
    }
  }, [rootRef, dependency])
}

function ProjectCard({ project, index, onOpen }) {
  const cardRef = useElementReveal()

  return <button ref={cardRef} className={`project-card project-reveal ${project.wide ? 'wide' : ''} ${project.plan ? 'plan' : ''} ${project.document ? 'document-card' : ''}`} onClick={onOpen} aria-label={project.action || `打开${project.name}`}>
    {project.document && !project.cover ? <div className="document-cover"><span>{project.document}</span><p>PROJECT DOCUMENT</p></div> : <img src={project.cover || project.image} style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined} alt={project.name || '住宅空间效果图'} loading="lazy" decoding="async" />}
    <div className="card-overlay" />
    {project.name && <div className="card-info"><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{project.name} <Arrow /></h3><p>{project.en} / {project.meta}</p><span className="card-action">{project.action || '打开项目'} <Arrow /></span></div></div>}
  </button>
}

function App() {
  const [workType, setWorkType] = useState('residential')
  const [selected, setSelected] = useState(null)
  const [navCompact, setNavCompact] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mainRef = useRef(null)
  const currentGroup = workGroups[workType]
  const aboutRef = useSectionReveal()
  const projectsRef = useSectionReveal()
  const approachRef = useSectionReveal()
  const contactRef = useSectionReveal()
  useTextCharacterReveal(mainRef, workType)
  useImageFlow(mainRef, workType)

  useEffect(() => {
    let frame = 0
    const updateNav = () => {
      frame = 0
      const compact = window.scrollY > 80
      setNavCompact((current) => current === compact ? current : compact)
    }
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateNav)
    }
    updateNav()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
    }
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return undefined
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [mobileMenuOpen])

  const closeMobileMenu = () => setMobileMenuOpen(false)
  const openProject = (project) => project.file || project.url ? window.open(project.file || project.url, '_blank', 'noopener,noreferrer') : setSelected(project)
  const changeWorkType = (type) => setWorkType(type)

  return <main ref={mainRef}>
    <header className={`nav wrap ${navCompact ? 'nav--compact' : ''}`}><a className="brand" href="#top" onClick={closeMobileMenu}>WANG <i /> SHUAI</a><DockNav><a href="#about">关于</a><a href="#projects">作品</a><a href="#approach">理念</a></DockNav><div className="nav-actions"><MusicToggle /><a className="contact-pill" href="#contact">联系我 <Arrow /></a><button className={`menu-toggle ${mobileMenuOpen ? 'is-open' : ''}`} type="button" aria-label={mobileMenuOpen ? '关闭导航菜单' : '打开导航菜单'} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" onClick={() => setMobileMenuOpen((open) => !open)}><span /><span /></button></div><div className={`mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`} id="mobile-navigation" aria-hidden={!mobileMenuOpen} onClick={closeMobileMenu}><div className="mobile-drawer-panel" role="navigation" aria-label="移动端导航" onClick={(event) => event.stopPropagation()}><a href="#about" onClick={closeMobileMenu}><span>01</span>关于</a><a href="#projects" onClick={closeMobileMenu}><span>02</span>作品</a><a href="#approach" onClick={closeMobileMenu}><span>03</span>理念</a><a href="#contact" onClick={closeMobileMenu}><span>04</span>联系我</a></div></div></header>
    <section className="hero" id="top">
      <HeroMedia />
      <div className="hero-shade" />
      <div className="hero-copy wrap"><p className="eyebrow">INTERIOR DESIGNER · SHANGHAI</p><h1>空间，是生活<br />留下的余白。</h1><div className="hero-bottom"><p>以克制的语言，<br />回应真实而具体的日常。</p><span>SCROLL TO EXPLORE ↗</span></div></div>
    </section>

    <section ref={aboutRef} className="about wrap section-reveal" id="about"><div className="section-label"><span>01</span><span>PROFILE</span></div><div className="profile-intro"><SplitText text="我相信，好的空间不止于视觉。它应当与光线、时间和人的习惯一起生长，成为日常中安静而笃定的背景。" className="intro" /><p>室内设计师 / 上海<br />27 岁 / 关注私宅与商业空间</p></div><div className="profile-grid"><article><span>EDUCATION</span><h3>教育背景</h3><p>2018.09 — 2020.06<br />上海济光职业技术学院<br /><b>室内设计</b></p></article><article><span>EXPERIENCE</span><h3>工作经历</h3><div className="career-list"><p><b>2026</b>云岚兴国装饰工程有限公司 设计师</p><p><b>2025</b>金筑未来<br />设计师助理及设计师</p><p><b>2023 — 2025</b>拉齐娜国际设计集团<br />设计师助理</p></div></article><article><span>TOOLS</span><h3>专业技能</h3><p className="tools">SketchUp · Enscape<br />3ds Max · AutoCAD<br />Photoshop · Premiere<br />After Effects · PPT</p></article></div></section>

    <section ref={projectsRef} className="projects wrap section-reveal" id="projects"><div className="project-heading"><DockText className="section-label"><span data-dock-text>02</span><span data-dock-text>SELECTED WORKS</span></DockText><div><h2>选择以真实生活<br />为尺度的作品。</h2><div className="work-tabs" role="tablist">{Object.entries(workGroups).map(([key, group]) => <button key={key} className={workType === key ? 'active' : ''} onClick={() => changeWorkType(key)}>{group.label} <small>{group.en}</small></button>)}</div></div></div><div className="project-grid" key={workType}>{currentGroup.items.map((project, index) => <ProjectCard key={project.file || project.url || project.image} project={project} index={index} onOpen={() => openProject(project)} />)}</div></section>

    <section ref={approachRef} className="approach section-reveal" id="approach"><div className="wrap"><div className="section-label"><span>03</span><span>WHAT I VALUE</span></div><div className="approach-head"><h2>设计，是感受<br />也是秩序。</h2><p>不追逐短暂的风格标签。<br />我更愿意倾听空间本身，<br />以及住在其中的人。</p></div><div className="strength-grid">{strengths.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><Arrow /></article>)}</div></div></section>
    <section ref={contactRef} className="contact section-reveal" id="contact"><div className="contact-curve" /><div className="wrap contact-inner"><p className="eyebrow">START A CONVERSATION</p><h2>让空间，<br /><em>慢慢成为你。</em></h2><div className="contact-details"><a className="contact-link" href="tel:13167166830">131 6716 6830 <Arrow /></a><div className="qr-contact"><div className="qr-code"><img src="/assets/wechat-qr.jpg" alt="王帅微信二维码" /></div><span>扫码添加微信</span></div></div><footer><span>© 2026 WANG SHUAI</span><span>SHANGHAI, CHINA</span><a href="#top">BACK TO TOP ↗</a></footer></div></section>
    {selected && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setSelected(null)}><button className="lightbox-close" onClick={() => setSelected(null)} aria-label="关闭">×</button><figure onClick={(event) => event.stopPropagation()}><img src={selected.image} alt={selected.name || '住宅空间效果图'} />{selected.name && <figcaption><span>{selected.en}</span><strong>{selected.name}</strong><span>{selected.meta}</span></figcaption>}</figure></div>}
  </main>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)

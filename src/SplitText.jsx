import { useEffect, useRef, useState } from 'react'

export default function SplitText({ text, className = '', tag = 'p' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -80px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const Tag = tag
  return <Tag ref={ref} className={`split-parent ${visible ? 'is-visible' : ''} ${className}`}>{[...text].map((character, index) => <span className="split-char" style={{ '--delay': `${index * 38}ms` }} key={`${character}-${index}`}>{character === ' ' ? '\u00a0' : character}</span>)}</Tag>
}

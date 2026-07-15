import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Scroll-triggered reveals across the portfolio. Client-only (no SSR): the
 * markup renders visible on the server, then on the client each group fades and
 * lifts into place as it scrolls into view. Batched so grid items stagger in
 * together. Honors prefers-reduced-motion (leaves everything visible), and
 * re-arms after every route change.
 */
export default defineNuxtPlugin(nuxtApp => {
  gsap.registerPlugin(ScrollTrigger)

  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // selector → travel distance + stagger between siblings entering together
  const groups: { sel: string; y: number; stagger: number }[] = [
    { sel: '.sec-head', y: 26, stagger: 0 },
    { sel: '.stat', y: 18, stagger: 0.08 },
    { sel: '.work-card', y: 34, stagger: 0.09 },
    { sel: '.service-card', y: 28, stagger: 0.07 },
    { sel: '.skill-card', y: 28, stagger: 0.07 },
    { sel: '.exp-item', y: 24, stagger: 0.1 },
    { sel: '.partner', y: 22, stagger: 0.09 },
    { sel: '.use', y: 24, stagger: 0.05 },
    { sel: '.feat__art', y: 34, stagger: 0 },
    { sel: '.feat__copy', y: 26, stagger: 0 },
    { sel: '.contact__panel', y: 32, stagger: 0 },
    // project detail pages
    { sel: '.proj__shot', y: 30, stagger: 0.08 },
    { sel: '.step, .backend', y: 26, stagger: 0.08 },
  ]

  function setup() {
    ScrollTrigger.getAll().forEach(t => t.kill())
    if (reduce()) return

    for (const g of groups) {
      const els = gsap.utils.toArray<HTMLElement>(g.sel)
      if (!els.length) continue
      gsap.set(els, { opacity: 0, y: g.y })
      ScrollTrigger.batch(els, {
        start: 'top 88%',
        once: true,
        onEnter: batch =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger: g.stagger,
            overwrite: true,
          }),
      })
    }
    ScrollTrigger.refresh()
  }

  // initial run once hydration has painted, and after every navigation
  setTimeout(setup, 300)
  nuxtApp.hook('page:finish', () => setTimeout(setup, 150))
})

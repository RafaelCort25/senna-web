import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useTextReveal() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const targets = ref.current.querySelectorAll('[data-reveal]');

      targets.forEach((el) => {
        if (el.dataset.revealed === 'true') return;
        el.dataset.revealed = 'true';

        const text = el.textContent;
        const words = text.split(' ');

        el.innerHTML = words
          .map(
            (word) =>
              `<span class="inline-block overflow-hidden"><span class="reveal-word inline-block">${word}</span></span>`
          )
          .join('<span class="inline-block">&nbsp;</span>');

        const wordEls = el.querySelectorAll('.reveal-word');

        gsap.fromTo(
          wordEls,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.06,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}

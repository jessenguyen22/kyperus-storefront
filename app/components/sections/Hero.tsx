import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useMaskSettings } from '../../constants';
import Intro from "./Intro"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { initialMaskPos, initialMaskSize, maskPos, maskSize } = useMaskSettings();

  useGSAP(() => {
    gsap.set('.mask-wrapper', {
      maskPosition: initialMaskPos,
      maskSize: initialMaskSize,
    });

    gsap.set('.mask-logo', { marginTop: '-100vh', opacity: 0 });

    gsap.set('.entrance-message', { marginTop: '0vh' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: '+=200%',
        scrub: 2.5,
        pin: true,
      }
    })

    tl
      .to('.fade-out', { opacity: 0, ease: 'power1.inOut' })
      .to('.scale-out', { scale: 1, ease: 'power1.inOut' })
      .to('.mask-wrapper', { maskSize, ease: 'power1.inOut' }, '<')
      .to('.mask-wrapper', { opacity: 0 })
      .to('.overlay-logo', { opacity: 1, onComplete: () => {
        gsap.to('.overlay-logo', { opacity: 0 });
      } }, '<')
      .to('.entrance-message', { duration: 1, ease: 'power1.inOut', maskImage: 'radial-gradient(circle at 50% 0vh, black 50%, transparent 100%)' }, '<')
  });

  return (
    <section className="hero-section">
      <div className="size-full mask-wrapper">
        <img src="/images/kpr-bg.jpg" alt="background" className="scale-out" />
        <img src="/images/kpr-logo.svg" alt="hero-logo" className="title-logo fade-out" />
        <img  src="/images/kpr-logo-icon.svg" alt="trailer" className="trailer-logo fade-out" />
        <div className="play-img fade-out">
          <img src="/images/play.png" alt="play" className="w-7 ml-1" />
        </div>
      </div>

      <div>
        <img src="/images/kpr-logo-text.svg" alt="logo" className="size-full object-cover mask-logo" />
      </div>

      <div className="fake-logo-wrapper">
        <img src="/images/kpr-logo-text.svg" className="overlay-logo" alt="logo" />
      </div>

      <Intro />
    </section>
  )
}

export default Hero
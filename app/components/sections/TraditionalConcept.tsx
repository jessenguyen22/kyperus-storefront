import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TraditionalConcept = () => {
  useGSAP(() => {
    gsap.set('.traditional-concept', { marginTop: '-80vh' });

    gsap.timeline({
      scrollTrigger: {
        trigger: '.traditional-concept',
        start: 'top 90%',
        end: '10% center',
        scrub: 2,
      }
    }).to('.traditional-video', { opacity: 0, duration: 1, ease: 'power1.inOut' });

    gsap.to('.traditional-concept .img-box', {
      scrollTrigger: {
        trigger: '.traditional-concept',
        start: 'top center',
        end: '80% center',
        scrub: 2
      }, y: -300, duration: 1, ease: 'power1.inOut'
    }, '<')
  }) 

  return (
    <section className="traditional-concept">   
      <div className="max-w-lg traditional-concept-content">
        <h1 className="font-bold text-size-10 bg-gradient-to-r from-white/20 via-white/80 to-white/20 bg-clip-text text-transparent">TRADITIONAL CUES</h1>
        {/* <h2>Jason wants an easy life, but things just keep getting harder.</h2> */}
        <p>Jason grew up around grifters and crooks. After a stint in the Army trying to shake off his troubled teens, he found himself in the Keys doing what he knows best, working for local drug runners. It might be time to try something new.</p>

        <div className="traditional-concept-2">
          <img src="/images/kpr-tradition-2.png" alt="traditional-concept-2" />
        </div>
      </div>

      <div className="space-y-5 mt-96 img-box">
        <div className="traditional-concept-1">
          <img src="/images/kpr-tradition-3.jpg" alt="traditional-concept-1" />
        </div>
        <div className="traditional-concept-3">
          <img src="/images/kpr-tradition-1.jpg" alt="traditional-concept-3" />
        </div>
      </div>
    </section>
  )
}

export default TraditionalConcept
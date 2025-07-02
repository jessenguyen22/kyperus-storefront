import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useEffect } from "react"

const TraditionalVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    gsap.set('.traditional-video-wrapper', { marginTop: '-150vh', opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.traditional-video-wrapper',
        start: 'top top',
        end: '+=200% top',
        scrub: true,
        pin: true,
      }
    });

    tl.to('.hero-section', { delay: 0.5, opacity: 0, ease: 'power1.inOut' });
    tl.to('.traditional-video-wrapper', { opacity: 1, duration: 2, ease: 'power1.inOut' });

    // Wait for video metadata to load, then add scrubbing
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        tl.to(video, { 
          currentTime: video.duration, 
          duration: 3, 
          ease: 'power1.inOut' // Use 'none' for smooth scrubbing
        }, '<');
      };

      if (video.readyState >= 1) {
        // Metadata already loaded
        handleLoadedMetadata();
      } else {
        // Wait for metadata to load
        video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
      }
    }
  }, []);

  // Handle video setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is properly configured
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    
    // Prevent video from auto-playing
    video.pause();
    
    const handleCanPlay = () => {
      // Set initial frame
      video.currentTime = 0;
    };

    video.addEventListener('canplay', handleCanPlay, { once: true });

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <section className="traditional-video-wrapper">
      <div className="h-dvh">
        <video 
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/outputtest.mp4"
          className="traditional-video"
        />
      </div>
    </section>
  )
}

export default TraditionalVideo
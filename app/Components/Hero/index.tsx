import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const loadTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      gsap.set(nameRef.current, { x: -100, opacity: 0 });
      loadTimeline.to(
        nameRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
        },
        0.3
      );
        gsap.set(titleRef.current, { x: -80, opacity: 0 });
      loadTimeline.to(
        titleRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 1,
        },
        0.5
      );


      loadTimeline.to(
        imageContainerRef.current,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power3.inOut",
        },
        0.6
      );

      gsap.to(titleRef.current, {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(nameRef.current, {
        y: 150,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      
      gsap.to(imageContainerRef.current, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Content Layers */}
      <div className={styles.content}>
        {/* Name Layer */}
        <h1 className={styles.name} ref={nameRef}>
          MAHADEVAN REJI
        </h1>

        {/* Title Layer */}
        <p className={styles.title} ref={titleRef}>
          FULL STACK DEVELOPER
        </p>

        {/* Image Layer */}
        <div className={styles.imageContainer} ref={imageContainerRef}>
          <img
            src="/images/kichu_out.webp"
            alt="Mahadevan Reji"
            className={styles.image}
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>SCROLL</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
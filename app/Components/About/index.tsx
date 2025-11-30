"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import styles from "./About.module.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- CORNER TICKS DRAWING ANIMATION ---
      const cornerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 45%",
          scrub: 1.2,
        },
      });

      // Top-left L-shape: animate with smoother progression
      cornerTimeline
        .fromTo(
          `.${styles.topLeftHorizontal}`,
          { width: 0, opacity: 0 },
          { width: "50px", opacity: 1, duration: 0.3, ease: "power2.out" },
          0
        )
        .fromTo(
          `.${styles.topLeftVertical}`,
          { height: 0, opacity: 0 },
          { height: "50px", opacity: 1, duration: 0.3, ease: "power2.out" },
          0.3
        );

      // Bottom-right L-shape: mirror animation with offset
      cornerTimeline
        .fromTo(
          `.${styles.bottomRightHorizontal}`,
          { width: 0, opacity: 0 },
          { width: "50px", opacity: 1, duration: 0.3, ease: "power2.out" },
          0.4
        )
        .fromTo(
          `.${styles.bottomRightVertical}`,
          { height: 0, opacity: 0 },
          { height: "50px", opacity: 1, duration: 0.3, ease: "power2.out" },
          0.7
        );

      // --- TEXT REVEAL ANIMATION ---
      const paragraphs = gsap.utils.toArray<HTMLParagraphElement>(
        `.${styles.paragraph}`
      );

      paragraphs.forEach((p) => {
        // Split text into words and wrap in spans
        const text = p.textContent || "";
        const words = text.split(" ");
        
        // Clear and rebuild with spans
        p.innerHTML = "";
        words.forEach((word, index) => {
          const span = document.createElement("span");
          span.className = styles.word;
          span.textContent = word;
          p.appendChild(span);
          
          // Add space after each word except the last
          if (index < words.length - 1) {
            p.appendChild(document.createTextNode(" "));
          }
        });

        // Now animate the spans
        const wordSpans = p.querySelectorAll(
          `.${styles.word}`
        ) as NodeListOf<HTMLSpanElement>;

        // Simple opacity animation - words go from low opacity to 1
        gsap.fromTo(
          wordSpans,
          { opacity: 0.2 },
          {
            opacity: 1,
            stagger: 0.03,
            ease: "none",
            scrollTrigger: {
              trigger: p,
              start: "top 75%",
              end: "bottom 60%",
              scrub: 1,
            },
          }
        );
      });

      // --- FRAME GLOW EFFECT ---
      gsap.to([`.${styles.topLeft}`, `.${styles.bottomRight}`], {
        filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          end: "top 20%",
          scrub: 1,
        },
      });

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className={styles.aboutSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.frameContainer}>
          {/* Top-left corner tick */}
          <div className={styles.topLeft} ref={topLeftRef}>
            <div className={styles.topLeftHorizontal}></div>
            <div className={styles.topLeftVertical}></div>
          </div>

          {/* Bottom-right corner tick */}
          <div className={styles.bottomRight} ref={bottomRightRef}>
            <div className={styles.bottomRightHorizontal}></div>
            <div className={styles.bottomRightVertical}></div>
          </div>

          {/* Paragraphs with word-by-word animation */}
          <div className={styles.textContainer} ref={textContainerRef}>
            <p className={styles.paragraph}>
              Hey, I&apos;m Mahadevan Reji — most people call me Kichu.
            </p>
            <p className={styles.paragraph}>
              I&apos;m a Full Stack Developer who builds systems that are precise and alive. I like structure, but I also like when things move and feel designed.
            </p>
            <p className={styles.paragraph}>
              I spend my time turning ideas into engineered experiences — fast backends in Rust, smooth interfaces in React Native. My work sits at the intersection of clarity and motion.
            </p>
            <p className={styles.paragraph}>
              Right now, I&apos;m focused on making the web feel intentional — every pixel, every line, every frame.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

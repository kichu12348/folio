import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import styles from "./Skills.module.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// --- Types ---
interface Skill {
  name: string;
  status: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface SkillsData {
  languages: SkillCategory;
  frameworks: SkillCategory;
  tools: SkillCategory;
  [key: string]: SkillCategory; // Index signature
}

// --- Data ---
const skillsData: SkillsData = {
  languages: {
    title: "Languages",
    skills: [
      { name: "JavaScript", status: "Expert" },
      { name: "TypeScript", status: "Expert" },
      { name: "Python", status: "Intermediate" },
      { name: "Go", status: "Intermediate" },
      { name: "Rust", status: "Intermediate" },
      { name: "C", status: "Intermediate" },
      { name: "Java", status: "Intermediate" },
      { name: "HTML", status: "Expert" },
      { name: "CSS", status: "Expert" },
    ],
  },
  frameworks: {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React", status: "Expert" },
      { name: "Next.js", status: "Advanced" },
      { name: "React Native", status: "Advanced" },
      { name: "Three.js", status: "Intermediate" },
      { name: "CSS Modules", status: "Advanced" },
      { name: "Expo", status: "Advanced" },
      { name: "Node.js", status: "Expert" },
      { name: "Express", status: "Expert" },
      { name: "Fastify", status: "Advanced" },
      { name: "Flask", status: "Intermediate" },
      { name: "FastAPI", status: "Intermediate" },
      { name: "NestJS", status: "Advanced" },
      { name: "Hono", status: "Advanced" },
      { name: "Socket.io", status: "Expert" },
      { name: "Deno", status: "Advanced" },
      { name: "Bun", status: "Advanced" },
      { name: "Tauri", status: "Intermediate" },
      { name: "TensorFlow", status: "Beginner" },
    ],
  },
  tools: {
    title: "Tools & Platforms",
    skills: [
      { name: "GitHub", status: "Expert" },
      { name: "npm", status: "Expert" },
      { name: "Vercel", status: "Expert" },
      { name: "Cloudflare Workers", status: "Advanced" },
      { name: "AWS", status: "Advanced" },
      { name: "Google Cloud", status: "Advanced" },
      { name: "MongoDB", status: "Expert" },
      { name: "PostgreSQL", status: "Advanced" },
      { name: "SQLite", status: "Advanced" },
      { name: "Supabase", status: "Advanced" },
      { name: "Firebase", status: "Advanced" },
    ],
  },
};

// --- Component ---
const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Store listeners for cleanup
    const listeners: { el: HTMLElement; type: string; fn: EventListener }[] =
      [];

    // Use GSAP context for safe cleanup
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        `.${styles.sectionHeader}`,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: `.${styles.sectionHeader}`,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      // Section header line animation
      gsap.fromTo(
        `.${styles.sectionHeader} .${styles.line}`,
        { width: 0 },
        {
          width: "60px",
          ease: "none",
          scrollTrigger: {
            trigger: `.${styles.sectionHeader}`,
            start: "top 75%",
            end: "top 45%",
            scrub: 1.5,
          },
        }
      );

      // Category titles animation
      gsap.utils
        .toArray<HTMLElement>(`.${styles.categoryTitle}`)
        .forEach((title) => {
          gsap.fromTo(
            title,
            { opacity: 0, x: -80, letterSpacing: "0.5em" },
            {
              opacity: 1,
              x: 0,
              letterSpacing: "0.15em",
              ease: "none",
              scrollTrigger: {
                trigger: title,
                start: "top 85%",
                end: "top 50%",
                scrub: 1,
              },
            }
          );
        });

      // Skill name typing animation
      gsap.utils.toArray<HTMLElement>(`.${styles.skillName}`).forEach((el) => {
        const full = el.dataset.full || "";
        gsap.to(el, {
          text: { value: full },
          ease: "none",
          scrollTrigger: {
            trigger: el.closest(`.${styles.skillItem}`),
            start: "top 90%",
            end: "top 40%",
            scrub: 0.7,
          },
        });
      });

      // Skill items reveal animation
      gsap.utils
        .toArray<HTMLElement>(`.${styles.skillCategory}`)
        .forEach((category) => {
          const items = category.querySelectorAll<HTMLElement>(
            `.${styles.skillItem}`
          );

          items.forEach((item) => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "top 35%",
                scrub: 0.5,
              },
            });

            // Set initial states
            gsap.set(item, { opacity: 0, y: 30 });
            gsap.set(item.querySelector(`.${styles.skillIcon}`), {
              scale: 0,
              opacity: 0,
            });
            gsap.set(item.querySelector(`.${styles.skillName}`), {
              opacity: 0,
              x: -20,
            });
            gsap.set(item.querySelector(`.${styles.skillStatus}`), {
              opacity: 0,
              x: 20,
            });

            // Animate in
            tl.to(item, { opacity: 1, y: 0, duration: 1 }, 0)
              .to(
                item.querySelector(`.${styles.skillIcon}`),
                { scale: 1, opacity: 1, duration: 0.4 },
                0.1
              )
              .to(
                item.querySelector(`.${styles.skillName}`),
                { opacity: 1, x: 0, duration: 0.6 },
                0.2
              )
              .to(
                item.querySelector(`.${styles.skillStatus}`),
                { opacity: 1, x: 0, duration: 0.4 },
                0.3
              );
          });
        });

      // Enhanced hover effects
      gsap.utils
        .toArray<HTMLElement>(`.${styles.skillItem}`)
        .forEach((item) => {
          const icon = item.querySelector<HTMLElement>(`.${styles.skillIcon}`);
          const name = item.querySelector<HTMLElement>(`.${styles.skillName}`);

          const enterFn = () => {
            gsap.to(icon, { scale: 1.4, duration: 0.4, ease: "power2.out" });
            gsap.to(name, { x: 4, duration: 0.4, ease: "power2.out" });
          };
          const leaveFn = () => {
            gsap.to(icon, { scale: 1, duration: 0.4, ease: "power2.out" });
            gsap.to(name, { x: 0, duration: 0.4, ease: "power2.out" });
          };

          item.addEventListener("mouseenter", enterFn);
          item.addEventListener("mouseleave", leaveFn);

          // Store listeners for cleanup
          listeners.push({
            el: item,
            type: "mouseenter",
            fn: enterFn as EventListener,
          });
          listeners.push({
            el: item,
            type: "mouseleave",
            fn: leaveFn as EventListener,
          });
        });

      // Border bottom animation
      gsap.utils
        .toArray<HTMLElement>(`.${styles.skillItem}`)
        .forEach((item) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 75%",
            end: "top 40%",
            scrub: 0.3,
            onUpdate: (self) => {
              item.style.borderBottomColor = `rgba(255, 255, 255, ${
                0.03 + self.progress * 0.04
              })`;
            },
          });
        });

    }, sectionRef); // Scope animations to the component

    // Cleanup function
    return () => {
      ctx.revert();

      listeners.forEach((listener) => {
        listener.el.removeEventListener(listener.type, listener.fn);
      });
    };
  }, []); 

  return (
    <section className={styles.skillsSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Stuff I Know</h2>
          <div className={styles.line}></div>
        </div>

        {Object.keys(skillsData).map((categoryKey) => {
          const category = skillsData[categoryKey];
          return (
            <div
              key={categoryKey}
              className={styles.skillCategory}
              data-category={categoryKey}
            >
              <div className={styles.categoryTitle}>{category.title}</div>
              <div className={styles.skillsList}>
                {category.skills.map((skill) => (
                  <div key={skill.name} className={styles.skillItem}>
                    <div className={styles.skillContent}>
                      <div className={styles.skillIcon}></div>
                      <div
                        className={styles.skillName}
                        data-full={skill.name}
                      ></div>
                    </div>
                    <div className={styles.skillStatus}>{skill.status}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;

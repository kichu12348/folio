import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Skills.module.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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
  [key: string]: SkillCategory;
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

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = timelineRef.current;
      if (!timeline) return;

      // 1. The Main Beam Animation
      // The beam grows from top to bottom as we scroll through the section
      gsap.to(`.${styles.timelineBeam}`, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center", // Start when top of section hits center of viewport
          end: "bottom center", // End when bottom of section hits center
          scrub: 0.5,
        },
      });

      // 2. Category Activations
      const categories = gsap.utils.toArray<HTMLElement>(`.${styles.categoryWrapper}`);
      
      categories.forEach((cat) => {
        const node = cat.querySelector(`.${styles.timelineNode}`);
        const content = cat.querySelector(`.${styles.categoryContent}`);
        const connector = cat.querySelector(`.${styles.connector}`);
        const title = cat.querySelector(`.${styles.categoryTitle}`);
        const skills = cat.querySelectorAll(`.${styles.skillTag}`);

        // Create a timeline for each category that plays when the beam reaches it
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cat,
            start: "top 55%", // Trigger slightly after the beam passes the node position
            end: "bottom 55%",
            toggleActions: "play none play reverse",
          }
        });

        // Node "pop"
        tl.to(node, {
          scale: 1.5,
          borderColor: "var(--accent-white)",
          boxShadow: "0 0 20px var(--accent-glow)",
          duration: 0.3,
          ease: "back.out(1.7)"
        })
        // Connector extends
        .to(connector, {
          scaleX: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        }, "-=0.1")
        // Content fade in
        .fromTo([title, content], {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1
        }, "-=0.2")
        // Skills stagger in
        .fromTo(skills, {
          opacity: 0,
          scale: 0.8,
          y: 10
        }, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.03,
          ease: "back.out(1.2)"
        }, "-=0.3");

      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.skillsSection} ref={sectionRef}>
      <div className={styles.container}>
        
        {/* Central Timeline Track */}
        <div className={styles.timelineContainer} ref={timelineRef}>
          <div className={styles.startDot}></div>
          <div className={styles.trackLine}></div>
          <div className={styles.timelineBeam}>
            <div className={styles.beamTip}></div>
          </div>
          <div className={styles.endDot}></div>
        </div>

        {/* Categories */}
        <div className={styles.categoriesContainer}>
          {Object.entries(skillsData).map(([key, category], index) => (
            <div 
              key={key} 
              className={`${styles.categoryWrapper} ${index % 2 === 0 ? styles.left : styles.right}`}
            >
              {/* The Node on the timeline */}
              <div className={styles.timelineNode}></div>
              
              {/* The Connector Line */}
              <div className={styles.connector}></div>

              {/* The Content */}
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <div className={styles.skillsGrid}>
                  {category.skills.map((skill) => (
                    <div key={skill.name} className={styles.skillTag}>
                      <span className={styles.skillName}>{skill.name}</span>
                      {/* Optional: Status dot or text */}
                      {/* <span className={styles.skillStatusDot} data-status={skill.status}></span> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
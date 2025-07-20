import styles from "./herosection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <div className={styles.heroStats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>10K+</span>
            <span className={styles.statLabel}>Students</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>4.9★</span>
            <span className={styles.statLabel}>Rating</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Lessons</span>
          </div>
        </div>

        <h1 className={styles.heroTitle}>Master Advanced React Development</h1>
        <p className={styles.heroSubtitle}>
          Build production-ready applications with modern React patterns, hooks,
          and best practices. Join thousands of developers who've transformed
          their careers.
        </p>

        <div className={styles.heroFeatures}>
          <div className={styles.heroFeature}>✨ Real-world projects</div>
          <div className={styles.heroFeature}>🎯 Industry best practices</div>
          <div className={styles.heroFeature}>🚀 Career advancement</div>
        </div>

        <div className={styles.heroBadge}>Limited Time Offer - 44% Off</div>
      </div>
    </section>
  );
};

export default HeroSection;

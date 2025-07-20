import styles from "./testimonial.module.css";

const TestimonialsSection = ({ testimonials }) => {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>What Our Students Say</h2>
        <p className={styles.sectionSubtitle}>
          Join thousands of developers who have transformed their careers
        </p>
      </div>

      <div className={styles.testimonialsGrid}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className={styles.testimonialCard}>
            <div className={styles.testimonialRating}>
              {"⭐".repeat(testimonial.rating)}
            </div>
            <blockquote className={styles.testimonialContent}>
              "{testimonial.content}"
            </blockquote>
            <div className={styles.testimonialAuthor}>
              <h3 className={styles.authorName}>{testimonial.name}</h3>
              <p className={styles.authorRole}>{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;

"use client";

import styles from "./faqsection.module.css";

const FAQSection = ({ faqs, activeFaqId, onToggleFAQ }) => {
  return (
    <section className={styles.faqSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <p className={styles.sectionSubtitle}>
          Everything you need to know about the course
        </p>
      </div>

      <div className={styles.faqContainer}>
        {faqs.map((faq) => (
          <div key={faq.id} className={styles.faqItem}>
            <button
              className={styles.faqQuestion}
              onClick={() => onToggleFAQ(faq.id)}
            >
              <span>{faq.question}</span>
              <span className={styles.faqIcon}>
                {activeFaqId === faq.id ? "−" : "+"}
              </span>
            </button>
            <div
              className={`${styles.faqAnswer} ${
                activeFaqId === faq.id ? styles.active : ""
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;

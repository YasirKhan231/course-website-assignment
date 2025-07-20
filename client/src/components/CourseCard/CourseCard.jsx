"use client";

import styles from "./CourseCard.module.css";

const CourseCard = ({ courseData, onEnrollClick }) => {
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseImageContainer}>
        <img
          src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt={courseData.title}
          className={styles.courseImage}
        />
      </div>
      <div className={styles.courseDetails}>
        <div className={styles.courseBadges}>
          <span className={styles.badge}>Bestseller</span>
          <span className={styles.badgeOutline}>Updated 2024</span>
        </div>

        <h2 className={styles.courseTitle}>{courseData.title}</h2>
        <p className={styles.courseDescription}>{courseData.description}</p>

        <div className={styles.courseMeta}>
          <div className={styles.metaItem}>
            <div className={styles.metaIcon}>👨‍🏫</div>
            <div>
              <p className={styles.metaLabel}>Instructor</p>
              <p className={styles.metaValue}>{courseData.instructor}</p>
            </div>
          </div>
          <div className={styles.metaItem}>
            <div className={styles.metaIcon}>⏰</div>
            <div>
              <p className={styles.metaLabel}>Duration</p>
              <p className={styles.metaValue}>{courseData.duration}</p>
            </div>
          </div>
        </div>

        <div className={styles.courseFeatures}>
          <h3 className={styles.featuresTitle}>What's included:</h3>
          <div className={styles.featuresList}>
            {courseData.features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.coursePricing}>
          <span className={styles.currentPrice}>
            ₹{courseData.price.toLocaleString()}
          </span>
          <span className={styles.originalPrice}>
            ₹{courseData.originalPrice.toLocaleString()}
          </span>
          <span className={styles.saveBadge}>
            Save ₹
            {(courseData.originalPrice - courseData.price).toLocaleString()}
          </span>
        </div>

        <button className={styles.buyButton} onClick={onEnrollClick}>
          Enroll Now - Start Learning Today
        </button>
      </div>
    </div>
  );
};

export default CourseCard;

import React, { useContext } from "react";
import { CourseContext } from "../../context/coursecontext";
import styles from "./CourseCard.module.css";

const CourseCard = () => {
  const { courseData, setShowModal } = useContext(CourseContext);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt={courseData.title}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{courseData.title}</h2>
        <p className={styles.description}>{courseData.description}</p>

        <div className={styles.features}>
          <h3 className={styles.featuresTitle}>What's included:</h3>
          <ul className={styles.featuresList}>
            {courseData.features.map((feature, index) => (
              <li key={index} className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span> {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.meta}>
          <div className={styles.instructor}>
            <span className={styles.metaLabel}>Instructor:</span>
            <span>{courseData.instructor}</span>
          </div>
          <div className={styles.duration}>
            <span className={styles.metaLabel}>Duration:</span>
            <span>{courseData.duration}</span>
          </div>
        </div>

        <div className={styles.pricing}>
          <span className={styles.originalPrice}>
            ${courseData.originalPrice}
          </span>
          <span className={styles.price}>${courseData.price}</span>
        </div>

        <button className={styles.button} onClick={() => setShowModal(true)}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;

// src/components/CourseCard/CourseCard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../PaymentModal/PaymentModal";
import styles from "./CourseCard.module.css";

const CourseCard = ({ course }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <img src={course.image} alt={course.title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.description}>{course.description}</p>
        <div className={styles.details}>
          <span className={styles.duration}>{course.duration}</span>
          <span className={styles.price}>₹{course.price}</span>
        </div>
        <button className={styles.button} onClick={() => setShowModal(true)}>
          Buy Now
        </button>
      </div>

      {showModal && (
        <PaymentModal
          course={course}
          onClose={() => setShowModal(false)}
          onSuccess={() => navigate(`/course-access/${course.id}`)}
        />
      )}
    </div>
  );
};

export default CourseCard;

// src/pages/CourseAccess/CourseAccess.jsx
import { useParams } from "react-router-dom";
import styles from "./CourseAccess.module.css";

const courseDetails = {
  1: {
    title: "Data Science Fundamentals",
    modules: [
      {
        id: 1,
        title: "Introduction to Data Science",
        duration: "2 hours",
        completed: true,
      },
      {
        id: 2,
        title: "Python for Data Analysis",
        duration: "3 hours",
        completed: true,
      },
      {
        id: 3,
        title: "Data Visualization",
        duration: "2.5 hours",
        completed: false,
      },
      {
        id: 4,
        title: "Statistical Methods",
        duration: "4 hours",
        completed: false,
      },
      { id: 5, title: "Final Project", duration: "5 hours", completed: false },
    ],
    instructor: "Dr. Sarah Johnson",
    startDate: "June 15, 2023",
    description:
      "This comprehensive course covers all fundamental aspects of data science, from data collection to advanced analysis techniques.",
    thumbnail: "/data-science.jpg",
  },
  // Add other courses similarly...
};

const CourseAccess = () => {
  const { courseId } = useParams();
  const course = courseDetails[courseId];

  if (!course) {
    return <div className={styles.loading}>Loading course details...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{course.title}</h1>
        <p className={styles.description}>{course.description}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <div className={styles.courseInfo}>
            <h3 className={styles.sectionTitle}>Course Information</h3>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Instructor:</span>
              <span className={styles.infoValue}>{course.instructor}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Start Date:</span>
              <span className={styles.infoValue}>{course.startDate}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Total Duration:</span>
              <span className={styles.infoValue}>16 hours</span>
            </div>
          </div>

          <div className={styles.resources}>
            <h3 className={styles.sectionTitle}>Resources</h3>
            <button className={styles.resourceButton}>Download Syllabus</button>
            <button className={styles.resourceButton}>Course Materials</button>
            <button className={styles.resourceButton}>
              Additional Readings
            </button>
          </div>
        </div>

        <div className={styles.mainContent}>
          <h2 className={styles.modulesTitle}>Course Modules</h2>

          <div className={styles.modulesList}>
            {course.modules.map((module) => (
              <div
                key={module.id}
                className={`${styles.moduleCard} ${
                  module.completed ? styles.completed : ""
                }`}
              >
                <div className={styles.moduleHeader}>
                  <h3 className={styles.moduleTitle}>
                    Module {module.id}: {module.title}
                  </h3>
                  <span className={styles.moduleDuration}>
                    {module.duration}
                  </span>
                </div>
                <div className={styles.moduleContent}>
                  <p className={styles.moduleDescription}>
                    {module.completed
                      ? "You've completed this module"
                      : "This module is ready to start"}
                  </p>
                  <button className={styles.moduleButton}>
                    {module.completed ? "Review" : "Start Learning"}
                  </button>
                </div>
                {module.completed && (
                  <div className={styles.completionBadge}>Completed</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAccess;

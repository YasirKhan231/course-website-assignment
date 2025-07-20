import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Access.module.css";

const Access = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseData] = useState({
    title: "Advanced React Development",
    modules: [
      {
        title: "Getting Started with React",
        lessons: ["Introduction", "Setting up Environment", "First Component"],
      },
      {
        title: "Core Concepts",
        lessons: ["State Management", "Props", "Hooks"],
      },
      {
        title: "Advanced Patterns",
        lessons: ["Context API", "Performance Optimization", "Testing"],
      },
    ],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUserAccess = async () => {
      try {
        // Get user email from localStorage
        const storedUser = JSON.parse(localStorage.getItem("courseUser"));
        console.log(storedUser);
        if (!storedUser || !storedUser.email) {
          navigate("/");
          return;
        }

        // Verify access with backend
        const response = await fetch(
          `http://localhost:5000/api/verify-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: storedUser.email }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to verify access");
        }

        const userData = await response.json();
        if (!userData.success || !userData.hasAccess) {
          navigate("/");
          return;
        }

        setUser(userData);
      } catch (error) {
        console.error("Access verification error:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    verifyUserAccess();
  }, [navigate]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!user) {
    return null; // Redirect will happen in useEffect
  }

  return (
    <div className={styles.access}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome, {user.email}!</h1>
        <p className={styles.subtitle}>
          Your course "{courseData.title}" is now unlocked!
        </p>

        <div className={styles.courseContent}>
          <h2 className={styles.sectionTitle}>Course Content</h2>

          <div className={styles.videoPlaceholder}>
            <div className={styles.videoContainer}>
              <div className={styles.playButton}>▶</div>
              <p>Start Learning</p>
            </div>
          </div>

          <div className={styles.modules}>
            {courseData.modules.map((module, index) => (
              <div key={index} className={styles.module}>
                <h3 className={styles.moduleTitle}>
                  Module {index + 1}: {module.title}
                </h3>
                <ul className={styles.lessons}>
                  {module.lessons.map((lesson, lessonIndex) => (
                    <li key={lessonIndex} className={styles.lesson}>
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.resources}>
          <h2 className={styles.sectionTitle}>Downloadable Resources</h2>
          <ul className={styles.resourceList}>
            <li className={styles.resourceItem}>Course Slides (PDF)</li>
            <li className={styles.resourceItem}>Starter Code Files</li>
            <li className={styles.resourceItem}>Cheat Sheets</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Access;

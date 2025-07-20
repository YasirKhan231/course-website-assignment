"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./access.module.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Access = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseData] = useState({
    title: "Advanced React Development",
    modules: [
      {
        title: "React Fundamentals & Modern Patterns",
        duration: "4 hours",
        lessons: [
          "React 18 New Features & Concurrent Rendering",
          "Advanced Component Patterns",
          "Custom Hooks Development",
          "Error Boundaries & Suspense",
        ],
      },
      {
        title: "State Management & Data Flow",
        duration: "6 hours",
        lessons: [
          "Context API & useReducer Patterns",
          "Redux Toolkit Setup & Best Practices",
          "RTK Query for Data Fetching",
          "Zustand for Lightweight State Management",
        ],
      },
      {
        title: "Performance & Optimization",
        duration: "5 hours",
        lessons: [
          "React.memo & Memoization Strategies",
          "Code Splitting & Lazy Loading",
          "Bundle Analysis & Optimization",
          "Memory Leak Prevention",
        ],
      },
      {
        title: "Testing & Quality Assurance",
        duration: "4 hours",
        lessons: [
          "Jest & React Testing Library Setup",
          "Component Testing Strategies",
          "Integration Testing Patterns",
          "E2E Testing with Cypress",
        ],
      },
      {
        title: "TypeScript Integration",
        duration: "3 hours",
        lessons: [
          "TypeScript with React Best Practices",
          "Advanced Type Patterns",
          "Generic Components",
          "Type-Safe API Integration",
        ],
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
        const response = await fetch(`${backendUrl}/payment/verify-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: storedUser.email }),
        });
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
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your course...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect will happen in useEffect
  }

  return (
    <div className={styles.access}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <h1 className={styles.logo}>TechMaster</h1>
          <div className={styles.userInfo}>
            <span className={styles.welcomeText}>Welcome back!</span>
            <span className={styles.userEmail}>{user.email}</span>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        {/* Welcome Section */}
        <section className={styles.welcomeSection}>
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeHeader}>
              <h1 className={styles.welcomeTitle}>
                🎉 Welcome to Your Learning Journey!
              </h1>
              <p className={styles.welcomeSubtitle}>
                You now have lifetime access to "{courseData.title}"
              </p>
            </div>

            <div className={styles.courseStats}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📚</div>
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>50+</span>
                  <span className={styles.statLabel}>Lessons</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>⏱️</div>
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>20+</span>
                  <span className={styles.statLabel}>Hours</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>🏆</div>
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>5</span>
                  <span className={styles.statLabel}>Projects</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📜</div>
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>1</span>
                  <span className={styles.statLabel}>Certificate</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Overview */}
        <section className={styles.overviewSection}>
          <h2 className={styles.sectionTitle}>Course Overview</h2>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewCard}>
              <h3 className={styles.overviewTitle}>🎯 What You'll Learn</h3>
              <ul className={styles.overviewList}>
                <li>Modern React Hooks & Context API</li>
                <li>State Management with Redux Toolkit</li>
                <li>Performance Optimization Techniques</li>
                <li>Testing with Jest & React Testing Library</li>
                <li>TypeScript Integration</li>
                <li>Next.js Framework Fundamentals</li>
              </ul>
            </div>

            <div className={styles.overviewCard}>
              <h3 className={styles.overviewTitle}>🛠️ Technologies Covered</h3>
              <div className={styles.techStack}>
                <span className={styles.techBadge}>React 18</span>
                <span className={styles.techBadge}>TypeScript</span>
                <span className={styles.techBadge}>Next.js</span>
                <span className={styles.techBadge}>Redux Toolkit</span>
                <span className={styles.techBadge}>Jest</span>
                <span className={styles.techBadge}>Tailwind CSS</span>
                <span className={styles.techBadge}>Vite</span>
                <span className={styles.techBadge}>React Query</span>
              </div>
            </div>
          </div>
        </section>

        {/* Important Topics */}
        <section className={styles.topicsSection}>
          <h2 className={styles.sectionTitle}>🔥 Key Topics & Skills</h2>
          <div className={styles.topicsGrid}>
            <div className={styles.topicCard}>
              <div className={styles.topicIcon}>⚡</div>
              <h3 className={styles.topicTitle}>Performance Optimization</h3>
              <p className={styles.topicDescription}>
                Learn React.memo, useMemo, useCallback, and code splitting
                techniques
              </p>
            </div>
            <div className={styles.topicCard}>
              <div className={styles.topicIcon}>🔄</div>
              <h3 className={styles.topicTitle}>State Management</h3>
              <p className={styles.topicDescription}>
                Master Redux Toolkit, Zustand, and advanced state patterns
              </p>
            </div>
            <div className={styles.topicCard}>
              <div className={styles.topicIcon}>🧪</div>
              <h3 className={styles.topicTitle}>Testing Strategies</h3>
              <p className={styles.topicDescription}>
                Unit testing, integration testing, and E2E testing best
                practices
              </p>
            </div>
            <div className={styles.topicCard}>
              <div className={styles.topicIcon}>🚀</div>
              <h3 className={styles.topicTitle}>Production Deployment</h3>
              <p className={styles.topicDescription}>
                CI/CD pipelines, Docker, and cloud deployment strategies
              </p>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className={styles.courseContent}>
          <h2 className={styles.sectionTitle}>Course Content</h2>

          {/* Video Player */}
          <div className={styles.videoSection}>
            <div className={styles.videoPlaceholder}>
              <div className={styles.videoContainer}>
                <div className={styles.playButton}>
                  <span className={styles.playIcon}>▶</span>
                </div>
                <div className={styles.videoInfo}>
                  <h3 className={styles.videoTitle}>
                    Introduction to Advanced React
                  </h3>
                  <p className={styles.videoDuration}>Duration: 15:30</p>
                </div>
              </div>
            </div>
          </div>

          {/* Course Modules */}
          <div className={styles.modules}>
            {courseData.modules.map((module, index) => (
              <div key={index} className={styles.module}>
                <div className={styles.moduleHeader}>
                  <div className={styles.moduleNumber}>{index + 1}</div>
                  <div className={styles.moduleInfo}>
                    <h3 className={styles.moduleTitle}>{module.title}</h3>
                    <p className={styles.moduleProgress}>
                      {module.lessons.length} lessons
                    </p>
                  </div>
                  <div className={styles.moduleStatus}>
                    <span className={styles.statusBadge}>New</span>
                  </div>
                </div>
                <ul className={styles.lessons}>
                  {module.lessons.map((lesson, lessonIndex) => (
                    <li key={lessonIndex} className={styles.lesson}>
                      <div className={styles.lessonIcon}>📹</div>
                      <span className={styles.lessonTitle}>{lesson}</span>
                      <span className={styles.lessonDuration}>12 min</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section className={styles.resources}>
          <h2 className={styles.sectionTitle}>Downloadable Resources</h2>
          <div className={styles.resourcesGrid}>
            <div className={styles.resourceCard}>
              <div className={styles.resourceIcon}>📄</div>
              <div className={styles.resourceInfo}>
                <h3 className={styles.resourceTitle}>Course Slides</h3>
                <p className={styles.resourceDescription}>
                  Complete presentation slides for all modules
                </p>
                <button className={styles.downloadButton}>Download PDF</button>
              </div>
            </div>
            <div className={styles.resourceCard}>
              <div className={styles.resourceIcon}>💻</div>
              <div className={styles.resourceInfo}>
                <h3 className={styles.resourceTitle}>Starter Code Files</h3>
                <p className={styles.resourceDescription}>
                  All project files and code examples
                </p>
                <button className={styles.downloadButton}>Download ZIP</button>
              </div>
            </div>
            <div className={styles.resourceCard}>
              <div className={styles.resourceIcon}>📋</div>
              <div className={styles.resourceInfo}>
                <h3 className={styles.resourceTitle}>Cheat Sheets</h3>
                <p className={styles.resourceDescription}>
                  Quick reference guides and tips
                </p>
                <button className={styles.downloadButton}>Download PDF</button>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className={styles.supportSection}>
          <div className={styles.supportCard}>
            <h2 className={styles.supportTitle}>Need Help?</h2>
            <p className={styles.supportDescription}>
              Our support team is here to help you succeed in your learning
              journey.
            </p>
            <div className={styles.supportActions}>
              <button className={styles.supportButton}>Contact Support</button>
              <button className={styles.supportButtonSecondary}>
                Join Community
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Access;

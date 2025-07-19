// src/pages/Home/Home.jsx
import CourseCard from "../../components/coursecard/CourseCard";
import styles from "./Home.module.css";
import dataScienceImg from "../../assets/data-science.png";
import fullStackImg from "../../assets/full-stack.png";
import mlImg from "../../assets/machine-learning.png";
import dataAnalystImg from "../../assets/data-analyst.png";
const courses = [
  {
    id: 1,
    title: "Data Science Fundamentals",
    description:
      "Master data analysis and visualization techniques with Python, R, and SQL. Learn to extract insights from complex datasets.",
    price: 4999,
    duration: "8 weeks",
    image: dataScienceImg,
    instructor: "Dr. Sarah Johnson",
    category: "Data Science",
    rating: 4.8,
    students: 1250,
  },
  {
    id: 2,
    title: "Full Stack Development",
    description:
      "Build complete web applications using React, Node.js, Express, and MongoDB. From frontend to backend deployment.",
    price: 5999,
    duration: "10 weeks",
    image: fullStackImg,
    instructor: "Alex Rodriguez",
    category: "Web Development",
    rating: 4.7,
    students: 980,
  },
  {
    id: 3,
    title: "Machine Learning Bootcamp",
    description:
      "Learn supervised and unsupervised learning algorithms. Implement real-world projects with TensorFlow and Scikit-learn.",
    price: 6999,
    duration: "12 weeks",
    image: mlImg,
    instructor: "Prof. Michael Chen",
    category: "Artificial Intelligence",
    rating: 4.9,
    students: 1500,
  },
  {
    id: 4,
    title: "Data Analyst Certification",
    description:
      "Transform raw data into meaningful insights. Master Excel, Tableau, and Power BI for business intelligence.",
    price: 3999,
    duration: "6 weeks",
    image: dataAnalystImg,
    instructor: "Emily Wilson",
    category: "Business Analytics",
    rating: 4.6,
    students: 850,
  },
];

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Featured Courses</h1>
      <div className={styles.courses}>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Home;

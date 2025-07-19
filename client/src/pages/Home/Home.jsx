// src/pages/Home/Home.jsx
import CourseCard from "../../components/coursecard/CourseCard";
import styles from "./Home.module.css";

const courses = [
  {
    id: 1,
    title: "Data Science Fundamentals",
    description: "Master data analysis and visualization techniques",
    price: 4999,
    duration: "8 weeks",
    image: "/data-science.jpg",
  },
  // ... other courses
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

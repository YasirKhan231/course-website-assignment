// src/components/Navbar/Navbar.jsx
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span>Edu</span>Course
        </Link>
        <div className={styles.links}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="/" className={styles.link}>
            Courses
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <h1 className={styles.logo}>TechMaster</h1>
        <div className={styles.navLinks}>
          <a href="/" className={styles.navLink}>
            Courses
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

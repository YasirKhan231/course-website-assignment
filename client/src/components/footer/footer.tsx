import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <h3 className={styles.footerLogo}>TechMaster</h3>
            <p className={styles.footerTagline}>
              Empowering developers worldwide
            </p>
          </div>

          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>
              About
            </a>
            <a href="#" className={styles.footerLink}>
              Courses
            </a>
            <a href="#" className={styles.footerLink}>
              Support
            </a>
            <a href="#" className={styles.footerLink}>
              Contact
            </a>
          </div>

          <div className={styles.footerSocial}>
            <a href="#" className={styles.socialLink}>
              📧
            </a>
            <a href="#" className={styles.socialLink}>
              💬
            </a>
            <a href="#" className={styles.socialLink}>
              🐦
            </a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © 2024 TechMaster. Made with ❤️ for developers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Course data
  const courseData = {
    title: "Advanced React Development",
    description:
      "Master React with modern techniques and build scalable applications",
    price: 4999,
    originalPrice: 8999,
    duration: "8 weeks",
    instructor: "Jane Smith",
    features: [
      "50+ lessons",
      "Real-world projects",
      "Certificate of completion",
      "Lifetime access",
    ],
  };

  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Frontend Developer",
      content:
        "This course completely transformed how I build React applications. Highly recommended!",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "UI Engineer",
      content:
        "The projects were practical and helped me land a promotion at work.",
      rating: 5,
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Full Stack Developer",
      content:
        "Best investment I made in my coding career. The instructor is fantastic!",
      rating: 5,
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "Is there a money-back guarantee?",
      answer:
        "Yes, we offer a 30-day money-back guarantee if you're not satisfied.",
    },
    {
      id: 2,
      question: "How long do I get access?",
      answer:
        "You get lifetime access to the course materials, including future updates.",
    },
    {
      id: 3,
      question: "Are there coding exercises?",
      answer:
        "Yes, each module includes practical exercises and projects to reinforce learning.",
    },
  ];

  // Save user data to localStorage with 1 month expiration
  const saveUserData = (email) => {
    const userData = {
      email,
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 1 month
    };
    localStorage.setItem("courseUser", JSON.stringify(userData));
  };

  // Create user in backend
  const createUserInBackend = async (fullName, email) => {
    try {
      const response = await fetch(`${backendUrl}/user/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email }),
      });

      if (!response.ok) throw new Error("Failed to create user");
      return await response.json();
    } catch (error) {
      console.error("User creation error:", error);
      throw error;
    }
  };

  // Load Razorpay script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Create Razorpay order
  const createOrder = async (userData) => {
    try {
      const response = await fetch(`${backendUrl}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: courseData.price * 100,
          currency: "INR",
          receipt: `course_${userData.email}`,
        }),
      });

      if (!response.ok) throw new Error("Failed to create order");
      return await response.json();
    } catch (error) {
      console.error("Order creation error:", error);
      throw error;
    }
  };

  // Verify payment
  const addpaymentdetail = async (paymentData) => {
    try {
      const response = await fetch(`${backendUrl}/payment/add-payment-detail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) throw new Error("Payment verification failed");
      return await response.json();
    } catch (error) {
      console.error("Payment verification error:", error);
      throw error;
    }
  };

  const handlePayment = async (userData) => {
    setIsLoading(true);
    try {
      // 1. Create user in backend
      await createUserInBackend(userData.name, userData.email);

      // 2. Load Razorpay
      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) throw new Error("Razorpay SDK failed to load");

      // 3. Create order
      const orderResponse = await createOrder(userData);

      // 4. Initialize payment
      const rzp = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderResponse.order.amount,
        currency: orderResponse.order.currency,
        name: "TechMaster Courses",
        description: "Payment for Advanced React Development Course",
        order_id: orderResponse.order.id,
        handler: async (response) => {
          try {
            // 5. add  payment detail

            await addpaymentdetail({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              email: userData.email,
            });

            // 7. Save to localStorage
            saveUserData(userData.email);

            // 8. Redirect
            navigate("/access");
          } catch (error) {
            console.error("Post-payment error:", error);
            alert("Payment processing failed: " + error.message);
          }
        },
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: "0123456789",
        },
        theme: { color: "#1e3a8a" },
      });

      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) handlePayment(formData);
  };

  const [activeFaqId, setActiveFaqId] = useState(null);
  const toggleFAQ = (id) => setActiveFaqId(activeFaqId === id ? null : id);

  return (
    <div className={styles.home}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <a href="/" className={styles.logo}>
            TechMaster
          </a>
          <div className={styles.navLinks}>
            <a href="/" className={styles.navLink}>
              Courses
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Master Advanced React Development
          </h1>
          <p className={styles.heroSubtitle}>
            Build scalable apps with industry best practices
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Course Card */}
        <div className={styles.courseCard}>
          <div className={styles.courseImageContainer}>
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt={courseData.title}
              className={styles.courseImage}
            />
          </div>
          <div className={styles.courseDetails}>
            <h2 className={styles.courseTitle}>{courseData.title}</h2>
            <p className={styles.courseDescription}>{courseData.description}</p>

            <div className={styles.courseFeatures}>
              <h3 className={styles.featuresTitle}>What's included:</h3>
              <ul className={styles.featuresList}>
                {courseData.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    <span className={styles.checkIcon}>✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.courseMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Instructor:</span>
                <span>{courseData.instructor}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Duration:</span>
                <span>{courseData.duration}</span>
              </div>
            </div>

            <div className={styles.coursePricing}>
              <span className={styles.originalPrice}>
                ₹{courseData.originalPrice}
              </span>
              <span className={styles.currentPrice}>₹{courseData.price}</span>
            </div>

            <button
              className={styles.buyButton}
              onClick={() => setShowModal(true)}
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Testimonials */}
        <section className={styles.testimonialsSection}>
          <h2 className={styles.sectionTitle}>What Our Students Say</h2>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={styles.testimonialCard}>
                <div className={styles.testimonialRating}>
                  {"⭐".repeat(testimonial.rating)}
                </div>
                <p className={styles.testimonialContent}>
                  "{testimonial.content}"
                </p>
                <div className={styles.testimonialAuthor}>
                  <h3 className={styles.authorName}>{testimonial.name}</h3>
                  <p className={styles.authorRole}>{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqContainer}>
            {faqs.map((faq) => (
              <div key={faq.id} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleFAQ(faq.id)}
                >
                  {faq.question}
                  <span className={styles.faqIcon}>
                    {activeFaqId === faq.id ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`${styles.faqAnswer} ${
                    activeFaqId === faq.id ? styles.active : ""
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLogo}>TechMaster</div>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>
              Terms
            </a>
            <a href="#" className={styles.footerLink}>
              Privacy
            </a>
            <a href="#" className={styles.footerLink}>
              Contact
            </a>
          </div>
          <div className={styles.footerSocial}>
            <a href="#" className={styles.socialLink}>
              Twitter
            </a>
            <a href="#" className={styles.socialLink}>
              LinkedIn
            </a>
            <a href="#" className={styles.socialLink}>
              GitHub
            </a>
          </div>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} TechMaster. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Purchase Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              className={styles.closeButton}
              onClick={() => setShowModal(false)}
              disabled={isLoading}
            >
              &times;
            </button>

            <h2 className={styles.modalTitle}>Complete Your Purchase</h2>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
                {errors.name && (
                  <span className={styles.formError}>{errors.name}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                {errors.email && (
                  <span className={styles.formError}>{errors.email}</span>
                )}
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Process Payment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

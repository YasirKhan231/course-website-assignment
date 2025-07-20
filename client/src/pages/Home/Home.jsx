"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import HeroSection from "../../components/herosection/herosection";
import CourseCard from "../../components/coursecard/CourseCard";
import TestimonialsSection from "../../components/testimonial/testimonial";
import FAQSection from "../../components/faqsection/faqsection";
import Footer from "../../components/footer/footer";
import PurchaseModal from "../../components/purchasemodel/purchasemodel";
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
  const [activeFaqId, setActiveFaqId] = useState(null);
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
            // 5. add payment detail
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
        theme: { color: "#10b981" },
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

  const toggleFAQ = (id) => setActiveFaqId(activeFaqId === id ? null : id);

  const handleEnrollClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className={styles.home}>
      <Navbar />
      <HeroSection />

      <main className={styles.mainContent}>
        <CourseCard courseData={courseData} onEnrollClick={handleEnrollClick} />
        <TestimonialsSection testimonials={testimonials} />
        <FAQSection
          faqs={faqs}
          activeFaqId={activeFaqId}
          onToggleFAQ={toggleFAQ}
        />
      </main>

      <Footer />

      <PurchaseModal
        showModal={showModal}
        onClose={handleCloseModal}
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        onInputChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Home;

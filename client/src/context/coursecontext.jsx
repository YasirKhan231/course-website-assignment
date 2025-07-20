import React, { createContext, useState } from "react";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const courseData = {
    title: "Advanced React Development",
    description:
      "Master React with modern techniques and build scalable applications",
    price: 99,
    originalPrice: 199,
    duration: "8 weeks",
    instructor: "Jane Smith",
    features: [
      "50+ lessons",
      "Real-world projects",
      "Certificate of completion",
      "Lifetime access",
    ],
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

  const initiatePayment = async (userData) => {
    setIsLoading(true);
    try {
      // In a real app, this would call your backend API
      // For demo, we'll simulate a successful payment
      setTimeout(() => {
        setUser(userData);
        setPaymentSuccess(true);
        setIsLoading(false);
        setShowModal(false);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      console.error("Payment error:", error);
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courseData,
        testimonials,
        faqs,
        user,
        setUser,
        showModal,
        setShowModal,
        isLoading,
        paymentSuccess,
        initiatePayment,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

// src/components/PaymentModal/PaymentModal.jsx
import { useState } from "react";
import axios from "axios";
import styles from "./PaymentModal.module.css";

const PaymentModal = ({ course, onClose, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const orderResponse = await axios.post(
        "http://localhost:5000/api/create-order",
        {
          amount: course.price,
          currency: "INR",
          receipt: `course_${course.id}_${Date.now()}`,
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderResponse.data.order.amount,
        currency: "INR",
        order_id: orderResponse.data.order.id,
        name: course.title,
        description: `Purchase of ${course.title}`,
        prefill: { email },
        handler: async (response) => {
          await axios.post("http://localhost:5000/api/verify-payment", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            email,
            courseId: course.id,
          });
          onSuccess();
        },
        theme: { color: "#4285f4" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Confirm Purchase</h2>
        <p className={styles.text}>
          You are about to purchase: <strong>{course.title}</strong>
        </p>
        <p className={styles.price}>Price: ₹{course.price}</p>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.buttons}>
          <button onClick={onClose} className={styles.cancel}>
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={loading || !email}
            className={`${styles.confirm} ${
              loading || !email ? styles.disabled : ""
            }`}
          >
            {loading ? "Processing..." : "Proceed to Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

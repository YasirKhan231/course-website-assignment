// src/pages/Payment/Payment.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Payment.module.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (location.state?.course) {
      setCourse(location.state.course);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  const handlePayment = async () => {
    if (!course || !email) return;
    
    setLoading(true);
    try {
      const orderResponse = await axios.post('http://localhost:5000/api/create-order', {
        amount: course.price,
        currency: 'INR',
        receipt: `course_${course.id}_${Date.now()}`,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderResponse.data.order.amount,
        currency: 'INR',
        order_id: orderResponse.data.order.id,
        name: course.title,
        description: `Purchase of ${course.title}`,
        prefill: { email },
        handler: async (response) => {
          await axios.post('http://localhost:5000/api/verify-payment', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            email,
            courseId: course.id,
          });
          navigate(`/course-access/${course.id}`);
        },
        theme: { color: '#4285f4' },
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!course) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.paymentCard}>
        <h1 className={styles.title}>Complete Your Purchase</h1>
        
        <div className={styles.courseInfo}>
          <h2 className={styles.courseTitle}>{course.title}</h2>
          <p className={styles.coursePrice}>₹{course.price}</p>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.paymentMethods}>
          <h3 className={styles.sectionTitle}>Payment Method</h3>
          <div className={styles.method}>
            <input 
              type="radio" 
              id="razorpay" 
              name="method" 
              className={styles.radioInput}
              checked 
              readOnly 
            />
            <label htmlFor="razorpay" className={styles.methodLabel}>
              Razorpay (Credit/Debit, UPI, Net Banking)
            </label>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading || !email}
          className={`${styles.payButton} ${(loading || !email) ? styles.disabled : ''}`}
        >
          {loading ? 'Processing...' : `Pay ₹${course.price}`}
        </button>
      </div>
    </div>
  );
};

export default Payment;
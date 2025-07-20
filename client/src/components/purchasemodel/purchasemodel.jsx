"use client";

import styles from "./purchasemodel.module.css";

const PurchaseModal = ({
  showModal,
  onClose,
  formData,
  errors,
  isLoading,
  onInputChange,
  onSubmit,
}) => {
  if (!showModal) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Complete Your Purchase</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <form onSubmit={onSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={onInputChange}
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
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
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
  );
};

export default PurchaseModal;

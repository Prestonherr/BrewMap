import { useState } from "react";
import { register } from "../../utils/auth-api";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onAuthSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    register(formData.email, formData.name, formData.password)
      .then(() => {
        onAuthSuccess?.();
        onClose();
        setFormData({ email: "", name: "", password: "" });
      })
      .catch((err) => {
        setError(err.message || "Registration failed");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="register-modal" onClick={onClose}>
      <div className="register-modal__content" onClick={(e) => e.stopPropagation()}>
        <button
          className="register-modal__close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <h2 className="register-modal__title">Register</h2>
        <form className="register-modal__form" onSubmit={handleSubmit}>
          <div className="register-modal__field">
            <label htmlFor="name" className="register-modal__label">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="register-modal__input"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={30}
              placeholder="Enter your name"
            />
          </div>
          <div className="register-modal__field">
            <label htmlFor="email" className="register-modal__label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="register-modal__input"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="register-modal__field">
            <label htmlFor="password" className="register-modal__label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="register-modal__input"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              placeholder="Enter your password"
            />
          </div>
          {error && <div className="register-modal__error">{error}</div>}
          <button
            type="submit"
            className="register-modal__submit-button"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;


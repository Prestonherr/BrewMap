import { useState } from "react";
import { login } from "../../utils/auth-api";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onAuthSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
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

    login(formData.email, formData.password)
      .then(() => {
        onAuthSuccess?.();
        onClose();
        setFormData({ email: "", password: "" });
      })
      .catch((err) => {
        setError(err.message || "Login failed");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="login-modal" onClick={onClose}>
      <div className="login-modal__content" onClick={(e) => e.stopPropagation()}>
        <button
          className="login-modal__close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <h2 className="login-modal__title">Login</h2>
        <form className="login-modal__form" onSubmit={handleSubmit}>
          <div className="login-modal__field">
            <label htmlFor="email" className="login-modal__label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="login-modal__input"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="login-modal__field">
            <label htmlFor="password" className="login-modal__label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="login-modal__input"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              placeholder="Enter your password"
            />
          </div>
          {error && <div className="login-modal__error">{error}</div>}
          <button
            type="submit"
            className="login-modal__submit-button"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;


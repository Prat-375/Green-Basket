import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      login(data);
      navigate("/shop");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <PageWrapper>
      <main className="page-container">
        <div className="page-form auth-box">
          <h2>Create Account</h2>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password" value={formData.password} onChange={handleChange} />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="checkout-btn">Register</button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </main>
    </PageWrapper>
  );
}

export default Register;
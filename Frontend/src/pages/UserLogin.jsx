import React from 'react';
import '../styles/theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserLogin() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Login successful:", response.data);
      navigate('/Home'); 
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="page auth-page">
      <main className="card">
        <h1 className="title">Welcome back</h1>
        <p className="subtitle">Sign in to your account</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input type="email" name="email" placeholder="you@example.com" required />
          </div>

          <div className="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" required />
          </div>

          <div className="actions">
            <button type="submit" className="btn primary">Sign in</button>
          </div>
        </form>

        <small>
          Don't have an account? <a className="link" href="/user/register">Create one</a>
        </small>
      </main>
    </div>
  );
}

import React from 'react';
import '../styles/theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserRegister() {
    const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:3000/api/auth/user/register", {
        fullName,
        email,
        password,
      },{
        withCredentials:true,
      });
      console.log("User registered:", response.data);

      navigate("/Home");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="page auth-page">
      <main className="card">
        <h1 className="title">Create account</h1>
        <p className="subtitle">Sign up to continue</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Name</label>
            <input type="text" name="fullName" placeholder="Your full name" />
          </div>

          <div className="field">
            <label>Email</label>
            <input type="email" name="email" placeholder="you@example.com" />
          </div>

          <div className="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" />
          </div>

          <div className="actions">
            <button type="submit" className="btn primary">Create account</button>
          </div>
        </form>

        <small>
          Already have an account? <a className="link" href="/user/login">Sign in</a>
        </small>
      </main>
    </div>
  );
}

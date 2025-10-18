import React from 'react';
import '../styles/theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FoodPartnerLogin() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log('Login successful:', response.data);
      navigate('/CreateFoodPartner');

    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="page auth-page">
      <main className="card">
        <h1 className="title">Partner sign in</h1>
        <p className="subtitle">Access your partner dashboard</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input name="email" type="email" placeholder="partner@food.com" required />
          </div>

          <div className="field">
            <label>Password</label>
            <input name="password" type="password" placeholder="••••••••" required />
          </div>

          <div className="actions">
            <button className="btn primary" type="submit">Sign in</button>
          </div>
        </form>
        <small>
          Need to create an account? <a className="link" href="/foodpartner/register">Sign up</a>
        </small>
      </main>
    </div>
  );
}

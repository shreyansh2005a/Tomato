import React from "react";
import "../styles/theme.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FoodPartnerRegister() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/register",
        {
          name:businessName,
          contactName,
          phone,
          email,
          password,
          address,
        }
      );

      console.log("Food Partner registered:", response.data);
      navigate("/CreateFoodPartner");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="page auth-page">
      <main className="card">
        <h1 className="title">Register as Food Partner</h1>
        <p className="subtitle">Grow your business with our platform</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Business Name</label>
            <input
              type="text"
              name="businessName"
              placeholder="Your business name"
              required
            />
          </div>

          <div className="field">
            <label>Contact Name</label>
            <input
              type="text"
              name="contactName"
              placeholder="Your name"
              required
            />
          </div>

          <div className="field">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="+1 555 123 4567"
              required
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@business.com"
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="field">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="123 Market Street"
              required
            />
          </div>

          <div className="actions">
            <button type="submit" className="btn primary">
              Create Partner Account
            </button>
          </div>
        </form>

        <small>
          Already a partner?{" "}
          <a className="link" href="/foodpartner/login">
            Sign in
          </a>
        </small>
      </main>
    </div>
  );
}

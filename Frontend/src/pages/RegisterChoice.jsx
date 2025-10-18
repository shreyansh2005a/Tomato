import React from 'react';
import '../styles/theme.css';

export default function RegisterChoice(){
  return (
    <div className="page">
      <main className="card" style={{textAlign:'center'}}>
        <h1 className="title">Create an account</h1>
        <p className="subtitle">Choose how you'd like to register</p>

        <div style={{display:'grid',gap:12,marginTop:18}}>
          <a className="btn primary" href="/user/register" style={{display:'block',textDecoration:'none',textAlign:'center'}}>Register as User</a>
          <a className="btn" href="/foodpartner/register" style={{display:'block',textDecoration:'none',textAlign:'center',borderColor:'var(--card-border)'}}>Register as Food Partner</a>
        </div>

        <small style={{marginTop:14,display:'block'}}>Already registered? <a className="link" href="/user/login">Sign in</a></small>
      </main>
    </div>
  )
}

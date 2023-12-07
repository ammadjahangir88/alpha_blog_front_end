import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function LoginUser(event) {
    event.preventDefault();
    // Your login logic here
  }

  return (
    <div className="login-container">
      <div className='login-image'></div>
      <div className="login-form">
        <form>
          <h1 className="login">Sneat</h1>
          <span style={{ fontWeight: 300, fontSize: '30px' }}>Welcome to Sneat! 👋</span>
          <p style={{ fontWeight: 400, fontSize: '15px', marginBottom: '1rem' }}>Please sign-in to continue and start the adventure</p>
          <div className="form-group">
            <input type="text" placeholder="Email" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" />
          </div>
          <button onClick={LoginUser} type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

import React, { useContext, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error,setError]=useState(false)
  const [password, setPassword] = useState("");
  const [errorMessage,setErrorMessage]=useState("")
  const { login } = useAuth();
  function LoginUser(event) {
    event.preventDefault();
    // Your login logic here
    console.log(email,password)
    const userData = {
      email: email,
      password: password
    };
    axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, userData).then((response) => {
      console.log(response.status, response.data.token);
      console.log(response.data)
      if (response.data.success)
      {
        const token = response.data.token;
        // Save the token to the context
        login(token);
        navigate('/dashboard');
      }
      setErrorMessage(response.data.message)
      setError(true)

     
    });
  
  }

  return (
    <div className="login-container">
      <div className='login-image'></div>
      <div className="login-form">
        <form>
          <h1 className="login text-5xl">Sneat</h1>
          <span style={{ fontWeight: 300, fontSize: '30px' }}>Welcome to Sneat! 👋</span>
          <p style={{ fontWeight: 400, fontSize: '15px', marginBottom: '1rem' }}>Please sign-in to continue and start the adventure</p>
          {
            error && (
              <div className="error-message" style={{ backgroundColor: "#ffebee", padding: "8px", borderRadius: "4px" }}>
              {errorMessage}
            </div>

            )
          }
          <div className="form-group">
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <input type="password"  onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
          </div>
          <button onClick={LoginUser}type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

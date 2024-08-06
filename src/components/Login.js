
import React, { useState } from 'react';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUserData = JSON.parse(localStorage.getItem('user'));

    if (storedUserData && storedUserData.username === formData.username && storedUserData.password === formData.password) {
      setMessage('Login successful!');
    } else {
      setMessage('Invalid username or password.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to MovieStreamer</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
};

export default Login;



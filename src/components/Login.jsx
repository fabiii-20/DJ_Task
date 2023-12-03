// Login.jsx

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { login } from '../utils/api'; // Your API function to handle login

// eslint-disable-next-line react/prop-types
const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('DJ@4');
  const [password, setPassword] = useState('Dhunjam@2023');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      handleLogin(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        // Handle incorrect credentials error
        console.error('Incorrect username or password');
      } else {
        // Handle other errors
        console.error('Login failed', error);
      }
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '32px', color: '#FFFFFF', textAlign: 'center' }}>Social, Hebbal on DhoomJam</h1>
      <form onSubmit={handleSubmit} style={{ width: '600px', margin: '0 auto' }}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" style={{ width: '100%', fontSize: '16px', background: '#6741D9', color: '#FFFFFF', marginTop: '10px' }}>Sign In</button>
      </form>
    </div>
  );
};

export default Login;




// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { login } from '../utils/api';
import GoogleFont from 'react-google-fonts';
<GoogleFont family='Poppins' />

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
        console.error('Incorrect username or password');
      } else {
        console.error('Login failed', error);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', color: '#FFFFFF', textAlign: 'center' }}>Social, Hebbal on DhoomJam</h1>
      <form onSubmit={handleSubmit} style={{ width: '600px', margin: '0 auto' }}>
        <div>
          <label style={{padding:'12px'}} htmlFor="username">Username</label>
          <input type="text" id="username"style={{borderRadius: '4px'}} value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div style={{padding:'16px'}}>
          <label style={{padding:'12px'}}htmlFor="password">Password</label>
          <input type="password" id="password"style={{borderRadius: '4px'}} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" 
        style={{ 
          width: '600px',
          maxWidth: '300px',
          fontSize: '16px', 
          background: '#6741D9', 
          color: '#FFFFFF', 
          marginTop: '10px',
          margin: '0 auto',
        }}>Sign In</button>
      </form>
    </div>
  );
};

export default Login;


// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import LoginPage, {
  Username,
  Password,
  Submit,
  Title,
  Logo,
} from '@react-login-page/page1';

import styles from './styles.module.css';

const VALID_EMAIL    = 'buildAnyFund@gmail.com';
const VALID_PASSWORD = 'buildAnyFund';

export default function Login() {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = field => e =>
    setCreds({ ...creds, [field]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();               /* stop default refresh */
    const { email, password } = creds;

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      navigate('/proposal');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={styles.wrapper}>
      <Spline scene="/login-scene.splinecode" className={styles.bg} />

      <LoginPage
        onSubmit={handleSubmit}                /* handler gets event */
        className={styles.form}
        style={{ background: 'transparent', boxShadow: 'none' }}
      >
        <Logo visible={false} />
        <Title>Structure&nbsp;Your&nbsp;Fund</Title>

        <Username
          placeholder="Email"
          value={creds.email}                  /* controlled */
          onChange={handleChange('email')}
        />
        <Password
          placeholder="Password"
          value={creds.password}               /* controlled */
          onChange={handleChange('password')}
        />
        <Submit onClick={handleSubmit}>Submit</Submit>

        {error && (
          <p style={{ color: '#ff6b6b', marginTop: 8 }}>{error}</p>
        )}
      </LoginPage>
    </div>
  );
}

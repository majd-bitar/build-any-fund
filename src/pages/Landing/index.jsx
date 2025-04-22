// src/pages/Landing/index.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import styles from './styles.module.css';
import Button from '../../components/Button'

const Landing = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [splineApp, setSplineApp] = useState(null);

  // show login after 1.5s
  useEffect(() => {
    const timer = setTimeout(() => setShowLogin(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // capture Spline app on load
  const handleLoad = (app) => {
    console.log('✅ Spline loaded:', app);
    setSplineApp(app);
  };

  // responsive scaling for 3D text objects
  useEffect(() => {
    if (!splineApp) return;

    const text1 = splineApp.findObjectByName('Text');
    const text2 = splineApp.findObjectByName('Text 2');

    console.log('🔍 findObjectByName results:', {
      Text: text1 ? 'FOUND' : '⚠️ NOT FOUND',
      Text2: text2 ? 'FOUND' : '⚠️ NOT FOUND',
    });

    if (!text1 || !text2) return;

    const updateScale = () => {
      const width = window.innerWidth;
      let s1 = 1, s2 = 0.9;

      if (width < 600) {
        s1 = 0.5;
        s2 = 0.4;
      } else if (width < 1200) {
        s1 = 0.8;
        s2 = 0.7;
      }

      text1.scale.set(s1, s1, s1);
      text2.scale.set(s2, s2, s2);

      console.log(`↔️ window width: ${width}px → scales:`, { s1, s2 });
    };

    window.addEventListener('resize', updateScale);
    updateScale(); // initial call
    return () => window.removeEventListener('resize', updateScale);
  }, [splineApp]);

  return (
    <div className={styles.landing}>
      {/* full-screen Spline scene */}
      <Spline
        scene="/landing-scene.splinecode"
        onLoad={handleLoad}
        className={styles.spline}
      />

      {/* animated Login button */}
      <div
        className={`${styles.loginContainer} ${
          showLogin ? styles.showLogin : ''
        }`}
      >
        <Button
          onClick={() => navigate('/login')}
          className={styles.loginButton}
        >
          Log in
        </Button>
      </div>
    </div>
  );
};

export default Landing;

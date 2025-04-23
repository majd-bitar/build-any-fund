// File: src/pages/Proposal/index.jsx
import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Settings, BarChart2, MapPin } from 'lucide-react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

export default function ProposalPage() {
  const navigate = useNavigate();
  const [splineApp, setSplineApp] = useState(null);

  // capture Spline instance
  const handleSplineLoad = (app) => setSplineApp(app);

  // responsive scaling for 3D Text object
  useEffect(() => {
    if (!splineApp) return;
    const textMesh = splineApp.findObjectByName('Text');
    if (!textMesh) {
      console.warn('Text mesh not found');
      return;
    }

    // store original scale
    const origScale = textMesh.scale.clone();

    const onResize = () => {
      const width = window.innerWidth;
      let scaleFactor = 1;

      if (width < 1000) {
        // map width [0..1000] to scale [0.5..1]
        scaleFactor = Math.max(0.5, width / 1000);
      }

      textMesh.scale.set(
        origScale.x * scaleFactor,
        origScale.y * scaleFactor,
        origScale.z * scaleFactor
      );
    };

    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, [splineApp]);

  const cards = [
    { title: 'Operating Model', icon: <Settings className={styles.icon} />, route: '/proposal/operating-model', className: styles.card1 },
    { title: 'Business Model',  icon: <BarChart2 className={styles.icon} />,  route: '/proposal/business-model',  className: styles.card2 },
    { title: 'Roadmap',         icon: <MapPin className={styles.icon} />,      route: '/proposal/roadmap',         className: styles.card3 },
  ];

  return (
    <div className={styles.wrapper}>
      {/* full-screen Spline background */}
      <div className={styles.background}>
        <Spline
          scene="/proposal-scene.splinecode"
          onLoad={handleSplineLoad}
          className={styles.spline}
        />
      </div>

      <div className={styles.cardsContainer}>
        {cards.map((c, i) => (
          <div key={c.title} className={`${styles.card} ${c.className}`} style={{ animationDelay: `${0.2 + i * 0.2}s` }}>
            {c.icon}
            <h2 className={styles.cardTitle}>{c.title}</h2>
            <Button
              variant="contained"
              disableElevation
              onClick={() => navigate(c.route)}
              sx={{
                mt: 'auto', px: 3, py: 1, borderRadius: '32px',
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: '#333', textTransform: 'none',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,1)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }
              }}
            >
              Learn More
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
// File: proposal/index.jsx
import React from 'react';
import Spline from '@splinetool/react-spline';
import { Settings, BarChart2, MapPin } from 'lucide-react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

export default function ProposalPage() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Operating Model',
      icon: <Settings className={styles.icon} />,
      route: '/proposal/operating-model',
      className: styles.card1,
    },
    {
      title: 'Business Model',
      icon: <BarChart2 className={styles.icon} />,
      route: '/proposal/business-model',
      className: styles.card2,
    },
    {
      title: 'Roadmap',
      icon: <MapPin className={styles.icon} />,
      route: '/proposal/roadmap',
      className: styles.card3,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.background}>
        <Spline scene="/login-scene.splinecode" />
      </div>

      <div className={styles.cardsContainer}>
        {cards.map((c, i) => (
          <div
            key={c.title}
            className={`${styles.card} ${c.className}`}
            style={{ animationDelay: `${0.2 + i * 0.2}s` }}
          >
            {c.icon}
            <h2 className={styles.cardTitle}>{c.title}</h2>
            <Button
              variant="contained"
              disableElevation
              onClick={() => navigate(c.route)}
              sx={{
                mt: 'auto',               // push to bottom
                px: 3,                    // horizontal padding
                py: 1,                    // vertical padding
                borderRadius: '32px',     // very rounded, soft pill
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: '#333',
                textTransform: 'none',    // keep normal case
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,1)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                },
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

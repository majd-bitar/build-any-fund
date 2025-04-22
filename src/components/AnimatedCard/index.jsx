import React from 'react';
import styles from './styles.module.css';

export default function AnimatedCard({ title, items, Icon }) {
  return (
    <div className={styles.card}>
      {/* Background panel */}
      <div className={styles.bg} />

      {/* Decorative icon watermark */}
      {Icon && <Icon className={styles.icon} />}

      {/* Title */}
      <div className={styles.typo}>
        <h3 className={styles.title}>{title}</h3>
      </div>

      {/* Hidden info → appears on hover */}
      <div className={styles.info}>
        <ul className={styles.list}>
          {items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

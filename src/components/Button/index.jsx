import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

/**
 * Re‑usable pill button.
 * All navigation / business logic is injected via the `onClick` prop.
 */
export default function Button({ text = 'Log in', onClick }) {
  return (
    <button
      type="button"
      className={styles.dirControl}
      onClick={onClick}
    >
      <span className={styles.label}>{text}</span>
      {[...Array(4)].map((_, i) => <span key={`s${i}`} />)}
      {[...Array(4)].map((_, i) => <b    key={`b${i}`} />)}
    </button>
  );
}

Button.propTypes = {
  text:    PropTypes.string,
  onClick: PropTypes.func.isRequired,   // caller must pass a handler
};

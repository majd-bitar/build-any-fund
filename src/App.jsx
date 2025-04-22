// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import appRoutes from './routes/routes';

const App = () => {
  return (
    <Routes>
      {appRoutes.map((route, idx) => (
        <Route key={idx} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default App;
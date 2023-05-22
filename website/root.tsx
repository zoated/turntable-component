import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Turntable from './turntable';



function Root() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Turntable />} />
        </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);

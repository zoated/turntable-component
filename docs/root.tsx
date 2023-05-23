import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Turntable from './turntable';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Turntable />
  </StrictMode>
);

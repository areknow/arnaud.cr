import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { TabsProvider } from './shared/contexts/TabsProvider.tsx';
import { App } from './App.tsx';

import 'overlayscrollbars/overlayscrollbars.css';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TabsProvider>
      <App />
    </TabsProvider>
  </StrictMode>
);

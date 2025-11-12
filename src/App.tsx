import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './auth/AuthContext';
import { SoundProvider } from './context/SoundContext';
import { ToastProvider } from './context/ToastContext';
import { UIProvider } from './context/UIContext';
import { GlobalStyles } from './components/common/GlobalStyles';

const App: React.FC = () => (
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <SoundProvider>
          <UIProvider>
            <ToastProvider>
              <GlobalStyles />
              <AppRoutes />
            </ToastProvider>
          </UIProvider>
        </SoundProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

export default App;

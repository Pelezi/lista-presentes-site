import React, { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import AuthRoutes from './routes/AuthRoutes';
import { AuthProvider } from './contexts/AuthContext';

import { getGifts } from "./services/giftService";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGifts = async () => {
      try {
        await getGifts();
      } catch (error) {
        console.error('Error loading gifts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGifts();
  }, []);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: '1rem'
      }}>
        <div style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Carregando, aguarde um momento...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/*" element={<AuthRoutes />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
};

export default App;

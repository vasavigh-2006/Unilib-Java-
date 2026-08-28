import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import Toast from './components/Toast';
import { API_BASE } from './config';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error((err && err.message) || 'Login failed');
      }

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('borrows');
  };

  if (!user) {
    return (
      <>
        <Login onLogin={handleLogin} loading={loading} />
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'info' })}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen library-background">
      <div className="relative z-10">
        {user.role === 'ADMIN' ? (
          <AdminDashboard user={user} onLogout={handleLogout} />
        ) : (
          <StudentDashboard user={user} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}

export default App;

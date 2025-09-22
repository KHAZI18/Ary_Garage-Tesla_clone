import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Home } from './components/Home';
import { Cars } from './components/Cars';
import { Vehicles } from './components/Vehicles';
import { Customize } from './components/Customize';
import { Energy } from './components/Energy';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Navigation } from './components/Navigation';
import { projectId, publicAnonKey } from './utils/supabase/info';

// Initialize Supabase client
const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export type User = {
  id: string;
  email: string;
  name: string;
  access_token: string;
};

export type CarModel = {
  id: string;
  name: string;
  basePrice: number;
  image: string;
  type: string;
  range: string;
  acceleration: string;
  batterySize: string;
  topSpeed: string;
  description: string;
  features: string[];
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);

  // Check for existing session on load
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session && session.access_token) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || '',
          access_token: session.access_token
        });
      }
    } catch (error) {
      console.error('Session check error:', error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || '',
          access_token: session.access_token
        });
        setCurrentPage('home');
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f2791f6d/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // After successful signup, automatically log in the user
      await handleLogin(email, password);
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setCurrentPage('home');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSelectCar = (car: CarModel) => {
    setSelectedCar(car);
    setCurrentPage('customize');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'cars':
        return <Cars onSelectCar={handleSelectCar} />;
      case 'vehicles':
        return <Vehicles onNavigate={setCurrentPage} />;
      case 'customize':
        return <Customize car={selectedCar} user={user} />;
      case 'energy':
        return <Energy onNavigate={setCurrentPage} />;
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'signup':
        return <Signup onSignup={handleSignup} onNavigate={setCurrentPage} />;
      case 'charging':
      case 'discover':
      case 'shop':
        // For now, redirect to home since these pages don't exist yet
        setCurrentPage('home');
        return <Home onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
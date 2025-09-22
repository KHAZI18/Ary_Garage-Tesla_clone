import React from 'react';
import { User, LogOut, Menu, X, HelpCircle, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { TeslaLogo } from './TeslaLogo';

type User = {
  id: string;
  email: string;
  name: string;
  access_token: string;
};

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: User | null;
  onLogout: () => void;
}

export function Navigation({ currentPage, onNavigate, user, onLogout }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'energy', label: 'Energy' },
    { id: 'charging', label: 'Charging' },
    { id: 'discover', label: 'Discover' },
    { id: 'shop', label: 'Shop' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex items-center">
            <div className="cursor-pointer" onClick={() => handleNavigate('home')}>
              <TeslaLogo className="text-black" width={120} height={24} />
            </div>
          </div>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 rounded ${
                  currentPage === item.id
                    ? 'text-black'
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="hidden lg:flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <HelpCircle className="h-5 w-5 text-gray-700" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Globe className="h-5 w-5 text-gray-700" />
            </button>
            {user ? (
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <User className="h-5 w-5 text-gray-700" />
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-sm font-medium"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <button 
                onClick={() => handleNavigate('login')}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <User className="h-5 w-5 text-gray-700" />
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors rounded ${
                    currentPage === item.id
                      ? 'text-black bg-gray-100'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile User Section */}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2">
                      <span className="text-sm text-gray-700 font-medium">Welcome, {user.name}</span>
                    </div>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleNavigate('signup')}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded"
                    >
                      Shop
                    </button>
                    <button
                      onClick={() => handleNavigate('login')}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded"
                    >
                      Account
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
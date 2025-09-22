import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onNavigate: (page: string) => void;
}

export function Login({ onLogin, onNavigate }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await onLogin(email, password);
    } catch (error: any) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-medium text-black">
            Sign In
          </h2>
        </div>

        {/* Login Form */}
        <div className="bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">Email Address</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-3 border border-gray-300 rounded-none focus:border-black focus:ring-0"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-black">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-none focus:border-black focus:ring-0"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-black focus:ring-black border-gray-300"
                />
                <Label htmlFor="remember-me" className="ml-2 text-gray-600">
                  Stay signed in
                </Label>
              </div>

              <div>
                <button
                  type="button"
                  className="text-black hover:text-gray-600 underline"
                  onClick={() => {/* Add forgot password functionality */}}
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-none font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Don't have a Tesla account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('signup')}
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>

        {/* Demo Account Info */}
        <div className="bg-gray-50 p-4 border">
          <h3 className="font-medium text-black mb-2">Demo Account</h3>
          <p className="text-sm text-gray-600 mb-3">
            Try the platform with these demo credentials:
          </p>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>Email:</strong> demo@tesla.com</p>
            <p><strong>Password:</strong> demo123</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-none"
            onClick={() => {
              setEmail('demo@tesla.com');
              setPassword('demo123');
            }}
          >
            Fill Demo Credentials
          </Button>
        </div>

        {/* Additional Links */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-sm text-gray-600 hover:text-black underline"
          >
            ← Back to Tesla
          </button>
        </div>
      </div>
    </div>
  );
}
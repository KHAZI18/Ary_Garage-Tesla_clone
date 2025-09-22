import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Mail, Lock, User, Eye, EyeOff, Check } from 'lucide-react';

interface SignupProps {
  onSignup: (email: string, password: string, name: string) => Promise<void>;
  onNavigate: (page: string) => void;
}

export function Signup({ onSignup, onNavigate }: SignupProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return 'Name is required';
    }
    if (!formData.email.trim()) {
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return 'Please enter a valid email address';
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    if (!acceptTerms) {
      return 'Please accept the terms and conditions';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await onSignup(formData.email, formData.password, formData.name);
    } catch (error: any) {
      setError(error.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-medium text-black">
            Create Account
          </h2>
        </div>

        {/* Signup Form */}
        <div className="bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-black">First Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your first name"
                className="w-full px-3 py-3 border border-gray-300 rounded-none focus:border-black focus:ring-0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-3 border border-gray-300 rounded-none focus:border-black focus:ring-0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-black">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create a password"
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
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded ${
                          passwordStrength >= level ? strengthColors[passwordStrength - 1] : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">
                    Password strength: {strengthLabels[passwordStrength - 1] || 'Very Weak'}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-black">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-none focus:border-black focus:ring-0"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="flex items-center text-green-600 text-sm">
                  <Check className="h-4 w-4 mr-1" />
                  Passwords match
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="accept-terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300"
              />
              <Label htmlFor="accept-terms" className="text-sm text-gray-600 cursor-pointer">
                I agree to the{' '}
                <button type="button" className="text-blue-600 hover:text-blue-700 underline">
                  Terms of Use
                </button>{' '}
                and{' '}
                <button type="button" className="text-blue-600 hover:text-blue-700 underline">
                  Privacy Policy
                </button>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-none font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have a Tesla account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        {/* Benefits */}
        <div className="bg-gray-50 p-4 border">
          <h3 className="font-medium text-black mb-3">Why create a Tesla account?</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-600" />
              Schedule service appointments
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-600" />
              Manage your Tesla orders
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-600" />
              Access exclusive owner benefits
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-600" />
              Control your vehicle remotely
            </li>
          </ul>
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
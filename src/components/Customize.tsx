import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import type { User, CarModel } from '../App';

interface CustomizeProps {
  car: CarModel | null;
  user: User | null;
}

type Customization = {
  battery: string;
  color: string;
  wheels: string;
  interior: string;
  autopilot: string;
};

export function Customize({ car, user }: CustomizeProps) {
  const [customization, setCustomization] = useState<Customization>({
    battery: 'standard',
    color: 'white',
    wheels: 'standard',
    interior: 'black',
    autopilot: 'none'
  });

  const [currentPrice, setCurrentPrice] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const batteryOptions = [
    { id: 'standard', label: 'Standard Range', price: 0, range: '272 mi', acceleration: '5.8s' },
    { id: 'long-range', label: 'Long Range AWD', price: 747000, range: '358 mi', acceleration: '4.2s' },
    { id: 'performance', label: 'Performance', price: 1660000, range: '315 mi', acceleration: '3.1s' }
  ];

  const colorOptions = [
    { id: 'white', label: 'Pearl White Multi-Coat', price: 0, hex: '#ffffff' },
    { id: 'black', label: 'Solid Black', price: 83000, hex: '#1a1a1a' },
    { id: 'blue', label: 'Deep Blue Metallic', price: 83000, hex: '#1e3a8a' },
    { id: 'red', label: 'Red Multi-Coat', price: 166000, hex: '#dc2626' },
    { id: 'gray', label: 'Midnight Silver Metallic', price: 83000, hex: '#6b7280' }
  ];

  const wheelOptions = [
    { id: 'standard', label: '18" Aero Wheels', price: 0 },
    { id: 'sport', label: '19" Sport Wheels', price: 124500 },
    { id: 'performance', label: '20" Überturbine Wheels', price: 207500 }
  ];

  const interiorOptions = [
    { id: 'black', label: 'All Black', price: 0 },
    { id: 'white', label: 'Black and White', price: 83000 },
    { id: 'cream', label: 'Cream', price: 83000 }
  ];

  const autopilotOptions = [
    { id: 'none', label: 'Basic Autopilot', price: 0 },
    { id: 'enhanced', label: 'Enhanced Autopilot', price: 498000 },
    { id: 'fsd', label: 'Full Self-Driving Capability', price: 996000 }
  ];

  // Calculate price whenever customization changes
  useEffect(() => {
    if (!car) return;

    const batteryPrice = batteryOptions.find(b => b.id === customization.battery)?.price || 0;
    const colorPrice = colorOptions.find(c => c.id === customization.color)?.price || 0;
    const wheelPrice = wheelOptions.find(w => w.id === customization.wheels)?.price || 0;
    const interiorPrice = interiorOptions.find(i => i.id === customization.interior)?.price || 0;
    const autopilotPrice = autopilotOptions.find(a => a.id === customization.autopilot)?.price || 0;

    setCurrentPrice(car.basePrice + batteryPrice + colorPrice + wheelPrice + interiorPrice + autopilotPrice);
  }, [customization, car]);

  const saveCustomization = async () => {
    if (!user || !car) {
      setSaveMessage('Please log in to save your customization');
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f2791f6d/save-customization`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access_token}`,
        },
        body: JSON.stringify({
          carId: car.id,
          carName: car.name,
          config: customization,
          totalPrice: currentPrice
        }),
      });

      if (response.ok) {
        setSaveMessage('Configuration saved successfully!');
      } else {
        const data = await response.json();
        setSaveMessage(data.error || 'Failed to save configuration');
      }
    } catch (error) {
      console.error('Failed to save customization:', error);
      setSaveMessage('Failed to save configuration');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-black mb-4">No Vehicle Selected</h2>
          <p className="text-gray-600 mb-6">Please select a vehicle from our lineup to start customizing.</p>
          <Button onClick={() => window.history.back()} className="bg-black text-white hover:bg-gray-800 rounded-none">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Vehicles
          </Button>
        </div>
      </div>
    );
  }

  const selectedBattery = batteryOptions.find(b => b.id === customization.battery);
  const selectedColor = colorOptions.find(c => c.id === customization.color);
  const selectedAutopilot = autopilotOptions.find(a => a.id === customization.autopilot);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-medium mb-4">
            Design Your {car.name}
          </h1>
          <p className="text-xl opacity-90">
            Starting at ₹{currentPrice.toLocaleString('en-IN')}*
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Car Preview */}
          <div className="space-y-8">
            <div className="relative">
              <ImageWithFallback
                src={car.image}
                alt={car.name}
                className="w-full h-80 object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-medium">{selectedBattery?.range}</p>
                <p className="text-sm text-gray-600">Range (EPA est.)</p>
              </div>
              <div>
                <p className="text-2xl font-medium">{selectedBattery?.acceleration}</p>
                <p className="text-sm text-gray-600">0-60 mph*</p>
              </div>
              <div>
                <p className="text-2xl font-medium">{car.topSpeed}</p>
                <p className="text-sm text-gray-600">Top Speed*</p>
              </div>
            </div>
          </div>

          {/* Configuration Options */}
          <div className="space-y-8">
            {/* Range */}
            <div>
              <h3 className="text-xl font-medium mb-4">Range</h3>
              <div className="space-y-3">
                {batteryOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`flex justify-between items-center p-4 border cursor-pointer transition-all ${
                      customization.battery === option.id
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setCustomization(prev => ({ ...prev, battery: option.id }))}
                  >
                    <div>
                      <h4 className="font-medium">{option.label}</h4>
                      <p className="text-sm text-gray-600">{option.range} range • {option.acceleration} 0-60 mph</p>
                    </div>
                    <p className="font-medium">
                      {option.price === 0 ? 'Included' : `+₹${option.price.toLocaleString('en-IN')}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Paint */}
            <div>
              <h3 className="text-xl font-medium mb-4">Paint</h3>
              <div className="space-y-3">
                {colorOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`flex justify-between items-center p-4 border cursor-pointer transition-all ${
                      customization.color === option.id
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setCustomization(prev => ({ ...prev, color: option.id }))}
                  >
                    <div className="flex items-center">
                      <div
                        className="w-6 h-6 rounded-full border border-gray-300 mr-3"
                        style={{ backgroundColor: option.hex }}
                      ></div>
                      <h4 className="font-medium">{option.label}</h4>
                    </div>
                    <p className="font-medium">
                      {option.price === 0 ? 'Included' : `+₹${option.price.toLocaleString('en-IN')}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Wheels */}
            <div>
              <h3 className="text-xl font-medium mb-4">Wheels</h3>
              <div className="space-y-3">
                {wheelOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`flex justify-between items-center p-4 border cursor-pointer transition-all ${
                      customization.wheels === option.id
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setCustomization(prev => ({ ...prev, wheels: option.id }))}
                  >
                    <h4 className="font-medium">{option.label}</h4>
                    <p className="font-medium">
                      {option.price === 0 ? 'Included' : `+₹${option.price.toLocaleString('en-IN')}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interior */}
            <div>
              <h3 className="text-xl font-medium mb-4">Interior</h3>
              <div className="space-y-3">
                {interiorOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`flex justify-between items-center p-4 border cursor-pointer transition-all ${
                      customization.interior === option.id
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setCustomization(prev => ({ ...prev, interior: option.id }))}
                  >
                    <h4 className="font-medium">{option.label}</h4>
                    <p className="font-medium">
                      {option.price === 0 ? 'Included' : `+₹${option.price.toLocaleString('en-IN')}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Autopilot */}
            <div>
              <h3 className="text-xl font-medium mb-4">Autopilot</h3>
              <div className="space-y-3">
                {autopilotOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`flex justify-between items-center p-4 border cursor-pointer transition-all ${
                      customization.autopilot === option.id
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setCustomization(prev => ({ ...prev, autopilot: option.id }))}
                  >
                    <h4 className="font-medium">{option.label}</h4>
                    <p className="font-medium">
                      {option.price === 0 ? 'Included' : `+₹${option.price.toLocaleString('en-IN')}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Section */}
            <div className="bg-gray-50 p-6 border">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">Total</span>
                <span className="text-2xl font-medium">₹{currentPrice.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-none font-medium">
                  Order Now
                </Button>
                
                {user && (
                  <Button 
                    onClick={saveCustomization} 
                    disabled={isSaving}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-none"
                  >
                    {isSaving ? 'Saving...' : 'Save Configuration'}
                  </Button>
                )}
              </div>

              {saveMessage && (
                <div className={`text-sm mt-3 p-2 ${
                  saveMessage.includes('success') 
                    ? 'text-green-700 bg-green-100' 
                    : 'text-red-700 bg-red-100'
                }`}>
                  {saveMessage}
                </div>
              )}

              {!user && (
                <div className="text-sm text-gray-600 mt-3">
                  <p>Sign in to save your configuration</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
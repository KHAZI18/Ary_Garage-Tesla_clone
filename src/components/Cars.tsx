import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Zap, Gauge, Battery, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { CarModel } from '../App';

interface CarsProps {
  onSelectCar: (car: CarModel) => void;
}

export function Cars({ onSelectCar }: CarsProps) {
  const [selectedType, setSelectedType] = useState<string>('all');

  const carModels: CarModel[] = [
    {
      id: 'model-s',
      name: 'Model S',
      basePrice: 6224170,
      image: 'https://images.unsplash.com/photo-1453491945771-a1e904948959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMG1vZGVsJTIwcyUyMGVsZWN0cmljJTIwY2FyfGVufDF8fHx8MTc1ODM4MzU2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      type: 'sedan',
      range: '405 mi',
      acceleration: '1.99 s',
      batterySize: '100 kWh',
      topSpeed: '200 mph',
      description: 'Flagship luxury sedan with maximum comfort and convenience',
      features: ['Autopilot Included', 'Premium Interior', 'Glass Roof', 'Advanced Safety']
    },
    {
      id: 'model-3',
      name: 'Model 3',
      basePrice: 3236170,
      image: 'https://images.unsplash.com/photo-1573794607350-eea0ba7cc94a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMG1vZGVsJTIwMyUyMHJlZHxlbnwxfHx8fDE3NTgzODM1NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      type: 'sedan',
      range: '358 mi',
      acceleration: '3.1 s',
      batterySize: '82 kWh',
      topSpeed: '162 mph',
      description: 'High performance sedan designed for every driver',
      features: ['Autopilot', 'Full Self-Driving Capability', 'Premium Audio', 'Smartphone Integration']
    },
    {
      id: 'model-x',
      name: 'Model X',
      basePrice: 8174670,
      image: 'https://images.unsplash.com/photo-1573700204813-3dfdaecf677c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMG1vZGVsJTIweCUyMHN1dnxlbnwxfHx8fDE3NTgzODM1NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      type: 'suv',
      range: '348 mi',
      acceleration: '2.5 s',
      batterySize: '100 kWh',
      topSpeed: '163 mph',
      description: 'Premium SUV with falcon wing doors and unparalleled performance',
      features: ['Falcon Wing Doors', '7-Seat Configuration', 'Towing Capacity', 'Bioweapon Defense Mode']
    },
    {
      id: 'model-y',
      name: 'Model Y',
      basePrice: 3962420,
      image: 'https://images.unsplash.com/photo-1600661653561-629509216228?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMG1vZGVsJTIweSUyMHdoaXRlfGVufDF8fHx8MTc1ODM4MzU3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      type: 'suv',
      range: '330 mi',
      acceleration: '3.5 s',
      batterySize: '81 kWh',
      topSpeed: '155 mph',
      description: 'Versatile SUV with maximum utility and all-wheel drive',
      features: ['All-Wheel Drive', 'Glass Roof', 'HEPA Air Filtration', 'Third Row Seating Available']
    },
    {
      id: 'cybertruck',
      name: 'Cybertruck',
      basePrice: 8000370,
      image: 'https://images.unsplash.com/photo-1722499205558-e23603eeb43d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMGN5YmVydHJ1Y2t8ZW58MXx8fHwxNzU4MzgzNTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      type: 'truck',
      range: '340 mi',
      acceleration: '2.7 s',
      batterySize: '123 kWh',
      topSpeed: '130 mph',
      description: 'Ultra-hard 30X cold-rolled stainless steel exoskeleton',
      features: ['Ultra-Hard Exoskeleton', '11,000+ lbs Towing', 'Armor Glass', 'Air Suspension']
    },
    {
      id: 'roadster',
      name: 'Roadster',
      basePrice: 16600000,
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMHJvYWRzdGVyfGVufDF8fHx8MTc1ODM4MzU3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      type: 'roadster',
      range: '620 mi',
      acceleration: '1.9 s',
      batterySize: '200 kWh',
      topSpeed: '250+ mph',
      description: 'The quickest car in the world, with record-setting performance',
      features: ['SpaceX Package', 'Cold Gas Thrusters', 'Removable Glass Roof', 'Track Mode']
    }
  ];

  const carTypes = [
    { id: 'all', label: 'All Vehicles' },
    { id: 'sedan', label: 'Sedans' },
    { id: 'suv', label: 'SUVs' },
    { id: 'truck', label: 'Trucks' },
    { id: 'roadster', label: 'Roadster' }
  ];

  const filteredCars = selectedType === 'all' 
    ? carModels 
    : carModels.filter(car => car.type === selectedType);

  return (
    <div className="min-h-screen py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-normal text-black mb-8">
            Vehicles
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Designed for efficiency, made for the future
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {carTypes.map((type) => (
            <Button
              key={type.id}
              variant={selectedType === type.id ? "default" : "ghost"}
              onClick={() => setSelectedType(type.id)}
              className={`px-6 py-2 ${
                selectedType === type.id 
                  ? 'bg-black text-white' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {type.label}
            </Button>
          ))}
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div key={car.id} className="group cursor-pointer" onClick={() => onSelectCar(car)}>
              <div className="relative overflow-hidden bg-white">
                <ImageWithFallback
                  src={car.image}
                  alt={car.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="pt-6 text-center">
                <h3 className="text-2xl font-medium text-black mb-2">{car.name}</h3>
                <p className="text-gray-600 mb-4">{car.description}</p>
                
                {/* Specs */}
                <div className="flex justify-center space-x-6 mb-4 text-sm text-gray-600">
                  <div>{car.range} range</div>
                  <div>{car.acceleration} 0-60 mph</div>
                  <div>{car.topSpeed} top speed</div>
                </div>

                {/* Price */}
                <div className="text-lg text-black mb-6">
                  Starting at ₹{car.basePrice.toLocaleString('en-IN')}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-black text-white hover:bg-gray-800 rounded-none"
                  >
                    Order Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-none"
                  >
                    Demo Drive
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No vehicles found for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
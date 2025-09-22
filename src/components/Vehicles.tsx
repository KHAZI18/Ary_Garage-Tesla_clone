import React from 'react';
import { Button } from './ui/button';
import { MessageCircle, Car } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import exampleImage from 'figma:asset/d64896a5cecec756fef4886d7b731c5c52962ed8.png';

interface VehiclesProps {
  onNavigate: (page: string) => void;
}

export function Vehicles({ onNavigate }: VehiclesProps) {
  const vehicleModels = [
    {
      id: 'model-s',
      name: 'Model S',
      image: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-S-New.png',
      hasOrderLink: true
    },
    {
      id: 'model-3',
      name: 'Model 3',
      image: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-3-Performance-LHD.png',
      hasOrderLink: true
    },
    {
      id: 'model-y',
      name: 'Model Y',
      image: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-Y-2-v2.png',
      hasOrderLink: true
    },
    {
      id: 'model-x',
      name: 'Model X',
      image: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-X-New.png',
      hasOrderLink: true
    },
    {
      id: 'cybertruck',
      name: 'Cybertruck',
      image: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Cybertruck-1x.png',
      hasOrderLink: true
    },
    {
      id: 'inventory',
      name: 'Inventory',
      image: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Inventory.png',
      hasOrderLink: false,
      isInventory: true
    }
  ];

  const vehicleLinks = [
    'Current Offers',
    'Demo Drive',
    'Trade-in',
    'Pre-Owned',
    'Features',
    'Help Me Choose',
    'Compare',
    'Workshops',
    'Help Me Charge',
    'Fleet',
    'Semi',
    'Roadster',
    'Federal Tax Credit'
  ];

  return (
    <div className="min-h-screen bg-white relative">
      {/* Main Content */}
      <div className="pt-6 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex">
            {/* Left Section: Vehicle Models Grid */}
            <div className="flex-1 pr-12">
              {/* Vehicle Grid - 2 rows x 3 columns */}
              <div className="grid grid-cols-3 gap-6">
                {vehicleModels.map((vehicle, index) => (
                  <div key={vehicle.id} className="group">
                    <div className="mb-3">
                      <ImageWithFallback
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-20 object-cover"
                      />
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-base font-medium text-black mb-2">
                        {vehicle.name}
                      </h3>
                      
                      {vehicle.isInventory ? (
                        <div className="flex justify-center space-x-4">
                          <button className="text-xs text-gray-600 underline hover:no-underline">
                            New
                          </button>
                          <button className="text-xs text-gray-600 underline hover:no-underline">
                            Pre-Owned
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-center space-x-4">
                          <button className="text-xs text-gray-600 underline hover:no-underline">
                            Learn
                          </button>
                          {vehicle.hasOrderLink && (
                            <button className="text-xs text-gray-600 underline hover:no-underline">
                              Order
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section: Vehicle Links */}
            <div className="w-64 flex-shrink-0">
              <div className="space-y-2">
                {vehicleLinks.map((link) => (
                  <div key={link}>
                    <button className="text-left text-black hover:text-gray-600 transition-colors text-sm leading-relaxed">
                      {link}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 py-3 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-8">
            {/* Ask a Question */}
            <div className="flex items-center gap-2 cursor-pointer">
              <MessageCircle className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">
                Ask a Question "What does the Tesla app do?"
              </span>
            </div>

            {/* Schedule a Drive */}
            <Button 
              onClick={() => onNavigate('cars')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm flex items-center gap-2"
            >
              <Car className="w-4 h-4" />
              Schedule a Drive Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Button } from './ui/button';
import { MessageCircle, Car } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import solarPanelsImage from 'figma:asset/b100a341e421061ae4f6c404eb65e53f30f06ef8.png';
import solarRoofImage from 'figma:asset/028a2025f55ff174432d47ee1e0b044d73d86a94.png';
import powerwallImage from 'figma:asset/2e413d79ae9febf8f6a132f1fd66e2e5480c16ac.png';

interface EnergyProps {
  onNavigate: (page: string) => void;
}

export function Energy({ onNavigate }: EnergyProps) {
  const energyProducts = [
    {
      id: 'solar-panels',
      name: 'Solar Panels',
      image: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Energy-Solar-Panels.png'
    },
    {
      id: 'solar-roof',
      name: 'Solar Roof',
      image: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Energy-Solar-Roof.png'
    },
    {
      id: 'powerwall',
      name: 'Powerwall',
      image: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Energy-Powerwall-US.png'
    },
    {
      id: 'megapack',
      name: 'Megapack',
      image: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Energy-Megapack.png'
    }
  ];

  const serviceLinks = [
    'Schedule a Consultation',
    'Why Solar',
    'Incentives',
    'Support',
    'Partner with Tesla',
    'Commercial',
    'Utilities'
  ];

  return (
    <div className="min-h-screen bg-white relative">
      {/* Main Content */}
      <div className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex">
            {/* Left Section: Products Grid */}
            <div className="flex-1 pr-16">
              {/* Top Row - 3 products */}
              <div className="grid grid-cols-3 gap-12 mb-16">
                {energyProducts.slice(0, 3).map((product) => (
                  <div key={product.id} className="group">
                    <div className="mb-6">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-black mb-3">
                        {product.name}
                      </h3>
                      
                      <div className="flex justify-center space-x-6">
                        <button className="text-sm text-gray-600 underline hover:no-underline">
                          Learn
                        </button>
                        <button className="text-sm text-gray-600 underline hover:no-underline">
                          Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Row - Megapack */}
              <div className="w-1/3">
                <div className="mb-6">
                  <ImageWithFallback
                    src={energyProducts[3].image}
                    alt={energyProducts[3].name}
                    className="w-full h-32 object-cover"
                  />
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-medium text-black mb-3">
                    {energyProducts[3].name}
                  </h3>
                  
                  <div className="flex justify-center">
                    <button className="text-sm text-gray-600 underline hover:no-underline">
                      Learn
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section: Service Links */}
            <div className="w-64 flex-shrink-0">
              <div className="space-y-4">
                {serviceLinks.map((link) => (
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
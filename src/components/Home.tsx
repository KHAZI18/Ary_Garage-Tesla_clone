import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { MessageCircle, Car, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import exampleImage from 'figma:asset/c5cf75161edcfba75ed7d178c1e427ff093b72cb.png';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVideoPaused, setIsVideoPaused] = useState(false);

  const slides = [
    {
      id: 'tax-credit',
      title: 'Secure the $7,500 Federal Tax Credit',
      subtitle: 'Limited Inventory — Take Delivery by September 30',
      buttons: [
        { text: 'Order Model 3', action: () => onNavigate('customize'), variant: 'primary' },
        { text: 'Order Model Y', action: () => onNavigate('customize'), variant: 'primary' }
      ],
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMG1vZGVsJTIwMyUyMGFuZCUyMG1vZGVsJTIweSUyMGRlc2VydHxlbnwxfHx8fDE3NTg0NTUwNzF8MA&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'model-3',
      title: 'Model 3',
      subtitle: 'Starting at $38,990*',
      description: 'After Federal Tax Credit & Est. Gas Savings',
      buttons: [
        { text: 'Custom Order', action: () => onNavigate('customize'), variant: 'primary' },
        { text: 'Demo Drive', action: () => onNavigate('vehicles'), variant: 'secondary' }
      ],
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMG1vZGVsJTIwM3xlbnwxfHx8fDE3NTg0NTUwNzV8MA&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'model-y',
      title: 'Model Y',
      subtitle: 'Starting at $47,740*',
      description: 'After Federal Tax Credit & Est. Gas Savings',
      buttons: [
        { text: 'Custom Order', action: () => onNavigate('customize'), variant: 'primary' },
        { text: 'Demo Drive', action: () => onNavigate('vehicles'), variant: 'secondary' }
      ],
      image: 'https://images.unsplash.com/photo-1621104890551-30fe5db0a8de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMG1vZGVsJTIweSUyMGRlc2VydHxlbnwxfHx8fDE3NTg0NTUwNzl8MA&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full">
      {/* Main Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={currentSlideData.image}
            alt={currentSlideData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4 tracking-tight text-white">
              {currentSlideData.title}
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl mb-2 font-normal text-white/90">
              {currentSlideData.subtitle}
            </p>
            
            {currentSlideData.description && (
              <p className="text-sm md:text-base lg:text-lg mb-8 font-normal text-white/80">
                {currentSlideData.description}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              {currentSlideData.buttons.map((button, index) => (
                <Button
                  key={index}
                  onClick={button.action}
                  className={`
                    px-8 py-3 min-w-[180px] text-sm font-medium rounded-sm transition-all duration-300
                    ${button.variant === 'primary' 
                      ? 'bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700' 
                      : 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-black'
                    }
                  `}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Additional Content Sections */}
      <div className="bg-white py-16">
        {/* Two Card Section */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Offers Card */}
            <div className="bg-gray-50 rounded-lg overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300">
              <div className="p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  <div className="flex-1">
                    <h2 className="text-2xl lg:text-3xl font-medium text-black mb-3">
                      Current Offers
                    </h2>
                    <p className="text-gray-600 mb-6 text-sm lg:text-base">
                      Limited inventory. Take delivery today.
                    </p>
                    <Button 
                      onClick={() => onNavigate('vehicles')}
                      className="bg-transparent text-black border-2 border-black hover:bg-black hover:text-white rounded-sm px-6 py-3 text-sm font-medium"
                    >
                      Learn More
                    </Button>
                  </div>
                  <div className="w-full lg:w-48 h-32 lg:h-24">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1674295648385-3c511113e825?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMGNhcnMlMjBsaW5ldXAlMjBkZXNlcnR8ZW58MXx8fHwxNzU4NDU3MDg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Tesla Cars"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Annual Shareholder Meeting Card */}
            <div className="bg-gray-50 rounded-lg overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300">
              <div className="p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  <div className="flex-1">
                    <h2 className="text-2xl lg:text-3xl font-medium text-black mb-3">
                      Annual Shareholder Meeting
                    </h2>
                    <p className="text-gray-600 mb-2 text-sm lg:text-base">
                      The future of Tesla is in your hands.
                    </p>
                    <p className="text-gray-600 mb-6 text-sm lg:text-base">
                      Learn why your vote matters.
                    </p>
                    <Button 
                      onClick={() => onNavigate('discover')}
                      className="bg-transparent text-black border-2 border-black hover:bg-black hover:text-white rounded-sm px-6 py-3 text-sm font-medium"
                    >
                      Learn More
                    </Button>
                  </div>
                  <div className="w-full lg:w-48 h-32 lg:h-24">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1729267597955-fd2f603e832f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZXglMjByb2NrZXQlMjBsYXVuY2glMjBzdW5zZXR8ZW58MXx8fHwxNzU4NDU3MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="SpaceX Rocket"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Large Interactive Sections */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video/Interior View Section */}
            <div className="relative rounded-lg overflow-hidden h-64 lg:h-80 group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1632809681679-abcf57f656c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBpbnRlcmlvciUyMHZpZXclMjBsYW5kc2NhcGUlMjBkcml2aW5nfGVufDF8fHx8MTc1ODQ1NzA5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Tesla Interior View"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Play/Pause Button */}
              <button
                onClick={() => setIsVideoPaused(!isVideoPaused)}
                className="absolute top-4 right-4 w-12 h-8 bg-gray-600/80 backdrop-blur-sm rounded flex items-center justify-center text-white hover:bg-gray-600 transition-all"
              >
                {isVideoPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>

              {/* Ask a Question Button */}
              <div className="absolute bottom-4 left-4">
                <Button className="bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 rounded-sm px-4 py-2 text-sm font-medium flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Ask a Question
                </Button>
              </div>
            </div>

            {/* Charging Section */}
            <div className="relative rounded-lg overflow-hidden h-64 lg:h-80 group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1663579747243-d639fc94e28d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMGVsZWN0cmljJTIwY2FyJTIwY2hhcmdpbmclMjBzdGF0aW9ufGVufDF8fHx8MTc1ODQ1NzA5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Tesla Charging"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Schedule a Drive Button */}
              <div className="absolute bottom-4 right-4">
                <Button 
                  onClick={() => onNavigate('vehicles')}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-sm px-4 py-2 text-sm font-medium flex items-center gap-2"
                >
                  <Car className="w-4 h-4" />
                  Schedule a Drive Today
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 py-4 z-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-8">
            {/* Ask a Question */}
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gray-800 rounded-sm flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-800 font-medium">
                Ask a Question
              </span>
            </div>

            {/* Schedule a Drive */}
            <Button 
              onClick={() => onNavigate('vehicles')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-medium flex items-center gap-3 rounded-sm"
            >
              <div className="w-8 h-8 bg-blue-700 rounded-sm flex items-center justify-center">
                <Car className="w-4 h-4 text-white" />
              </div>
              Schedule a Drive Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 md:py-20">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/Photography/photography2.jpg"
          alt="Creative workspace"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60"></div>
        {/* Additional subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 md:pt-16 pb-16">
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-white mb-8 leading-tight tracking-tight">
            Darren
            <span className="block font-normal text-white/90 text-5xl md:text-7xl lg:text-8xl">Gennetten</span>
          </h1>
          <div className="w-32 h-1 bg-white mx-auto mb-10 opacity-90"></div>
          <p className="text-2xl md:text-3xl text-white/95 font-light max-w-2xl mx-auto leading-relaxed">
            Graphic Designer & Visual Storyteller
          </p>
        </div>
        
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-16 leading-relaxed">
          Creating impactful visual experiences through thoughtful design, 
          compelling photography, and innovative brand solutions.
        </p>

        <button
          onClick={onExploreClick}
          className="group inline-flex items-center space-x-3 bg-white text-gray-900 px-10 py-5 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl mb-16"
        >
          <span className="font-semibold text-lg">Explore My Work</span>
          <ArrowRight 
            size={24} 
            className="group-hover:translate-x-1 transition-transform duration-300" 
          />
        </button>

        <div className="grid grid-cols-3 gap-8 max-w-md mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-light text-white mb-2">50+</div>
            <div className="text-sm text-white/80 uppercase tracking-wide font-medium">Projects</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-light text-white mb-2">5+</div>
            <div className="text-sm text-white/80 uppercase tracking-wide font-medium">Years</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-light text-white mb-2">25+</div>
            <div className="text-sm text-white/80 uppercase tracking-wide font-medium">Clients</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
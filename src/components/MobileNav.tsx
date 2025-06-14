import React from 'react';
import { User, Camera, Palette, Home } from 'lucide-react';

interface MobileNavProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ currentSection, onSectionChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'logos', label: 'Logos', icon: Palette },
    { id: 'photographs', label: 'Photos', icon: Camera },
    { id: 'design-projects', label: 'Projects', icon: Palette },
    { id: 'bio', label: 'About', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200">
      <div className="flex">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors ${
                currentSection === item.id
                  ? 'text-gray-900 bg-gray-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
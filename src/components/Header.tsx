import React from 'react';
import { Menu, User, Camera, Palette } from 'lucide-react';

interface HeaderProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  currentSection, 
  onSectionChange, 
  onMenuToggle,
  isMobileMenuOpen 
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'logos', label: 'Logos', icon: Palette },
    { id: 'photographs', label: 'Photos', icon: Camera },
    { id: 'design-projects', label: 'Projects', icon: Palette },
    { id: 'bio', label: 'About', icon: User },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onSectionChange('home')}
              className="text-2xl font-light text-gray-900 hover:text-gray-600 transition-colors"
            >
              Darren Gennetten
            </button>
            <nav className="flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    currentSection === item.id
                      ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onSectionChange('home')}
              className="text-xl font-light text-gray-900"
            >
              Darren Gennetten
            </button>
            <button
              onClick={onMenuToggle}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={onMenuToggle}>
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-medium text-gray-900">Menu</h2>
                <button
                  onClick={onMenuToggle}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <nav className="space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionChange(item.id);
                      onMenuToggle();
                    }}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg text-left transition-colors ${
                      currentSection === item.id
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.icon && <item.icon size={20} />}
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
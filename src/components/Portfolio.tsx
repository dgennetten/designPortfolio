import React from 'react';
import { PortfolioItem } from '../types';

interface PortfolioProps {
  items: PortfolioItem[];
  category: string;
  onItemClick: (item: PortfolioItem, index: number) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ items, category, onItemClick }) => {
  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case 'logos': return 'Logo Design';
      case 'photographs': return 'Photography';
      case 'design-projects': return 'Design Projects';
      default: return 'Portfolio';
    }
  };

  return (
    <section className="min-h-screen pt-20 md:pt-24 pb-20 md:pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            {getCategoryTitle(category)}
          </h2>
          <div className="w-24 h-1 bg-gray-900 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {category === 'logos' && 'Brand identity and logo design solutions that capture the essence of each client.'}
            {category === 'photographs' && 'Visual storytelling through the lens, capturing moments and emotions.'}
            {category === 'design-projects' && 'Comprehensive design projects from concept to completion.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onItemClick(item, index)}
              className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                  {item.name}
                </h3>
                {category !== 'photographs' && (
                  <p className="text-gray-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No items available in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
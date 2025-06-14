import React, { useState } from 'react';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Modal from './components/Modal';
import Bio from './components/Bio';
import { portfolioItems } from './data/portfolioData';
import { PortfolioItem } from './types';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    currentItem: null as PortfolioItem | null,
    currentIndex: 0,
    currentImageIndex: 0,
    filteredItems: [] as PortfolioItem[]
  });

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    setIsMobileMenuOpen(false);
  };

  const handleExploreClick = () => {
    setCurrentSection('logos');
  };

  const handleItemClick = (item: PortfolioItem, index: number) => {
    const filtered = portfolioItems.filter(p => p.category === item.category);
    setModalState({
      isOpen: true,
      currentItem: item,
      currentIndex: index,
      currentImageIndex: 0,
      filteredItems: filtered
    });
  };

  const handleModalClose = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleModalNavigation = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? modalState.currentIndex - 1 
      : modalState.currentIndex + 1;
    
    if (newIndex >= 0 && newIndex < modalState.filteredItems.length) {
      setModalState(prev => ({
        ...prev,
        currentIndex: newIndex,
        currentItem: prev.filteredItems[newIndex],
        currentImageIndex: 0
      }));
    }
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (!modalState.currentItem?.projectImages) return;
    
    const newImageIndex = direction === 'prev' 
      ? modalState.currentImageIndex - 1 
      : modalState.currentImageIndex + 1;
    
    const maxIndex = modalState.currentItem.projectImages.length - 1;
    if (newImageIndex >= 0 && newImageIndex <= maxIndex) {
      setModalState(prev => ({
        ...prev,
        currentImageIndex: newImageIndex
      }));
    }
  };

  const getCurrentPortfolioItems = () => {
    if (currentSection === 'home') return [];
    return portfolioItems.filter(item => item.category === currentSection);
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return <Hero onExploreClick={handleExploreClick} />;
      case 'bio':
        return <Bio />;
      case 'logos':
      case 'photographs':
      case 'design-projects':
        return (
          <Portfolio
            items={getCurrentPortfolioItems()}
            category={currentSection}
            onItemClick={handleItemClick}
          />
        );
      default:
        return <Hero onExploreClick={handleExploreClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <main>
        {renderCurrentSection()}
      </main>
      
      <MobileNav
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      />

      <Modal
        isOpen={modalState.isOpen}
        onClose={handleModalClose}
        item={modalState.currentItem}
        currentIndex={modalState.currentIndex}
        totalItems={modalState.filteredItems.length}
        onPrevious={() => handleModalNavigation('prev')}
        onNext={() => handleModalNavigation('next')}
        currentImageIndex={modalState.currentImageIndex}
        onPreviousImage={() => handleImageNavigation('prev')}
        onNextImage={() => handleImageNavigation('next')}
        totalProjectImages={modalState.currentItem?.projectImages?.length || 0}
      />
    </div>
  );
}

export default App;
import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PortfolioItem } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PortfolioItem | null;
  currentIndex: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
  currentImageIndex: number;
  onPreviousImage: () => void;
  onNextImage: () => void;
  totalProjectImages: number;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  item,
  currentIndex,
  totalItems,
  onPrevious,
  onNext,
  currentImageIndex,
  onPreviousImage,
  onNextImage,
  totalProjectImages
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleArrowKeys = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (item?.category === 'design-projects') {
        if (e.key === 'ArrowLeft' && currentImageIndex > 0) onPreviousImage();
        if (e.key === 'ArrowRight' && currentImageIndex < totalProjectImages - 1) onNextImage();
      } else {
        if (e.key === 'ArrowLeft' && currentIndex > 0) onPrevious();
        if (e.key === 'ArrowRight' && currentIndex < totalItems - 1) onNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleArrowKeys);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleArrowKeys);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrevious, onNext, onPreviousImage, onNextImage, currentIndex, totalItems, currentImageIndex, totalProjectImages, item?.category]);

  if (!isOpen || !item) return null;

  const getCurrentImage = () => {
    if (item.category === 'design-projects' && item.projectImages) {
      return item.projectImages[currentImageIndex];
    }
    return item.fullImage;
  };

  const getCurrentDescription = () => {
    if (item.category === 'design-projects' && item.projectImageDescriptions) {
      return item.projectImageDescriptions[currentImageIndex] || item.description;
    }
    return item.description;
  };

  const showNavigation = item.category === 'design-projects' ? totalProjectImages > 1 : totalItems > 1;
  const canGoPrevious = item.category === 'design-projects' ? currentImageIndex > 0 : currentIndex > 0;
  const canGoNext = item.category === 'design-projects' 
    ? currentImageIndex < totalProjectImages - 1 
    : currentIndex < totalItems - 1;

  const handlePrevious = item.category === 'design-projects' ? onPreviousImage : onPrevious;
  const handleNext = item.category === 'design-projects' ? onNextImage : onNext;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200 backdrop-blur-sm"
      >
        <X size={24} />
      </button>

      {/* Previous Button */}
      {showNavigation && canGoPrevious && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200 backdrop-blur-sm"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Next Button */}
      {showNavigation && canGoNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200 backdrop-blur-sm"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Modal Content */}
      <div 
        className="max-w-4xl max-h-full w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative mb-6 max-h-[70vh] w-full flex items-center justify-center">
          <img
            src={getCurrentImage()}
            alt={item.name}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Content */}
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 max-w-2xl w-full border border-white/10 shadow-xl">
          <h3 className="text-2xl font-medium text-white mb-2">
            {item.name}
          </h3>
          <p className="text-white/90 leading-relaxed">
            {getCurrentDescription()}
          </p>
          
          {/* Project Image Counter */}
          {item.category === 'design-projects' && item.projectImages && (
            <div className="mt-4 text-sm text-white/70">
              Image {currentImageIndex + 1} of {totalProjectImages}
            </div>
          )}
          
          {/* Item Counter */}
          {item.category !== 'design-projects' && (
            <div className="mt-4 text-sm text-white/70">
              {currentIndex + 1} of {totalItems}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
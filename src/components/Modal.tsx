import React, { useEffect, useRef, useState } from 'react';
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

const MODAL_MARGIN = 48; // px
const CAPTION_HEIGHT = 56; // px (adjust as needed for your compact caption)

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
  const [isPortrait, setIsPortrait] = useState<boolean | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsPortrait(null);
    setImageLoaded(false);
  }, [item, currentImageIndex, isOpen]);

  const handleImageLoad = () => {
    if (imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      setIsPortrait(naturalHeight > naturalWidth);
      setImageLoaded(true);
    }
  };

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

  const imageMaxHeight = isPortrait === null
    ? `calc(100vh - ${MODAL_MARGIN}px)`
    : isPortrait
      ? `calc(100vh - ${MODAL_MARGIN}px)`
      : `calc(100vh - ${MODAL_MARGIN + CAPTION_HEIGHT}px)`;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-3 bg-gray-200/40 hover:bg-gray-300/60 rounded-full text-white transition-all duration-200 backdrop-blur-sm"
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
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-gray-200/40 hover:bg-gray-300/60 rounded-full text-white transition-all duration-200 backdrop-blur-sm"
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
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-gray-200/40 hover:bg-gray-300/60 rounded-full text-white transition-all duration-200 backdrop-blur-sm"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Modal Content */}
      <div 
        className="max-w-5xl w-full flex flex-col items-center my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center w-full">
          <div className="relative w-full flex justify-center">
            <img
              ref={imgRef}
              src={getCurrentImage()}
              alt={item.name}
              onLoad={handleImageLoad}
              className="object-contain rounded-lg shadow-2xl transition-all"
              style={{
                maxHeight: imageMaxHeight,
                maxWidth: '100%',
                width: 'auto',
                height: 'auto',
                display: 'block'
              }}
            />
            {/* Portrait: Overlay caption */}
            {imageLoaded && isPortrait && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full max-w-2xl px-2 pointer-events-none">
                <div className="bg-white/30 backdrop-blur-md rounded-b-lg p-2 border-t border-white/10 shadow-xl pointer-events-auto">
                  <h3 className="text-lg font-medium text-white mb-1">
                    {item.name}
                  </h3>
                  <p className="text-white/90 leading-snug text-sm">
                    {getCurrentDescription()}
                  </p>
                  {item.category === 'design-projects' && item.projectImages && (
                    <div className="mt-2 text-xs text-white/70">
                      Image {currentImageIndex + 1} of {totalProjectImages}
                    </div>
                  )}
                  {item.category !== 'design-projects' && (
                    <div className="mt-2 text-xs text-white/70">
                      {currentIndex + 1} of {totalItems}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* Landscape: Caption below image */}
          {imageLoaded && isPortrait === false && (
            <div className="w-full max-w-2xl px-2 mt-2">
              <div className="bg-white/30 backdrop-blur-md rounded-lg p-2 border-t border-white/10 shadow-xl">
                <h3 className="text-lg font-medium text-white mb-1">
                  {item.name}
                </h3>
                <p className="text-white/90 leading-snug text-sm">
                  {getCurrentDescription()}
                </p>
                {item.category === 'design-projects' && item.projectImages && (
                  <div className="mt-2 text-xs text-white/70">
                    Image {currentImageIndex + 1} of {totalProjectImages}
                  </div>
                )}
                {item.category !== 'design-projects' && (
                  <div className="mt-2 text-xs text-white/70">
                    {currentIndex + 1} of {totalItems}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

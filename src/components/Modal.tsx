import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Square, Minus } from 'lucide-react';
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
  const [fullScreen, setFullScreen] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsPortrait(null);
    setImageLoaded(false);
    // Only reset full screen when opening/closing the modal, not when navigating
    if (!isOpen) {
      setFullScreen(false);
    }
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
      if (e.key === 'Escape') {
        if (fullScreen) {
          setFullScreen(false);
        } else {
          onClose();
        }
      }
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

    const handleFullScreen = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        setFullScreen(!fullScreen);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleArrowKeys);
      document.addEventListener('keydown', handleFullScreen);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleArrowKeys);
      document.removeEventListener('keydown', handleFullScreen);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrevious, onNext, onPreviousImage, onNextImage, currentIndex, totalItems, currentImageIndex, totalProjectImages, item?.category, fullScreen]);

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

  const imageMaxHeight = fullScreen 
    ? '100vh'
    : isPortrait === null
      ? `calc(100vh - ${MODAL_MARGIN}px)`
      : isPortrait
        ? `calc(100vh - ${MODAL_MARGIN}px)`
        : `calc(100vh - ${MODAL_MARGIN + CAPTION_HEIGHT}px)`;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black/90 flex items-center justify-center transition-all duration-300 ${
        fullScreen ? 'p-0 overflow-hidden' : 'p-4 overflow-y-auto'
      }`}
      onClick={(e) => {
        // Only close if clicking on the background, not on buttons or content
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-2 bg-white/30 hover:bg-white/50 rounded-full text-gray-800 transition-all duration-200 backdrop-blur-sm"
        style={{ right: fullScreen ? '60px' : '60px' }}
      >
        <X size={24} />
      </button>

      {/* Full Screen Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setFullScreen(!fullScreen);
        }}
        className="absolute top-6 right-6 z-10 p-2 bg-white/30 hover:bg-white/50 rounded-full text-gray-800 transition-all duration-200 backdrop-blur-sm"
        style={{ right: fullScreen ? '6px' : '120px' }}
      >
        {fullScreen ? <Minus size={24} /> : <Square size={24} />}
      </button>

      {/* Previous Button */}
      {showNavigation && canGoPrevious && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/30 hover:bg-white/50 rounded-full text-gray-800 transition-all duration-200 backdrop-blur-sm"
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
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/30 hover:bg-white/50 rounded-full text-gray-800 transition-all duration-200 backdrop-blur-sm"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Modal Content */}
      <div 
        className={`flex flex-col items-center transition-all duration-300 ${
          fullScreen ? 'w-full h-full' : 'max-w-5xl w-full my-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex flex-col items-center ${fullScreen ? 'w-full h-full' : 'w-full'}`}>
          <div className={`relative flex justify-center ${fullScreen ? 'w-full h-full' : 'w-full'}`}>
            <img
              ref={imgRef}
              src={getCurrentImage()}
              alt={item.name}
              onLoad={handleImageLoad}
              className={`transition-all duration-300 ${
                fullScreen 
                  ? 'object-contain w-full h-full' 
                  : 'object-contain rounded-lg shadow-2xl'
              }`}
              style={{
                maxHeight: fullScreen ? '100vh' : imageMaxHeight,
                maxWidth: fullScreen ? '100vw' : '100%',
                width: fullScreen ? '100%' : 'auto',
                height: fullScreen ? '100%' : 'auto',
                display: 'block',
                borderRadius: fullScreen ? '0' : undefined,
                boxShadow: fullScreen ? 'none' : undefined
              }}
            />
            {/* Portrait: Overlay caption */}
            {!fullScreen && imageLoaded && isPortrait && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full max-w-2xl px-2 pointer-events-none">
                <div className="bg-white/30 backdrop-blur-md rounded-b-lg p-2 border-t border-white/10 shadow-xl pointer-events-auto">
                  <h3 className="text-lg font-medium text-white mb-1">
                    {item.name}
                  </h3>
                  {item.category !== 'photographs' && (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* Landscape: Caption below image */}
          {!fullScreen && imageLoaded && isPortrait === false && (
            <div className="w-full max-w-2xl px-2 mt-2">
              <div className="bg-white/30 backdrop-blur-md rounded-lg p-2 border-t border-white/10 shadow-xl">
                <h3 className="text-lg font-medium text-white mb-1">
                  {item.name}
                </h3>
                {item.category !== 'photographs' && (
                  <>
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
                  </>
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


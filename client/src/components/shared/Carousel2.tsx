import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { Icon } from '@iconify/react/dist/iconify.js';

interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel2: React.FC<CarouselProps> = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScrollPosition, setMaxScrollPosition] = useState(0);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      const maxScroll =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      setMaxScrollPosition(maxScroll);
      setShowNextButton(maxScroll > 0);
    }
  }, [children]);

  const handlePrevClick = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.firstElementChild?.clientWidth || 0;
      carouselRef.current.scrollBy({
        left: -itemWidth,
        behavior: 'smooth',
      });
      setScrollPosition(scrollPosition - itemWidth);
      setShowNextButton(true);
      setShowPrevButton(scrollPosition > itemWidth);
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.firstElementChild?.clientWidth || 0;
      carouselRef.current.scrollBy({
        left: itemWidth,
        behavior: 'smooth',
      });
      setScrollPosition(scrollPosition + itemWidth);
      setShowPrevButton(true);
      setShowNextButton(scrollPosition < maxScrollPosition - itemWidth);
    }
  };

  return (
    <div className="relative">
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide w-full py-4"
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className="flex-shrink-0 mr-4">
            {child}
          </div>
        ))}
      </div>
      {showPrevButton && (
        <div className="absolute top-1/2 transform -translate-y-1/2 left-0 hidden lg:flex  bg-gradient-to-l from-transparent to-background-primary/50 h-full w-20 justify-start items-center">

          <Button onClick={handlePrevClick} className='bg-background-primary text-accent w-11 h-11 border flex justify-center items-center rounded-full overflow-hidden -translate-x-1/3' >
            <Icon icon="icon-park-outline:arrow-left" width={24} />
          </Button>
        </div>
      )}
      {showNextButton && (
        <div className="absolute top-1/2 transform -translate-y-1/2 right-0 hidden lg:flex  bg-gradient-to-r from-transparent to-background-primary/50 h-full w-20 justify-end items-center">
          <Button onClick={handleNextClick} className='bg-background-primary text-accent w-11 h-11 border flex justify-center items-center rounded-full overflow-hidden translate-x-1/3' >
            <Icon icon="icon-park-outline:arrow-right" width={24} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Carousel2;

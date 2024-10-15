import React, { useState, useRef, useEffect } from 'react';

type CarouselProps = {
  items: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
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
  }, [items]);

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
        className="flex overflow-x-auto scrollbar-hide w-full"
      >
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0 mr-4">
            {item}
          </div>
        ))}
      </div>
      {showPrevButton && (
        <div className="absolute top-1/2 transform -translate-y-1/2 left-0">
          <button
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none"
            onClick={handlePrevClick}
          >
            <svg
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      )}
      {showNextButton && (
        <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
          <button
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none"
            onClick={handleNextClick}
          >
            <svg
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;

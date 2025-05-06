
// src/components/SlideNavigation.tsx
import React from 'react';
import { cn } from '../../lib/utils';

interface Slide {
  id: string;
  title: string;
  order: number;
}

interface SlideNavigationProps {
  slides: Slide[];
  currentIndex: number;
  onSlideSelect: (index: number) => void;
}

const SlideNavigation: React.FC<SlideNavigationProps> = ({ slides, currentIndex, onSlideSelect }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-medium mb-2">Slides</h3>
      <ul className="space-y-1">
        {slides.map((slide, index) => (
          <li key={slide.id}>
            <button
              onClick={() => onSlideSelect(index)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-sm",
                index === currentIndex
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-100"
              )}
            >
              {index + 1}. {slide.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SlideNavigation;
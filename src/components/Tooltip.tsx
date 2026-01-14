import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  showIcon?: boolean;
}

const Tooltip = ({ content, children, showIcon = true }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && containerRef.current && tooltipRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Vertical position
      const spaceAbove = rect.top;
      const spaceBelow = viewportHeight - rect.bottom;
      
      if (spaceAbove < 200 && spaceBelow > spaceAbove) {
        setPosition('bottom');
      } else {
        setPosition('top');
      }

      // Horizontal position adjustment to keep inside viewport
      let leftOffset = rect.left + rect.width / 2;
      let translateX = -50;

      const halfWidth = tooltipRect.width / 2;
      
      // If going off left
      if (leftOffset - halfWidth < 20) {
        const diff = 20 - (leftOffset - halfWidth);
        translateX = -50 + (diff / tooltipRect.width) * 100;
      } 
      // If going off right
      else if (leftOffset + halfWidth > viewportWidth - 20) {
        const diff = (leftOffset + halfWidth) - (viewportWidth - 20);
        translateX = -50 - (diff / tooltipRect.width) * 100;
      }

      tooltipRef.current.style.transform = `translateX(${translateX}%)`;
      
      // Position the arrow correctly to point at the trigger
      const arrow = tooltipRef.current.querySelector('.tooltip-arrow') as HTMLDivElement;
      if (arrow) {
        // The arrow should be centered relative to the trigger
        // Current tooltip center is at 'leftOffset'
        // Percentage from left of tooltip where the trigger center is
        const arrowLeft = 50 - (translateX + 50);
        arrow.style.left = `${arrowLeft}%`;
      }
    }
  }, [isVisible]);

  return (
    <div 
      ref={containerRef}
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {showIcon && (
        <Info className="w-4 h-4 ml-1 text-gray-400 cursor-help hover:text-blue-500 transition-colors" />
      )}
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-[9999] w-80 max-w-[calc(100vw-40px)] p-4 text-sm bg-gray-900 text-white rounded-lg shadow-2xl leading-relaxed transition-opacity duration-200 ${
            position === 'top' 
              ? 'bottom-full mb-3' 
              : 'top-full mt-3'
          }`}
          style={{ 
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {/* Arrow */}
          <div className={`tooltip-arrow absolute transform rotate-45 w-2 h-2 bg-gray-900 ${
            position === 'top'
              ? 'bottom-[-4px]'
              : 'top-[-4px]'
          }`} 
          style={{ 
            left: '50%',
            marginLeft: '-4px'
          }} />
          <p className="relative z-10">{content}</p>
        </div>
      )}
    </div>
  );
};

export default Tooltip;

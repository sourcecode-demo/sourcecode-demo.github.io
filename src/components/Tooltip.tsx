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
    if (isVisible && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      
      if (spaceAbove < 120 && spaceBelow > spaceAbove) {
        setPosition('bottom');
      } else {
        setPosition('top');
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
          className={`absolute z-50 w-72 p-3 text-sm bg-gray-900 text-white rounded-lg shadow-xl ${
            position === 'top' 
              ? 'bottom-full mb-2' 
              : 'top-full mt-2'
          } left-1/2 transform -translate-x-1/2`}
        >
          <div className={`absolute left-1/2 transform -translate-x-1/2 ${
            position === 'top'
              ? 'bottom-0 translate-y-1/2 rotate-45'
              : 'top-0 -translate-y-1/2 rotate-45'
          } w-2 h-2 bg-gray-900`} />
          <p className="relative z-10">{content}</p>
        </div>
      )}
    </div>
  );
};

export default Tooltip;

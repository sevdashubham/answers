import React, { useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';
import {
  selectedVariableAtom,
} from '@/atoms/variablesAtoms';
import InfoTooltip from "@/ui-lib/InfoTooltip/InfoTooltip";

interface VariableDetailsProps {
  title: string;
  description: string;
}

const VariableDetails: React.FC<VariableDetailsProps> = ({ title, description }) => {
  const selectedVarId = useAtomValue(selectedVariableAtom);
  const containerRef = useRef<HTMLDivElement>(null);

  // This effect handles the entrance animation
  useEffect(() => {
    if (selectedVarId && containerRef.current) {
      // Hide the element initially
      const container = containerRef.current;
      container.style.opacity = '0';
      container.style.transform = 'translateY(16px)';

      // Force reflow
      void container.offsetHeight;

      // Add animation class
      container.classList.add('animate-in');

      // Clean up animation when component unmounts
      return () => {
        container.classList.remove('animate-in');
      };
    }
  }, [selectedVarId]);

  // Define keyframes and animation in a style element
  const animationStyles = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-in {
      animation: fadeInUp 0.35s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
    }
  `;

  if (!selectedVarId) return null;

  return (
    <>
      <style>{animationStyles}</style>
      <div
        ref={containerRef}
        className="text-white relative"
        key={selectedVarId} // Force re-render when selectedVarId changes
      >
        <div className="flex items-center mb-2">
          <h3 className="text-[20px] font-medium pr-3">{title}</h3>
          <InfoTooltip id={title} description={description} icon={'info'}/>
        </div>

        <div className="flex items-start mt-1 mb-2">
          <p className="text-[#BBBBBB] text-[15px]">{description}</p>
        </div>
      </div>
    </>
  );
};

export default VariableDetails;

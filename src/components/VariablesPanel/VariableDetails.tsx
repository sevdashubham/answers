import React, { useState, useEffect, useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { 
  selectedVariableAtom,
  variablesDataAtom,
  updateVariableSectionAtom
} from '@/atoms/variablesAtoms';
import VariableContextMenu from './VariableContextMenu';

interface VariableDetailsProps {
  title: string;
  description: string;
}

const VariableDetails: React.FC<VariableDetailsProps> = ({ title, description }) => {
  const selectedVarId = useAtomValue(selectedVariableAtom);
  const variablesData = useAtomValue(variablesDataAtom);
  const updateVariableSection = useSetAtom(updateVariableSectionAtom);
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
  
  // Check if variable is already in a section
  const isPrimary = variablesData.primaryVariables.includes(selectedVarId);
  const isSecondary = variablesData.secondaryVariables.includes(selectedVarId);
  

  
  return (
    <>
      <style>{animationStyles}</style>
      <div 
        ref={containerRef}
        className="text-white relative"
        key={selectedVarId} // Force re-render when selectedVarId changes
      >
        <div className="flex items-center mb-2">
          <h3 className="text-lg font-medium">{title}</h3>
          <div className="flex ml-2">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75 5.25H8.25V3.75H6.75M7.5 13.5C4.1925 13.5 1.5 10.8075 1.5 7.5C1.5 4.1925 4.1925 1.5 7.5 1.5C10.8075 1.5 13.5 4.1925 13.5 7.5C13.5 10.8075 10.8075 13.5 7.5 13.5ZM7.5 0C6.51509 0 5.53982 0.193993 4.62987 0.570904C3.71993 0.947814 2.89314 1.50026 2.1967 2.1967C0.790176 3.60322 0 5.51088 0 7.5C0 9.48912 0.790176 11.3968 2.1967 12.8033C2.89314 13.4997 3.71993 14.0522 4.62987 14.4291C5.53982 14.806 6.51509 15 7.5 15C9.48912 15 11.3968 14.2098 12.8033 12.8033C14.2098 11.3968 15 9.48912 15 7.5C15 6.51509 14.806 5.53982 14.4291 4.62987C14.0522 3.71993 13.4997 2.89314 12.8033 2.1967C12.1069 1.50026 11.2801 0.947814 10.3701 0.570904C9.46018 0.193993 8.48491 0 7.5 0ZM6.75 11.25H8.25V6.75H6.75V11.25Z" fill="white"/>
</svg>


          </div>
        </div>
        
        
        <div className="flex items-start mt-1 mb-2">
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
        
        {/* <div className="mt-4 flex gap-2">
          {!isPrimary && (
            <button
              className="px-3 py-1 text-sm rounded-md bg-gray-700 hover:bg-gray-600 text-white"
              onClick={() => updateVariableSection({ variableId: selectedVarId, section: 'primary' })}
            >
              Add to Primary Variables
            </button>
          )}
          
          {!isSecondary && (
            <button
              className="px-3 py-1 text-sm rounded-md bg-gray-700 hover:bg-gray-600 text-white"
              onClick={() => updateVariableSection({ variableId: selectedVarId, section: 'secondary' })}
            >
              Add to Secondary Variables
            </button>
          )}
          
          {(isPrimary || isSecondary) && (
            <button
              className="px-3 py-1 text-sm rounded-md bg-gray-700 hover:bg-gray-600 text-red-400"
              onClick={() => updateVariableSection({ variableId: selectedVarId, section: null })}
            >
              Remove from {isPrimary ? 'Primary' : 'Secondary'} Variables
            </button>
          )}
        </div> */}
      </div>
    </>
  );
};

export default VariableDetails;
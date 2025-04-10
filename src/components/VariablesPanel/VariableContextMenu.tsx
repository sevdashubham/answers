import React, { useState, useRef, useEffect } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { 
  variablesDataAtom, 
  updateVariableSectionAtom,
  selectedVariableAtom
} from '@/atoms/variablesAtoms';

interface VariableContextMenuProps {
  variableId: string;
  onClose: () => void;
}

const VariableContextMenu: React.FC<VariableContextMenuProps> = ({ 
  variableId, 
  onClose 
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const updateVariableSection = useSetAtom(updateVariableSectionAtom);
  const variablesData = useAtomValue(variablesDataAtom);
  
  // Check if variable is already in a section
  const isPrimary = variablesData.primaryVariables.includes(variableId);
  const isSecondary = variablesData.secondaryVariables.includes(variableId);
  
  // Handle click outside to close the menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  const handleAddToPrimary = () => {
    updateVariableSection({ variableId, section: 'primary' });
    onClose();
  };
  
  const handleAddToSecondary = () => {
    updateVariableSection({ variableId, section: 'secondary' });
    onClose();
  };
  
  const handleRemoveFromSections = () => {
    updateVariableSection({ variableId, section: null });
    onClose();
  };
  
  return (
    <div 
      ref={menuRef}
      className="absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5"
    >
      <div className="py-1" role="menu" aria-orientation="vertical">
        <button
          className={`w-full text-left block px-4 py-2 text-sm ${isPrimary ? 'text-green-400' : 'text-white'} hover:bg-gray-600`}
          onClick={handleAddToPrimary}
          disabled={isPrimary}
        >
          {isPrimary ? '✓ Primary Variable' : 'Add to Primary Variables'}
        </button>
        <button
          className={`w-full text-left block px-4 py-2 text-sm ${isSecondary ? 'text-green-400' : 'text-white'} hover:bg-gray-600`}
          onClick={handleAddToSecondary}
          disabled={isSecondary}
        >
          {isSecondary ? '✓ Secondary Variable' : 'Add to Secondary Variables'}
        </button>
        {(isPrimary || isSecondary) && (
          <button
            className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-gray-600"
            onClick={handleRemoveFromSections}
          >
            Remove from sections
          </button>
        )}
      </div>
    </div>
  );
};

export default VariableContextMenu;
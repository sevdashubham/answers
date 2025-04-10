//src/atoms/variablesAtoms.ts
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { mockVariablesData } from '@/data/mockData';
import type { VariableData, Variable } from '@/data/mockData';

// Base atoms
export const variablesDataAtom = atom<VariableData>(mockVariablesData);
export const searchTermAtom = atom<string>('');
export const selectedVariableAtom = atom<string | null>(null);

// Derived atoms for filtered variables
export const filteredVariablesAtom = atom((get) => {
  const data = get(variablesDataAtom);
  const searchTerm = get(searchTermAtom).toLowerCase();
  
  if (!searchTerm) return data;
  
  return {
    ...data,
    categories: data.categories.map(category => ({
      ...category,
      variables: category.variables.filter(variable => 
        variable.name.toLowerCase().includes(searchTerm)
      )
    })).filter(category => category.variables.length > 0)
  };
});

// Atom for the selected variable's data
export const selectedVariableDataAtom = atom((get) => {
  const variablesData = get(variablesDataAtom);
  const selectedVarId = get(selectedVariableAtom);
  
  if (!selectedVarId) return null;
  
  for (const category of variablesData.categories) {
    const found = category.variables.find(v => v.id === selectedVarId);
    if (found) return found;
  }
  
  return null;
});

// Action atoms to modify variables state
export const toggleVariableSelectionAtom = atom(
  null,
  (get, set, variableId: string) => {
    const variablesData = get(variablesDataAtom);
    
    const updatedCategories = variablesData.categories.map(category => {
      const updatedVariables = category.variables.map(variable => {
        if (variable.id === variableId) {
          return { ...variable, selected: !variable.selected };
        }
        return variable;
      });
      
      return { ...category, variables: updatedVariables };
    });
    
    set(variablesDataAtom, {
      ...variablesData,
      categories: updatedCategories
    });
  }
);

// Atom for whether a variable should be displayed in the Primary or Secondary section
export const updateVariableSectionAtom = atom(
  null,
  (get, set, params: { variableId: string, section: 'primary' | 'secondary' | null }) => {
    const { variableId, section } = params;
    const variablesData = get(variablesDataAtom);
    
    const newPrimaryVars = section === 'primary' 
      ? [...variablesData.primaryVariables, variableId]
      : variablesData.primaryVariables.filter(id => id !== variableId);
      
    const newSecondaryVars = section === 'secondary'
      ? [...variablesData.secondaryVariables, variableId]
      : variablesData.secondaryVariables.filter(id => id !== variableId);
      
    set(variablesDataAtom, {
      ...variablesData,
      primaryVariables: newPrimaryVars,
      secondaryVariables: newSecondaryVars
    });
  }
);
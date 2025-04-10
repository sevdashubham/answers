import React, { ReactNode } from 'react';

interface VariableCategoryProps {
  title: string;
  children: ReactNode;
}

const VariableCategory: React.FC<VariableCategoryProps> = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-300 mb-3">{title}</h3>
      {children}
    </div>
  );
};

export default VariableCategory;

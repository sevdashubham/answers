import React from 'react';
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { DataPoint } from '@/types';

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ 
  active, 
  payload 
}) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0]!.payload as DataPoint;
  const value = data.value;
  const isPeak = value === Math.max(...payload.map(p => (p.payload as DataPoint).value));
  
  return (
    <div className="bg-gray-900 text-white p-2 rounded shadow-lg text-center">
      <div className="text-lg font-bold">${(value / 1000).toFixed(2)}K</div>
      <div className="text-sm flex items-center justify-center">
        <span className="text-green-500 mr-1">▲</span>
        4.6% above target
      </div>
      <div className="text-xs text-gray-400">Click for details</div>
    </div>
  );
};

export default CustomTooltip;
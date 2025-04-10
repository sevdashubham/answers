import React from 'react';
import { DataPoint } from '@/types';

interface CustomActiveDotProps {
  cx: number;
  cy: number;
  value: number;
  payload: DataPoint;
  data: DataPoint[];
}
    
const CustomActiveDot: React.FC<CustomActiveDotProps> = ({
  cx,
  cy,
  payload,
  data
}) => {
  const isPeak = payload.value === Math.max(...data.map(item => item.value));
  
  return (
    <circle 
      cx={cx} 
      cy={cy} 
      r={isPeak ? 6 : 4} 
      fill="#C8E972" 
      filter={isPeak ? "url(#glow)" : undefined}
    />
  );
};

export default CustomActiveDot;
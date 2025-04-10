import React from 'react';
import { Rectangle, ReferenceArea } from 'recharts';

interface DataPoint {
    month: string;
    value: number;
  }
  
interface CurrentMonthReferenceProps {
  data: DataPoint[];
  currentMonth: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Component to render the current month reference line
 * This is a customization for the ReferenceLine in Recharts
 */
const CurrentMonthReference: React.FC<CurrentMonthReferenceProps> = ({
  x,
  y,
  width,
  height,
  currentMonth,
  data
}) => {
  // Get index of current month for positioning
  const currentMonthIndex = data.findIndex(item => item.month === currentMonth);
  
  // If current month not found in data, don't render
  if (currentMonthIndex === -1) return null;
  
  // Calculate position based on data point index
  const segmentWidth = width / (data.length - 1);
  const xPos = x + currentMonthIndex * segmentWidth;
  
  return (
    <line
      x1={xPos}
      y1={y}
      x2={xPos}
      y2={y + height}
      stroke="#FBBF24"
      strokeWidth={1}
      strokeDasharray="4 4"
      strokeOpacity={0.8}
      filter="drop-shadow(0 0 2px #FFFF00)"
    />
  );
};

export default CurrentMonthReference;
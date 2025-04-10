import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { DataPoint } from '@/types';
import CustomTooltip from './CustomTooltip';

interface LineChartProps {
  data: DataPoint[];
  currentMonth: string;
  chartMetric?: string;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  currentMonth, 
  chartMetric = "Unsatisfied Demand %" 
}) => {
  // Find the peak value for special styling
  const peakValue = Math.max(...data.map(item => item.value));
  const peakMonth = data.find(item => item.value === peakValue)?.month;
  
  // Ensure we only display 7 months at a time
  const displayData = data.slice(0, 7);
  
  return (
    <div className="bg-gray-900 rounded-xl p-6 w-full">
      {/* Header with dropdown */}
      <div className="flex justify-end mb-2">
        <button className="bg-gray-700 text-white px-3 py-1 rounded-md flex items-center">
          {chartMetric}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Chart container with fixed height to ensure nothing is cut off */}
      <div className="h-96 relative w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={displayData}
            margin={{ top: 20, right: 30, left: 50, bottom: 30 }}
          >
            {/* Custom cartesian grid with many vertical lines */}
            <CartesianGrid 
              horizontal={true} 
              vertical={true}
              verticalCoordinatesGenerator={(props) => {
                // Generate many vertical lines
                const { width } = props;
                const numLines = 80; // Increase number of vertical lines
                const lineSpacing = width / numLines;
                
                // Return x-coordinates for vertical lines
                return Array.from({ length: numLines + 1 }, (_, i) => i * lineSpacing);
              }}
              strokeDasharray="1 3" 
              stroke="#333"
              strokeOpacity={0.5}
              horizontalCoordinatesGenerator={(props) => {
                // Generate 5 horizontal lines at equal intervals
                const { height } = props;
                return [0, height * 0.2, height * 0.4, height * 0.6, height * 0.8, height];
              }}
            />
            
            {/* X-axis with custom styling */}
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={(props) => {
                const { x, y, payload } = props;
                const isCurrentMonth = payload.value === currentMonth;
                
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text x={0} y={0} dy={16} textAnchor="middle" fill="#9CA3AF">
                      {payload.value}
                    </text>
                    {isCurrentMonth && (
                      <text x={0} y={16} dy={16} textAnchor="middle" fontSize={12} fill="#FBBF24">
                        Now
                      </text>
                    )}
                  </g>
                );
              }}
            />
            
            {/* Y-axis with equal gap currency formatting */}
            <YAxis 
              ticks={[0, 20000, 40000, 60000, 80000, 100000]}
              tickFormatter={(value) => `$${value/1000}K`}
              domain={[0, 100000]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF' }}
              width={50}
            />
            
            {/* Custom tooltip */}
            <Tooltip 
              content={<CustomTooltip />}
              cursor={false}
            />
            
            {/* Reference lines for data points - light gray for regular points */}
            {displayData.map((point) => (
              <ReferenceLine 
                key={`ref-${point.month}`}
                x={point.month} 
                stroke="#555"
                strokeDasharray="3 3"
                strokeWidth={1}
                opacity={0.5}
                ifOverflow="extendDomain"
              />
            ))}
            
            {/* Special reference line for peak point - same color as the line chart */}
            {peakMonth && (
              <ReferenceLine 
                x={peakMonth} 
                stroke="#C8E972"
                strokeDasharray="5 5"
                strokeWidth={1.5}
                opacity={0.8}
                ifOverflow="extendDomain"
              />
            )}
            
            {/* Straight line chart */}
            <Line 
              type="linear"
              dataKey="value" 
              stroke="#C8E972" 
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props;
                
                // Check if this is the peak point
                const isPeak = payload.value === peakValue;
                
                return (
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r={isPeak ? 6 : 4} 
                    fill="#C8E972" 
                    filter={isPeak ? "url(#glow)" : undefined}
                  />
                );
              }}
              activeDot={{ r: 6, fill: "#C8E972" }}
              connectNulls={true}
            />
            
            {/* Filter for glow effect on peak point */}
            <defs>
              <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
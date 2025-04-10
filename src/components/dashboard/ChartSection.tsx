import React from 'react';
import LineChart from '@/components/LineChart';
import { useAtomValue } from 'jotai';
import { chartDataAtom, currentMonthAtom } from '@/atoms/dashboardAtoms';

/**
 * Component that renders the chart section
 */
const ChartSection: React.FC = () => {
  // Get data from Jotai atoms
  const chartData = useAtomValue(chartDataAtom);
  const currentMonth = useAtomValue(currentMonthAtom);

  return (
    <div className="w-full">
      <div className="flex mb-6">
        <h2 className="text-2xl font-semibold">Graphs</h2>
      </div>
      <LineChart
        data={chartData}
        currentMonth={currentMonth}
      />
    </div>
  );
};

export default ChartSection;

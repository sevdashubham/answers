import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { chartMetricAtom } from '@/atoms/dashboardAtoms';

/**
 * Form for editing dashboard variables
 */
const VariableEditorForm: React.FC = () => {
  const [chartMetric, setChartMetric] = useAtom(chartMetricAtom);
  const [stations, setStations] = useState<number>(11);
  const [poles, setPoles] = useState<number>(48);
  
  const metricsOptions = [
    'Unsatisfied Demand %',
    'Profit',
    'Utilization %',
    'Wait Time'
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Chart Metric
        </label>
        <select
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
          value={chartMetric}
          onChange={(e) => setChartMetric(e.target.value)}
        >
          {metricsOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Number of Zones with Charging Stations
        </label>
        <input
          type="range"
          min="1"
          max="20"
          className="w-full bg-gray-700"
          value={stations}
          onChange={(e) => setStations(parseInt(e.target.value))}
        />
        <div className="flex justify-between text-sm text-gray-400 mt-1">
          <span>1</span>
          <span>Current: {stations}</span>
          <span>20</span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Total Number of Poles
        </label>
        <input
          type="range"
          min="10"
          max="100"
          step="2"
          className="w-full bg-gray-700"
          value={poles}
          onChange={(e) => setPoles(parseInt(e.target.value))}
        />
        <div className="flex justify-between text-sm text-gray-400 mt-1">
          <span>10</span>
          <span>Current: {poles}</span>
          <span>100</span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Optimization Target
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="optimizationTarget"
              value="profit"
              defaultChecked
              className="mr-2"
            />
            <span>Profit</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="optimizationTarget"
              value="satisfied_demand"
              className="mr-2"
            />
            <span>Satisfied Demand</span>
          </label>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Advanced Settings
        </label>
        <div className="bg-gray-900 rounded-md p-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Maximum Wait Time (minutes)
            </label>
            <input
              type="number"
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-1 px-3 text-white"
              defaultValue={15}
              min={1}
              max={60}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Infrastructure Cost Coefficient
            </label>
            <input
              type="number"
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-1 px-3 text-white"
              defaultValue={1.0}
              step={0.1}
              min={0.1}
              max={5.0}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Mean Charging Duration (hours)
            </label>
            <input
              type="number"
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-1 px-3 text-white"
              defaultValue={1.5}
              step={0.1}
              min={0.5}
              max={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariableEditorForm;
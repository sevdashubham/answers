//src/atoms/dashboardAtoms.ts
import { atom } from 'jotai';
import { ScenarioResult, KeyIndicator, DataPoint } from '@/types';
import { scenarioResults, keyIndicators, chartData } from '@/data/mockData';

// UI state atoms
export const isVariableEditorOpenAtom = atom<boolean>(false);
export const infoTooltipAtom = atom<string | null>(null);

// Data atoms
export const scenarioResultsAtom = atom<ScenarioResult[]>(scenarioResults);
export const keyIndicatorsAtom = atom<KeyIndicator[]>(keyIndicators);
export const chartDataAtom = atom<DataPoint[]>(chartData);
export const currentMonthAtom = atom<string>('May'); // Current month marker on the chart

// UI state derived atoms
export const chartMetricAtom = atom<string>('Unsatisfied Demand %');
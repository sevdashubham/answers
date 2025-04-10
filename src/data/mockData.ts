import { ScenarioResult, KeyIndicator, DataPoint } from '@/types';

// Mock data for scenario results
export const scenarioResults: ScenarioResult[] = [
  {
    id: '1',
    description: 'The best found configuration based on profit is characterized by 11 zones (max) with charging stations and 48 total number of poles.'
  },
  {
    id: '2',
    description: 'The best found configuration based on satisfied demand is characterized by 11 zones (max) with charging stations and 48 total number of poles.'
  }
];

// Mock data for key performance indicators
export const keyIndicators: KeyIndicator[] = [
  {
    id: '1',
    name: 'Infrastructure Units',
    value: '€421.07',
    description: 'This describes variable two and what the shown data means.'
  },
  {
    id: '2',
    name: 'Charging Growth',
    value: '33.07',
    description: 'This describes variable two and what the shown data means.'
  },
  {
    id: '3',
    name: 'Localization change',
    value: '21.9%',
    description: 'This describes variable two and what the shown data means.'
  },
  {
    id: '4',
    name: 'Fleet growth',
    value: '7.03%',
    description: 'This describes variable two and what the shown data means.'
  }
];

// Mock data for chart
export const chartData: DataPoint[] = [
  { month: 'Apr', value: 40000 },
  { month: 'May', value: 20000 },
  { month: 'Jun', value: 50000 },
  { month: 'Jul', value: 100000 },
  { month: 'Aug', value: 60000 },
  { month: 'Sep', value: 30000 },
  { month: 'Oct', value: 60000 }
];

export interface Variable {
    id: string;
    name: string;
    selected: boolean;
    description: string;
  }
  
  export interface VariableCategory {
    id: string;
    title: string;
    variables: Variable[];
  }
  
  export interface VariableData {
    categories: VariableCategory[];
    primaryVariables: string[];
    secondaryVariables: string[];
  }
  
  // Variable Mock Data
  export const mockVariablesData: VariableData = {
    categories: [
      {
        id: 'category-1',
        title: 'Variable category 1',
        variables: [
          {
            id: 'carbon-1',
            name: 'Carbon 1',
            selected: false,
            description: ''
          },
          {
            id: 'co2-distribution',
            name: 'Co2 Distribution',
            selected: true,
            description: 'But what truly sets Switch apart is its versatility. It can be used as a scooter, a bike, or even a skateboard, making it suitable for people of all ages. Whether you\'re a student, a professional, or a senior citizen, Switch adapts to your needs and lifestyle.'
          },
          {
            id: 'fleet-sizing',
            name: 'Fleet sizing',
            selected: true,
            description: 'Determine the optimal fleet size for your operations based on demand patterns and service level objectives.'
          }
        ]
      },
      {
        id: 'category-2',
        title: 'Variable Category 2',
        variables: [
          {
            id: 'parking-rate',
            name: 'Parking Rate',
            selected: false,
            description: 'The cost per hour for parking vehicles in designated zones.'
          },
          {
            id: 'border-rate',
            name: 'Border Rate',
            selected: true,
            description: 'Fees applied when vehicles cross predefined geographic borders.'
          },
          {
            id: 'request-rate',
            name: 'Request rate',
            selected: true,
            description: 'The frequency of incoming vehicle requests from users.'
          },
          {
            id: 'variable-1-cat2',
            name: 'Variable 1',
            selected: true,
            description: 'Generic variable description.'
          },
          {
            id: 'variable-2-cat2',
            name: 'Variable 1',
            selected: false,
            description: 'Generic variable description.'
          },
          {
            id: 'variable-3-cat2',
            name: 'Variable 1',
            selected: true,
            description: 'Generic variable description.'
          }
        ]
      },
      {
        id: 'category-3',
        title: 'Variable Category 3',
        variables: [
          {
            id: 'variable-1-cat3',
            name: 'Variable 1',
            selected: false,
            description: 'Generic variable description for category 3.'
          },
          {
            id: 'variable-2-cat3',
            name: 'Variable 1',
            selected: true,
            description: 'Generic variable description for category 3.'
          },
          {
            id: 'variable-3-cat3',
            name: 'Variable 1',
            selected: true,
            description: 'Generic variable description for category 3.'
          }
        ]
      }
    ],
    primaryVariables: [
      'co2-distribution',
      'fleet-sizing',
      'border-rate',
      'request-rate'
    ],
    secondaryVariables: [
      'variable-1-cat2',
      'variable-3-cat2',
      'variable-2-cat3',
      'variable-3-cat3'
    ]
  };
  
 
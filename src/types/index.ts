// Data types for the application

export interface ScenarioResult {
    id: string;
    description: string;
  }
  
  export interface KeyIndicator {
    id: string;
    name: string;
    value: string;
    description: string;
    info?: string;
  }
  
  export interface DataPoint {
    month: string;
    value: number;
  }
  
  export interface Variable {
    id: string;
    name: string;
    value: number | string;
    description: string;
  }
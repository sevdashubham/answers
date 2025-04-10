/**
 * Formats a number as currency in $K format
 * @param value The value to format
 * @returns Formatted string with $K suffix
 */
export const formatCurrency = (value: number): string => {
    return `$${(value / 1000).toFixed(0)}K`;
  };
  
  /**
   * Calculates if a month is the current month
   * @param month The month to check
   * @param currentMonth The current month value
   * @returns Boolean indicating if it's the current month
   */
  export const isCurrentMonth = (month: string, currentMonth: string): boolean => {
    return month === currentMonth;
  };
  
  /**
   * Finds the highest value data point
   * @param data Array of data points with value property
   * @returns The data point with the highest value
   */
  export const findPeakValue = <T extends { value: number }>(data: T[]): T => {
    const [first, ...rest] = data;
    if (!first) {
      throw new Error("Cannot find peak value of an empty array.");
    }
    return rest.reduce((max, item) => item.value > max.value ? item : max, first);
  };
  
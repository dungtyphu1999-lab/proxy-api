/**
 * Format a numeric string to Vietnamese currency format
 * @param value - The numeric string to format
 * @returns Formatted currency string (e.g., "100.000 đ")
 */
export const formatCurrency = (value: string): string => {
  // Handle negative numbers properly
  const isNegative = value.startsWith('-');
  const cleanValue = value.replace(/[^\d.]/g, '');

  if (!cleanValue) return '';

  // Convert to number and format with dots
  const number = parseFloat(cleanValue);
  if (isNaN(number)) return '';

  const formatted = Math.abs(number).toLocaleString('vi-VN');
  return (isNegative ? '-' : '') + formatted + ' đ';
};

/**
 * Extract numeric value from formatted currency string
 * @param formattedValue - The formatted currency string
 * @returns Numeric string (e.g., "100000")
 */
export const extractNumericValue = (formattedValue: string): string => {
  const isNegative = formattedValue.includes('-');
  const numericValue = formattedValue.replace(/[^\d.]/g, '');
  return (isNegative ? '-' : '') + numericValue;
};

/**
 * Format currency for display with custom suffix
 * @param value - The numeric string to format
 * @param suffix - Custom suffix (default: " đ")
 * @returns Formatted currency string
 */
export const formatCurrencyWithSuffix = (
  value: string,
  suffix: string = ' đ',
): string => {
  const numericValue = value.replace(/\D/g, '');

  if (!numericValue) return '';

  const number = parseInt(numericValue, 10);
  return number.toLocaleString('vi-VN') + suffix;
};

// NEW FUNCTIONS FOR PRICE INPUT FORMATTING
/**
 * Format number to display with dots as thousand separators (no suffix)
 * @param value - The number value to format
 * @returns Formatted string with dots (e.g., "1.000.000")
 */
export const formatPriceDisplay = (value: number | string): string => {
  if (value === '' || value === null || value === undefined) return '';

  const numValue =
    typeof value === 'string' ? Number(value.replace(/\./g, '')) : value;
  if (isNaN(numValue) || numValue === 0) return '';

  return numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

/**
 * Extract clean numeric value from input string
 * @param value - The input string (e.g., "1.000.000")
 * @returns Clean numeric string (e.g., "1000000")
 */
export const extractPriceValue = (value: string): string => {
  return value.replace(/\./g, '').replace(/[^0-9]/g, '');
};

/**
 * Format input value for price display
 * @param inputValue - Raw input string
 * @returns Formatted currency string
 */
export const formatPriceInput = (inputValue: string): string => {
  const numericValue = extractPriceValue(inputValue);
  if (numericValue === '') return '';
  return formatPriceDisplay(Number(numericValue));
};

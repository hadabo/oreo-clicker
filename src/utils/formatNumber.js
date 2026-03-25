import numeral from 'numeral'

/**
 * Format large numbers for better readability
 * - Under 10,000: Show full number (1,234)
 * - Over 10,000: Use abbreviated format (12.3k, 1.2m, etc.)
 */
export function formatNumber(value) {
  if (value < 10000) {
    return numeral(value).format('0,0')
  }
  return numeral(value).format('0.0a')
}

/**
 * Format decimal numbers (for speed)
 */
export function formatSpeed(value) {
  if (value < 1) {
    return numeral(value).format('0.00')
  }
  if (value < 10000) {
    return numeral(value).format('0,0.0')
  }
  return numeral(value).format('0.0a')
}

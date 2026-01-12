/**
 * Text utility functions for formatting and manipulating strings.
 */

/**
 * Capitalizes the first letter of a string.
 * @param str - The string to capitalize
 * @returns The string with the first letter capitalized
 */
export function capitalise(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

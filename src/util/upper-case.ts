/**
 * Capitalizes the first letter of a given string.
 * @param {string} string - The string to be capitalized.
 * @returns {string} The capitalized string.
 */
export const upperCase = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

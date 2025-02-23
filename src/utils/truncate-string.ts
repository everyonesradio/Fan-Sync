/**
 * Truncates a string to a specified maximum length and appends an ellipsis if truncated.
 * @param {string} str - The string to be truncated.
 * @param {number} maxLength - The maximum length of the string before truncation.
 * @returns {string} The truncated string with an ellipsis if it exceeds the maximum length.
 */

export const truncateString = (str: string, maxLength: number) => {
  if (str.length > maxLength) {
    return `${str.substring(0, maxLength)}...`;
  }
  return str;
};

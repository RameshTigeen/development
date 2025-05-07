export type FormatTypeOptions = 'alpha' | 'numeric' | 'alphanumeric' | 'capitalize' | 'freetype' | 'password' | 'name';

export type FormatOptions = {
  type: FormatTypeOptions;
  include?: string;
};

export default class StringUtils {
  /**
   * Capitalizes the first character of a string.
   * @param str - The string to capitalize.
   * @returns The capitalized string.
   */
  static capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Converts a camelCase string to snake_case.
   * @param str - The camelCase string.
   * @returns The snake_case string.
   */
  static camelCaseToSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  /**
   * Converts camelCase to a readable string.
   * @example camelCaseToReadableString('camelCase') => 'Camel Case'
   * @param str - The camelCase string.
   * @returns The readable string.
   */
  static camelCaseToReadableString(str: string): string {
    if (!str) return '';
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(' ')
      .map(item => item.charAt(0).toUpperCase() + item.slice(1))
      .join(' ');
  }

  /**
   * Truncates a string to the specified length and appends '...' if truncated.
   * @param str - The string to truncate.
   * @param length - The maximum length of the truncated string.
   * @returns The truncated string.
   */
  static truncate(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
  }

  /**
   * Checks if a string is a palindrome.
   * @param str - The string to check.
   * @returns True if the string is a palindrome, false otherwise.
   */
  static isPalindrome(str: string): boolean {
    const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleaned === cleaned.split('').reverse().join('');
  }

  /**
   * Counts the occurrences of a substring within a string.
   * @param str - The string to search.
   * @param substring - The substring to count.
   * @returns The count of substring occurrences.
   */
  static countOccurrences(str: string, substring: string): number {
    if (!substring) return 0;
    return (str.match(new RegExp(substring, 'g')) || []).length;
  }

  /**
   * Converts a string to kebab-case.
   * @param str - The string to convert.
   * @returns The kebab-case string.
   */
  static toKebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  /**
   * Reverses the given string.
   * @param str - The string to reverse.
   * @returns The reversed string.
   */
  static reverse(str: string): string {
    return str.split('').reverse().join('');
  }

  static stringToMobileNumber(numericText: string): string {
    // const numericText = text.replace(/\D/g, '');
    let formatted = numericText;
    if (numericText.length > 3) {
      formatted = `(${numericText.slice(0, 3)}) ${numericText.slice(3)}`;
    }
    if (numericText.length > 6) {
      formatted = `(${numericText.slice(0, 3)}) ${numericText.slice(3, 6)}-${numericText.slice(6)}`;
    }
    if (numericText.length > 10) {
      formatted = `(${numericText.slice(0, 3)}) ${numericText.slice(3, 6)}-${numericText.slice(
        6,
        10,
      )}-${numericText.slice(10)}`;
    }
    return formatted;
  }
  static removeSpaceFromString(text: string): string {
    return text.replace(/\s+/g, ' ');
  }

  static stringToConvertFormat(text: string, format?: FormatOptions): string {
    const {type, include} = {
      type: '',
      include: '',
      ...(format ?? {}),
    };

    let processedText = this.removeSpaceFromString(text);

    switch (type as FormatTypeOptions) {
      case 'alpha':
        processedText = processedText.replace(new RegExp(`[^a-zA-Z\\s${include}]`, 'g'), '');
        break;
      case 'numeric':
        processedText = processedText.replace(new RegExp(`[^0-9\\s${include}]`, 'g'), '');
        break;
      case 'alphanumeric':
        processedText = processedText.replace(new RegExp(`[^a-zA-Z0-9\\s${include}]`, 'g'), '');
        break;
      case 'capitalize':
        processedText = processedText
          .replace(new RegExp(`[^a-zA-Z\\s${include}]`, 'g'), '')
          .replace(/\b\w/g, char => char.toUpperCase());
        break;
      case 'password':
        processedText = text.replace(/\s/g, '');
        break;

      case 'name':
        // const currency = '֏ƒ₼$₾лвد.ب₤₹﷼₪₮₼$₣₩$₽₱₤₪$₸¢€£$';
        // processedText = processedText.replace(/[0-9"{}<>}][][\]()$֏ƒ₼₾лвدب₤₹﷼₪₮₼₣₩₽₱₤₪₸¢€£¥]/g, '');
        processedText = processedText.replace(/[0-9(){}\[\]<>€£¥₹₽¢$₩₦₱₪฿ƒ₴₭₮₤]/g, '');
        break;
      default:
        // processedText = this.removeSpaceFromString(processedText);
        break;
    }
    console.log(processedText, type, include);
    return processedText;
  }

  static stringToPrice(text: string | number, separator?: string) {
    const sanitized = String(text).replace(/[^0-9.]/g, '');
    const [integerPart, decimalPart] = sanitized.split('.');

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator ?? ',');

    return decimalPart !== undefined ? `${formattedInteger}.${decimalPart.slice(0, 2)}` : formattedInteger;
  }
}

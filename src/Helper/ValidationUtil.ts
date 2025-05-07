export class ValidationUtils {
  /**
   * Validates if a string is a valid email address.
   * @param email - The email address to validate.
   * @returns True if the email is valid, otherwise false.
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validates if a string is a valid phone number (generic international format).
   * @param phoneNumber - The phone number to validate.
   * @returns True if the phone number is valid, otherwise false.
   */
  static isValidPhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  }

  /**
   * Validates if a string is a valid URL.
   * @param url - The URL to validate.
   * @returns True if the URL is valid, otherwise false.
   */
  static isValidUrl(url: string): boolean {
    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*(\?.*)?(#.*)?$/;
    return urlRegex.test(url);
  }

  /**
   * Checks if a string contains only numeric characters.
   * @param value - The string to check.
   * @returns True if the string is numeric, otherwise false.
   */
  static isNumeric(value: string): boolean {
    return /^[0-9]+$/.test(value);
  }

  /**
   * Checks if a string contains only alphanumeric characters.
   * @param value - The string to check.
   * @returns True if the string is alphanumeric, otherwise false.
   */
  static isAlphanumeric(value: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(value);
  }

  /**
   * Checks if a string has a specific length.
   * @param value - The string to check.
   * @param length - The required length.
   * @returns True if the string matches the length, otherwise false.
   */
  static hasLength(value: string, length: number): boolean {
    return value.length === length;
  }

  /**
   * Checks if a string is within a specified length range.
   * @param value - The string to check.
   * @param minLength - The minimum length.
   * @param maxLength - The maximum length.
   * @returns True if the string is within the length range, otherwise false.
   */
  static isLengthInRange(value: string, minLength: number, maxLength: number): boolean {
    return value.length >= minLength && value.length <= maxLength;
  }

  /**
   * Validates if a string contains only alphabetic characters.
   * @param value - The string to validate.
   * @returns True if the string is alphabetic, otherwise false.
   */
  static isAlphabetic(value: string): boolean {
    return /^[a-zA-Z]+$/.test(value);
  }

  /**
   * Validates if a password meets complexity requirements.
   * @param password - The password to validate.
   * @param options - Complexity options (minimum length, uppercase, lowercase, digits, special characters).
   * @returns True if the password meets the requirements, otherwise false.
   */
  static isValidPassword(
    password: string,
    options: {
      minLength?: number;
      uppercase?: boolean;
      lowercase?: boolean;
      digits?: boolean;
      specialChars?: boolean;
    } = {},
  ): boolean {
    const {minLength = 8, uppercase = true, lowercase = true, digits = true, specialChars = true} = options;

    const lengthCheck = password.length >= minLength;
    const uppercaseCheck = !uppercase || /[A-Z]/.test(password);
    const lowercaseCheck = !lowercase || /[a-z]/.test(password);
    const digitsCheck = !digits || /\d/.test(password);
    const specialCharsCheck = !specialChars || /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return lengthCheck && uppercaseCheck && lowercaseCheck && digitsCheck && specialCharsCheck;
  }

  /**
   * Checks if a value is null or undefined.
   * @param value - The value to check.
   * @returns True if the value is null or undefined, otherwise false.
   */
  static isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  /**
   * Checks if a value is empty (null, undefined, empty string, or empty array/object).
   * @param value - The value to check.
   * @returns True if the value is empty, otherwise false.
   */
  static isEmpty(value: any): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === 'object' && Object.keys(value).length === 0) return true;
    return false;
  }

  /**
   * Validates if a string is a valid ISO date format.
   * @param value - The string to validate.
   * @returns True if the string is a valid ISO date, otherwise false.
   */
  static isValidISODate(value: string): boolean {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[\+\-]\d{2}:\d{2})?$/;
    return isoDateRegex.test(value);
  }

  static IsValidData(data: any): boolean {
    if (data === null) {
      return false;
    }
    if (data === undefined) {
      return false;
    }
    if (Array.isArray(data)) {
      return data.length > 0;
    }
    if (typeof data === 'boolean') {
      return Boolean(data).valueOf();
    }
    if (typeof data === 'object') {
      return Object.keys(data ?? {}).length > 0;
    }
    if (typeof data === 'string') {
      return data !== '';
    }
    return true;
  }

  static IsValidEmail(email: string): boolean {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static IsValidPassword(password: string, length?: number): boolean {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);

    return password.length >= (length || 8) && hasUppercase && hasLowercase && hasDigit;
  }

  static IsObjectEqual<T>(obj1: any, obj2: any): boolean {
    // Check if both arguments are objects and not null
    if (typeof obj1 === 'object' && obj1 !== null && typeof obj2 === 'object' && obj2 !== null) {
      // Get the keys of both objects
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      // If the number of keys is different, objects are not equal
      if (keys1.length !== keys2.length) {
        return false;
      }

      // Check if all keys and their values are equal
      for (const key of keys1) {
        if (!keys2.includes(key)) {
          return false;
        } else {
          return obj1[key] == obj2[key];
        }
      }

      // All keys and values are equal
      return true;
    } else {
      // Primitive values are compared directly
      return obj1 === obj2;
    }
  }

  static IsValuesAreSameObjects = <T>(fields: T, changedfields: T): boolean => {
    if (typeof fields !== typeof changedfields) return false;

    switch (typeof fields) {
      case 'number':
      case 'boolean':
      case 'string':
        return fields === changedfields;

      case 'object':
        if (fields === null || changedfields === null) return false;
        if (fields === undefined || changedfields === undefined) return false;

        if (Array.isArray(fields) && Array.isArray(changedfields)) {
          if (fields.length !== changedfields.length) return false;
          return fields.join() === changedfields.join();
        }

        const keysA = Object.keys(fields as object);
        const keysB = Object.keys(changedfields as object);
        if (keysA.length !== keysB.length) return false;

        return keysA.every(key => this.IsValuesAreSame(fields[key as keyof T], changedfields[key as keyof T]));

      default:
        return false;
    }
  };

  static IsValuesAreSame<T>(fields: T, changedfields: T): boolean {
    if (fields === changedfields) return true;

    if (typeof fields !== typeof changedfields) {
      return false;
    }

    if (fields === null || changedfields === null) {
      if (fields !== changedfields) {
        return false;
      }
      return fields == changedfields;
    }
    if (fields === undefined || changedfields === undefined) {
      if (fields !== changedfields) {
        return false;
      }
      return fields == changedfields;
    }

    if (typeof fields === 'object') {
      if (Array.isArray(fields) && Array.isArray(changedfields)) {
        if (fields.length !== changedfields.length) {
          return false;
        }
        return fields.every((item, index) => this.IsValuesAreSame(item, changedfields[index]));
      }

      const keysA = Object.keys(fields);
      const keysB = Object.keys(changedfields);
      if (keysA.length !== keysB.length) {
        return false;
      }

      return keysA.every(key => this.IsValuesAreSame(fields[key as keyof T], changedfields[key as keyof T]));
    }

    if (fields != changedfields) {
      return false;
    }

    return fields == changedfields;
  }

  /**
   * This version check includes Patch update also
   * 1.1.1 (major) . (minor) . (patch) upgrade
   */
  static IsVersionAreSameWithPatchUpdateCheck(currentVersionValue: string, upgradeVersionValue: string): boolean {
    if (!upgradeVersionValue || !currentVersionValue) return false;

    const result = currentVersionValue.localeCompare(upgradeVersionValue, undefined, {
      numeric: true,
      sensitivity: 'base',
    });

    return result < 0;
  }

  /**
   * Clubado always don't consider the patch updates so we use this to handle the App version upgrades
   */
  static IsVersionAreSame(currentVersionValue: string, upgradeVersionValue: string): boolean {
    if (!upgradeVersionValue || !currentVersionValue) return false;

    const currentVersion =
      currentVersionValue.split('.').length >= 3
        ? currentVersionValue.split('.').slice(0, -1).join('.')
        : currentVersionValue;
    const upgradeVersion =
      upgradeVersionValue.split('.').length >= 3
        ? upgradeVersionValue.split('.').slice(0, -1).join('.')
        : upgradeVersionValue;

    const result = currentVersion.localeCompare(upgradeVersion, undefined, {numeric: true, sensitivity: 'base'});

    return result < 0;
  }
}

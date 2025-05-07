import React from 'react';

import StringUtils from '../../Helper/StringUtil';

import type {FormHookProps, FieldError, Rule} from '../../types/Hook/useForm';

export default function useForm<T extends Record<string, any>>({
  rules,
  initialFields,
  initialFocusField,
  OnSubmit,
  ruleErrors,
}: FormHookProps<T>) {
  const InitializeErrors = (fields: T): FieldError<T> => {
    return Object.keys(fields).reduce((acc, key) => {
      acc[key as keyof T] = null;
      return acc;
    }, {} as FieldError<T>);
  };

  // State Declaration

  const [fields, setFields] = React.useState(initialFields);
  const [errors, setErrors] = React.useState(InitializeErrors(initialFields));

  const fieldRefs = Object.keys(initialFields).reduce(
    (refs, key) => {
      refs[key] = React.createRef();
      return refs;
    },
    {} as Record<string, React.RefObject<any>>,
  );

  const HandleFocusInput = (key: string) => {
    fieldRefs[key]?.current?.blur();
    setTimeout(() => {
      fieldRefs[key]?.current?.focus();
    }, 100);
  };

  /**
   * Handles changes in the form fields.
   *
   * @template T - The type of the form data (e.g., a form model interface).
   * @param {keyof T} key - The field name (key) in the form data.
   * @param {any} value - The new value of the field.
   */
  const HandleFieldChange = (key: keyof T, value: any) => {
    setFields(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * Description placeholder
   *
   * @param {?Partial<T>} [partialFields]  #Optional that represents as the form field if want to update the state of form hook
   */

  const HandleSubmit = (partialFields?: Partial<T>) => {
    const Validator = new RuleValidator();
    const fieldsValidationArr: any = {};
    const updatedFields = {
      ...fields,
      ...(partialFields ?? {}),
    };

    setFields(updatedFields);

    Object.keys(updatedFields).forEach(field => {
      if (rules?.[field]) {
        for (const rule of rules?.[field] ?? []) {
          const result = Validator.Validate(field, rule, updatedFields[field], updatedFields, ruleErrors);

          fieldsValidationArr[field] = result.isValid;

          setErrors((prevErrors: any) => ({
            ...prevErrors,
            [field]: result.message,
          }));

          setFields(prev => ({
            ...prev,
            [field]: typeof updatedFields[field] == 'string' ? updatedFields[field].trim() : updatedFields[field],
          }));

          if (!result.isValid) {
            break;
          }
        }
      } else {
        fieldsValidationArr[field] = true;
      }
    });

    const isValid = Object.keys(fieldsValidationArr).every(key => !!fieldsValidationArr[key]);

    if (isValid) OnSubmit();
  };

  React.useEffect(() => {
    if (initialFocusField) {
      HandleFocusInput(initialFocusField);
    }
  }, []);

  return {
    fields,
    errors,
    setFields,
    fieldRefs,
    HandleSubmit,
    HandleFocusInput,
    HandleFieldChange,
  };
}

class RuleValidator<T> {
  Required(field: string, value: any, errorMessage?: any) {
    if (typeof value === 'string') {
      const isValid = value.length > 0;
      return {
        isValid: isValid,
        message: isValid
          ? null
          : errorMessage?.required
            ? errorMessage?.required
            : `${StringUtils.camelCaseToReadableString(field)} is required`,
      };
    }
    if (Array.isArray(value)) {
      const isValid = value.length > 0;
      return {
        isValid: isValid,
        message: isValid
          ? null
          : errorMessage?.required
            ? errorMessage?.required
            : `${StringUtils.camelCaseToReadableString(field)} is required`,
      };
    }
    if (typeof value === 'object') {
      const isValid = Object.keys(value).length > 0;
      return {
        isValid: isValid,
        message: isValid
          ? null
          : errorMessage?.required
            ? errorMessage?.required
            : `${StringUtils.camelCaseToReadableString(field)} is required`,
      };
    }
    if (value) {
      const isValid = value ? true : false;
      return {
        isValid: isValid,
        message: isValid
          ? null
          : errorMessage?.required
            ? errorMessage?.required
            : `${StringUtils.camelCaseToReadableString(field)} is required`,
      };
    }
    return {
      isValid: false,
      message: errorMessage?.required
        ? errorMessage?.required
        : `${StringUtils.camelCaseToReadableString(field)} is required`,
    };
  }

  Min(field: string, limit: number, value: number, errorMessage?: any) {
    const isValid = value.toString().length >= limit;
    return {
      isValid: isValid,
      message: isValid
        ? null
        : errorMessage?.min
          ? errorMessage?.min
          : `The ${StringUtils.camelCaseToReadableString(field)} must be atleast ${limit} characters`,
    };
  }

  Exact(field: string, limit: number, value: number, errorMessage: any) {
    const isValid = value.toString().length === limit;
    return {
      isValid: isValid,
      message: isValid ? null : `The ${StringUtils.camelCaseToReadableString(field)} should have ${limit} characters`,
    };
  }

  Max(field: string, limit: number, value: number, errorMessage: any) {
    const isValid = value.toString().length <= limit;
    return {
      isValid: isValid,
      message: isValid ? null : `The ${StringUtils.camelCaseToReadableString(field)} cannot exceed ${limit} characters`,
    };
  }

  Match(field: string, pair: string, value: any, fields: any, errorMessage: any) {
    const isPasswordMatch = fields[pair] === value;
    return {
      isValid: isPasswordMatch,
      message: isPasswordMatch
        ? null
        : `The ${StringUtils.camelCaseToReadableString(field)} doesn't match ${String(pair)}`,
    };
  }

  Email(data: string, errorMessage: any) {
    const isValid = /\S+@\S+\.\S+/.test(data);
    return {
      isValid: isValid,
      message: isValid ? null : errorMessage?.email ? errorMessage?.email : `The Email is not valid`,
    };
  }

  Validate(field: string, rule: Rule, value: any, fields: any, customErrors?: any) {
    if (typeof rule === 'string') {
      if (rule === 'required') {
        return this.Required(field, value, customErrors?.[field]);
      }
      if (rule === 'email') {
        return this.Email(value, customErrors?.[field]);
      }
    }
    if (typeof rule === 'object') {
      if ('max' in rule) {
        return this.Max(field, rule.max, value, customErrors?.[field]);
      }
      if ('min' in rule) {
        return this.Min(field, rule.min, value, customErrors?.[field]);
      }
      if ('exact' in rule) {
        return this.Exact(field, rule.exact, value, customErrors?.[field]);
      }
      if ('match' in rule) {
        return this.Match(field, rule.match, value, fields, customErrors?.[field]);
      }
    }
    return {
      isValid: true,
      message: null,
    };
  }
}

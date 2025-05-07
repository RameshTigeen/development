export type FieldError<T> = {
  [K in keyof T]: string | null;
};

export type Rule = 'required' | 'email' | {min: number} | {match: string} | {max: number} | {exact: number};

export interface RuleError {
  required?: string;
  email?: string;
  min?: string;
  match?: string;
  max?: string;
  exact?: string;
}

export type Rules<T> = {
  [K in keyof T]?: Rule[];
};

export type RuleErrors<T> = {
  [K in keyof T]?: RuleError;
};

export type ReturnResponseImagePicker = {
  data: {
    uri: string;
    type: string;
    name: string;
    width: number;
    height: number;
    id: string;
  } | null;
  status: boolean;
};

export interface FormHookProps<T> {
  /**
   * Predefined structure of object this will create the automatic types for the state and
   */
  initialFields: T;
  /**
   * @param {field_name: errors[]} ruleErrors @enum {RuleError} #Optional Defined the rules for the form fields this will work when form submittion called
   */
  rules?: Rules<T>;
  /**
   * @param {field_name: string} ruleErrors #Optional Defined the rules errors for the form fields this will work when form submittion validation works
   */
  ruleErrors?: RuleErrors<T>;
  /**
   * #Optional Callback when initally if form fields need to focus , input as key of field (mandatory) if not may not be working
   */
  initialFocusField?: string;
  /**
   * #Optional Callback trigger when form submittion
   */
  OnSubmit: () => void;
}

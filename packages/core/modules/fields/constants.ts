export type FieldElementType =
  (typeof FieldElementType)[keyof typeof FieldElementType];

export const FieldElementType = {
  PLAIN_TEXT: "PLAIN_TEXT",
  RICH_TEXT: "RICH_TEXT",

  NUMBER: "NUMBER",

  EMAIL: "EMAIL",
  PHONE: "PHONE",
  URL: "URL",

  CHECKBOX: "CHECKBOX",
  SWITCH: "SWITCH",
  SINGLE_CHOICE: "SINGLE_CHOICE",
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  SELECT: "SELECT",

  TIME: "TIME",
  DATE: "DATE",
  DATE_TIME: "DATE_TIME",
} as const;

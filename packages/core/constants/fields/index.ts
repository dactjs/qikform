export type FieldElementType =
  (typeof FieldElementType)[keyof typeof FieldElementType];

export const FieldElementType = {
  PLAIN_TEXT: "PLAIN_TEXT",
  RICH_TEXT: "RICH_TEXT",
  NUMBER: "NUMBER",

  CHECKBOX: "CHECKBOX",

  TIME: "TIME",
  DATE: "DATE",
  DATE_TIME: "DATE_TIME",
} as const;

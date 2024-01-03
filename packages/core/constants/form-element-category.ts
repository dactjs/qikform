export type FormElementCategory =
  (typeof FormElementCategory)[keyof typeof FormElementCategory];

export const FormElementCategory = {
  BLOCK: "BLOCK",
  FIELD: "FIELD",
} as const;

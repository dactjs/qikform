import { BlockElementType } from "./block-type";
import { FieldElementType } from "./field-type";

export type FormElementType =
  (typeof FormElementType)[keyof typeof FormElementType];

export const FormElementType = {
  ...BlockElementType,
  ...FieldElementType,
} as const;

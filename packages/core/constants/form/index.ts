import { BlockElementType } from "../blocks";
import { FieldElementType } from "../fields";

export type FormElementCategory =
  (typeof FormElementCategory)[keyof typeof FormElementCategory];

export const FormElementCategory = {
  BLOCK: "BLOCK",
  FIELD: "FIELD",
} as const;

export type FormElementType =
  (typeof FormElementType)[keyof typeof FormElementType];

export const FormElementType = {
  ...BlockElementType,
  ...FieldElementType,
} as const;

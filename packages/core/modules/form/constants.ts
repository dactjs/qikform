import { BASE_BLOCK_CATEGORY, BlockElementType } from "../blocks";
import { BASE_FIELD_CATEGORY, FieldElementType } from "../fields";

//////////////////////
// Element Category //
//////////////////////

export type FormElementCategory =
  (typeof FormElementCategory)[keyof typeof FormElementCategory];

export const FormElementCategory = {
  [BASE_BLOCK_CATEGORY]: BASE_BLOCK_CATEGORY,
  [BASE_FIELD_CATEGORY]: BASE_FIELD_CATEGORY,
} as const;

//////////////////
// Element Type //
//////////////////

export type FormElementType =
  (typeof FormElementType)[keyof typeof FormElementType];

export const FormElementType = {
  ...BlockElementType,
  ...FieldElementType,
} as const;

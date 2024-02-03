import { BASE_BLOCK_KIND, BlockElementType } from "@/blocks";
import { BASE_FIELD_KIND, FieldElementType } from "@/fields";

//////////////////
// Element Kind //
//////////////////

export type FormElementKind =
  (typeof FormElementKind)[keyof typeof FormElementKind];

export const FormElementKind = {
  [BASE_BLOCK_KIND]: BASE_BLOCK_KIND,
  [BASE_FIELD_KIND]: BASE_FIELD_KIND,
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

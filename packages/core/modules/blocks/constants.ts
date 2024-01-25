export type BlockElementType =
  (typeof BlockElementType)[keyof typeof BlockElementType];

export const BlockElementType = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
  CODE: "CODE",

  DIVIDER: "DIVIDER",
  PAGE_BREAK: "PAGE_BREAK",
} as const;

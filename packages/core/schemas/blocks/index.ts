import { z as zod } from "zod";

import type { CreateTextBlock } from "./text";
import { TextBlockSchema } from "./text";

import type { CreateImageBlock } from "./image";
import { ImageBlockSchema } from "./image";

import type { CreateCodeBlock } from "./code";
import { CodeBlockSchema } from "./code";

import type { CreateDividerBlock } from "./divider";
import { DividerBlockSchema } from "./divider";

import type { CreatePageBreakBlock } from "./page-break";
import { PageBreakBlockSchema } from "./page-break";

///////////
// Types //
///////////

export type CreateBlockElement =
  | CreateTextBlock
  | CreateImageBlock
  | CreateCodeBlock
  | CreateDividerBlock
  | CreatePageBreakBlock;

export type BlockElement = zod.infer<typeof BlockElementSchema>;

/////////////
// Schemas //
/////////////

export const BlockElementSchema = zod.union([
  TextBlockSchema,
  ImageBlockSchema,
  CodeBlockSchema,
  DividerBlockSchema,
  PageBreakBlockSchema,
]);

////////////////
// Re-exports //
////////////////

export * from "./base";
export * from "./text";
export * from "./image";
export * from "./code";
export * from "./divider";
export * from "./page-break";

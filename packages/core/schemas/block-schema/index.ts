import { z as zod } from "zod";

import type { CreateTextBlock } from "../text-block-schema";
import { TextBlockSchema } from "../text-block-schema";

import type { CreateImageBlock } from "../image-block-schema";
import { ImageBlockSchema } from "../image-block-schema";

import type { CreateCodeBlock } from "../code-block-schema";
import { CodeBlockSchema } from "../code-block-schema";

import type { CreateDividerBlock } from "../divider-block-schema";
import { DividerBlockSchema } from "../divider-block-schema";

import type { CreatePageBreakBlock } from "../page-break-block-schema";
import { PageBreakBlockSchema } from "../page-break-block-schema";

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

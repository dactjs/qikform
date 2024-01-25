import type { z as zod } from "zod";

import type {
  CreateTextBlock,
  CreateImageBlock,
  CreateCodeBlock,
  CreateDividerBlock,
  CreatePageBreakBlock,
} from "./submodules";

import type { BlockElementSchema } from "./schema";

export type CreateBlockElement =
  | CreateTextBlock
  | CreateImageBlock
  | CreateCodeBlock
  | CreateDividerBlock
  | CreatePageBreakBlock;

export type BlockElement = zod.infer<typeof BlockElementSchema>;

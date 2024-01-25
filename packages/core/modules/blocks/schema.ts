import { z as zod } from "zod";

import {
  TextBlockSchema,
  ImageBlockSchema,
  CodeBlockSchema,
  DividerBlockSchema,
  PageBreakBlockSchema,
} from "./submodules";

export const BlockElementSchema = zod.union([
  TextBlockSchema,
  ImageBlockSchema,
  CodeBlockSchema,
  DividerBlockSchema,
  PageBreakBlockSchema,
]);

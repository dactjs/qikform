import type { z as zod } from "zod";

import type { DeepPartial } from "@/types";

import type { BlockElementType } from "../../constants";

import type {
  PageBreakBlockSchema,
  PageBreakBlockConfigurationSchema,
} from "./schema";

export type CreatePageBreakBlock = DeepPartial<PageBreakBlock> & {
  type: typeof BlockElementType.PAGE_BREAK;
  name: string;
};

export type PageBreakBlock = zod.infer<typeof PageBreakBlockSchema>;

export type PageBreakBlockConfiguration = zod.infer<
  typeof PageBreakBlockConfigurationSchema
>;

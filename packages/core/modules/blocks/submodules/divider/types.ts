import type { z as zod } from "zod";

import type { DeepPartial } from "@/types";

import type { BlockElementType } from "../../constants";

import type {
  DividerBlockSchema,
  DividerBlockConfigurationSchema,
} from "./schema";

export type CreateDividerBlock = DeepPartial<DividerBlock> & {
  type: typeof BlockElementType.DIVIDER;
  name: string;
};

export type DividerBlock = zod.infer<typeof DividerBlockSchema>;

export type DividerBlockConfiguration = zod.infer<
  typeof DividerBlockConfigurationSchema
>;

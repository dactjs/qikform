import type { z as zod } from "zod";

import type { BaseBlockSchema, BaseBlockConfigurationSchema } from "./schema";

export type BaseBlock = zod.infer<typeof BaseBlockSchema>;

export type BaseBlockConfiguration = zod.infer<
  typeof BaseBlockConfigurationSchema
>;

import type { z as zod } from "zod";

import type { DeepPartial } from "@/types";

import type { BlockElementType } from "../../constants";

import type { ImageBlockSchema, ImageBlockConfigurationSchema } from "./schema";

export type CreateImageBlock = DeepPartial<ImageBlock> & {
  type: typeof BlockElementType.IMAGE;
  name: string;
  url: string;
};

export type ImageBlock = zod.infer<typeof ImageBlockSchema>;

export type ImageBlockConfiguration = zod.infer<
  typeof ImageBlockConfigurationSchema
>;

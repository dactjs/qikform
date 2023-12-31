import { z as zod } from "zod";

import { BlockElementType } from "../../constants";
import type { DeepPartial } from "../../types";

import {
  BaseBlockSchema,
  BaseBlockConfigurationSchema,
} from "../base-block-schema";

///////////
// Types //
///////////

export type CreateImageBlock = DeepPartial<ImageBlock> & {
  type: typeof BlockElementType.IMAGE;
  name: string;
  url: string;
};

export type ImageBlock = zod.infer<typeof ImageBlockSchema>;

export type ImageBlockConfiguration = zod.infer<
  typeof ImageBlockConfigurationSchema
>;

/////////////
// Schemas //
/////////////

export const ImageBlockConfigurationSchema = BaseBlockConfigurationSchema; // no additional configuration

export const ImageBlockSchema = BaseBlockSchema.extend({
  type: zod.literal(BlockElementType.IMAGE),
  url: zod.string().url(),
  label: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  configuration: ImageBlockConfigurationSchema.default({}),
});

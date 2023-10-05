import { z as zod } from "zod";
import { BaseBlockConfigurationSchema } from "../base";

///////////
// Types //
///////////

export type CodeBlock = zod.infer<typeof CodeBlockSchema>;

export type CodeBlockConfiguration = zod.infer<
  typeof CodeBlockConfigurationSchema
>;

/////////////
// Schemas //
/////////////

export const CodeBlockConfigurationSchema = BaseBlockConfigurationSchema.extend(
  {
    // no additional configuration
  }
);

export const CodeBlockSchema = zod.object({
  content: zod.string().min(1),
  configuration: CodeBlockConfigurationSchema,
});

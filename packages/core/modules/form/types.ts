import type { z as zod } from "zod";

import type { DeepPartial } from "../../types";

import { type CreateBlockElement } from "../blocks";
import { type CreateFieldElement } from "../fields";

import type {
  FormSchema,
  FormElementSchema,
  FormCustomizationSchema,
} from "./schema";

export type CreateForm = DeepPartial<Form> & {
  title: string;
  elements: (CreateBlockElement | CreateFieldElement)[];
};

export type Form = zod.infer<typeof FormSchema>;

export type FormElement = zod.infer<typeof FormElementSchema>;

export type FormCustomization = zod.infer<typeof FormCustomizationSchema>;

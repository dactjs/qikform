import { z as zod } from "zod";

import {
  PlainTextFieldSchema,
  RichTextFieldSchema,
  NumberFieldSchema,
  EmailFieldSchema,
  PhoneFieldSchema,
  URLFieldSchema,
  CheckboxFieldSchema,
  SwitchFieldSchema,
  SingleChoiceFieldSchema,
  MultipleChoiceFieldSchema,
  SelectFieldSchema,
  TimeFieldSchema,
  DateFieldSchema,
  DateTimeFieldSchema,
} from "./submodules";

export const FieldElementSchema = zod.union([
  PlainTextFieldSchema,
  RichTextFieldSchema,
  NumberFieldSchema,
  EmailFieldSchema,
  PhoneFieldSchema,
  URLFieldSchema,
  CheckboxFieldSchema,
  SwitchFieldSchema,
  SingleChoiceFieldSchema,
  MultipleChoiceFieldSchema,
  SelectFieldSchema,
  TimeFieldSchema,
  DateFieldSchema,
  DateTimeFieldSchema,
]);

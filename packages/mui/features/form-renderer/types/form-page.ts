import type { FormElement, PageBreakBlock } from "@qikform/core";

export interface FormPage {
  number: number;
  elements: FormElement[];
  breaker: PageBreakBlock | null;
}

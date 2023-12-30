"use client";

import { FormSchema } from "@qikform/core";

import { schema } from "./_schema";

export default function TailwindDemoPage(): React.ReactElement {
  const form = FormSchema.parse(schema);

  return <pre>{JSON.stringify(form, null, 2)}</pre>;
}

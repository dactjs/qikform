"use client";

import dynamic from "next/dynamic";
import { Box } from "@mui/material";

import { FormSchema } from "@qikform/core";

import { ToggleColorModeButton } from "~/theme";

import { schema } from "./_schema";

const DynamicFormBuilder = dynamic(
  () => import("@qikform/mui").then(({ FormBuilder }) => FormBuilder),
  { ssr: false } // No ssr for this component (it uses the window object)
);

export default function MuiDemoPage(): React.ReactElement {
  const form = FormSchema.parse(schema);

  return (
    <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <DynamicFormBuilder
        form={form}
        toolbarContent={<ToggleColorModeButton />}
      />
    </Box>
  );
}

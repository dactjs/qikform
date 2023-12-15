"use client";

import { Box } from "@mui/material";

import { FormSchema } from "@qikform/core";
import { FormBuilder } from "@qikform/mui";

import { ToggleColorModeButton } from "~/theme";

import { schema } from "./_schema";

export default function MuiDemoPage(): React.ReactElement {
  const form = FormSchema.parse(schema);

  return (
    <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <FormBuilder form={form} toolbarContent={<ToggleColorModeButton />} />
    </Box>
  );
}

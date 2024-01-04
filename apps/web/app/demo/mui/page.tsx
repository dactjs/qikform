"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { SnackbarCloseReason } from "@mui/material";
import { Box, Snackbar } from "@mui/material";

import type { Form } from "@qikform/core";

import { ToggleColorModeButton } from "~/theme";

import { schema } from "./_schema";

interface SnackbarInfo {
  message: string;
  color: string;
  backgroundColor: string;
}

const DynamicFormBuilder = dynamic(
  () => import("@qikform/mui").then(({ FormBuilder }) => FormBuilder),
  { ssr: false } // No ssr for this component (it uses the window object)
);

export default function MuiDemoPage(): React.ReactElement {
  const [snackbar, setSnackbar] = useState<SnackbarInfo | null>(null);

  const handleClose = (_: Event, reason: SnackbarCloseReason): void => {
    if (reason === "clickaway") return;

    setSnackbar(null);
  };

  const handleOnSave = async (form: Form): Promise<void> => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(form, null, 2));

      setSnackbar({
        message: "Copied to clipboard",
        color: "info.contrastText",
        backgroundColor: "info.main",
      });
    } catch (err) {
      setSnackbar({
        message: "Failed to copy to clipboard",
        color: "error.contrastText",
        backgroundColor: "error.main",
      });
    }
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Snackbar
        autoHideDuration={4000}
        message={snackbar?.message}
        open={Boolean(snackbar)}
        onClose={handleClose}
        ContentProps={{
          sx: {
            color: snackbar?.color,
            backgroundColor: snackbar?.backgroundColor,
          },
        }}
      />

      <DynamicFormBuilder
        form={schema}
        toolbarContent={<ToggleColorModeButton />}
        onSave={handleOnSave}
      />
    </Box>
  );
}

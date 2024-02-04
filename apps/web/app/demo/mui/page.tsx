"use client";

import dynamic from "next/dynamic";
import { Box, Snackbar } from "@mui/material";

import { MuiToggleColorModeButton } from "@/theme";

import { useMuiDemoPage } from "./_hooks";
import { form } from "./_schema";

const DynamicFormBuilder = dynamic(
  () => import("@qikform/mui").then(({ FormBuilder }) => FormBuilder),
  { ssr: false }, // No ssr for this component (it uses the window object)
);

export default function MuiDemoPage(): React.ReactElement {
  const { snackbarInfo, closeSnackbar, copyToClipboard } = useMuiDemoPage();

  return (
    <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Snackbar
        autoHideDuration={4000}
        message={snackbarInfo?.message}
        open={Boolean(snackbarInfo)}
        onClose={closeSnackbar}
        ContentProps={{
          sx: {
            color: snackbarInfo?.color,
            backgroundColor: snackbarInfo?.backgroundColor,
          },
        }}
      />

      <DynamicFormBuilder
        form={form}
        toolbarContent={<MuiToggleColorModeButton />}
        onSave={copyToClipboard}
      />
    </Box>
  );
}

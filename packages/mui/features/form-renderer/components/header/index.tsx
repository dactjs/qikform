"use client";

import { Stack, Typography } from "@mui/material";

import { useFormRenderer } from "../../context";

export function Header(): React.ReactElement {
  const { form } = useFormRenderer();

  const { hideTitle, hideDescription } = form.customization;

  return (
    <Stack>
      {!hideTitle && (
        <Typography variant="h5" textAlign="center" fontWeight="bolder">
          {form.title}
        </Typography>
      )}

      {(!hideDescription || !form.description) && (
        <Typography
          component="pre"
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {form.description}
        </Typography>
      )}
    </Stack>
  );
}

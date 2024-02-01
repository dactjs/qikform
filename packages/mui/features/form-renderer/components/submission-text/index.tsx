"use client";

import { Stack, Divider, Button } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "../../../../lib";

import { useFormRenderer } from "../../context";

export function FormRendererSubmissionText(): React.ReactElement {
  const { form, startNewSubmission } = useFormRenderer();

  const { allowMultipleSubmissions, fillAgainButtonText, submissionText } =
    form.customization;

  return (
    <Stack spacing={1} divider={<Divider flexItem />}>
      <RichTextReadOnly
        extensions={BASE_MUI_TIPTAP_EXTENSIONS}
        content={submissionText}
      />

      {Boolean(allowMultipleSubmissions) && (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={startNewSubmission}
        >
          {fillAgainButtonText}
        </Button>
      )}
    </Stack>
  );
}

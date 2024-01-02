"use client";

import { Stack, Divider, Button } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { useFormContext } from "react-hook-form";

import { useFormRenderer } from "../../context";

export function SubmissionText(): React.ReactElement {
  const { reset } = useFormContext();

  const { form } = useFormRenderer();

  const extensions = [
    StarterKit,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
  ];

  const { submissionText, allowMultipleSubmissions, fillAgainButtonText } =
    form.customization;

  const handleReset = (): void => {
    reset();
  };

  return (
    <Stack spacing={1} divider={<Divider flexItem />}>
      <RichTextReadOnly extensions={extensions} content={submissionText} />

      {Boolean(allowMultipleSubmissions) && (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleReset}
        >
          {fillAgainButtonText}
        </Button>
      )}
    </Stack>
  );
}

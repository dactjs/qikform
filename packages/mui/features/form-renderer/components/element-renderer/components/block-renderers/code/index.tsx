"use client";

import { Box, Typography } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import sanitizer from "dompurify";

import type { CodeBlock } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "@/lib";

export function CodeBlockRenderer({
  block,
}: {
  block: CodeBlock;
}): React.ReactElement {
  return (
    <Box>
      {Boolean(block.label) && (
        <Typography variant="h6">{block.label}</Typography>
      )}

      <Box
        dangerouslySetInnerHTML={{
          __html: sanitizer.sanitize(block.content, {
            FORCE_BODY: true,
            ADD_TAGS: ["style"],
          }),
        }}
      />

      {Boolean(block.helperText) && (
        <Box sx={{ color: "text.secondary" }}>
          <RichTextReadOnly
            extensions={BASE_MUI_TIPTAP_EXTENSIONS}
            content={block.helperText}
          />
        </Box>
      )}
    </Box>
  );
}

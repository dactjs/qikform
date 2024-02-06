"use client";

import { Box, Typography } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";

import type { TextBlock } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "@/lib";

export function TextBlockRenderer({
  block,
}: {
  block: TextBlock;
}): React.ReactElement {
  return (
    <Box>
      {Boolean(block.label) && (
        <Typography variant="h6">{block.label}</Typography>
      )}

      <RichTextReadOnly
        extensions={BASE_MUI_TIPTAP_EXTENSIONS}
        content={block.content}
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

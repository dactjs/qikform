"use client";

import { Box, Typography } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";

import type { TextBlock } from "@qikform/core";

export function TextBlockRenderer({
  block,
}: {
  block: TextBlock;
}): React.ReactElement {
  const extensions = [
    StarterKit,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
  ];

  return (
    <Box>
      {Boolean(block.label) && (
        <Typography variant="h6">{block.label}</Typography>
      )}

      <RichTextReadOnly extensions={extensions} content={block.content} />

      {Boolean(block.helperText) && (
        <Box sx={{ color: (theme) => theme.palette.text.secondary }}>
          <RichTextReadOnly
            extensions={extensions}
            content={block.helperText}
          />
        </Box>
      )}
    </Box>
  );
}

"use client";

import { Box, Typography } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";

import type { ImageBlock } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "../../../../../lib";

export function ImageBlockRenderer({
  block,
}: {
  block: ImageBlock;
}): React.ReactElement {
  return (
    <Box>
      {Boolean(block.label) && (
        <Typography variant="h6">{block.label}</Typography>
      )}

      <Box>
        <Box
          component="img"
          loading="lazy"
          alt={block.label || block.name}
          src={block.url}
          sx={{ maxWidth: "100%", maxHeight: 300, objectFit: "cover" }}
        />
      </Box>

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

import { Box, Typography } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";

import type { ImageBlock } from "@qikform/core";

export function ImageBlockRenderer({
  block,
}: {
  block: ImageBlock;
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

      <Box>
        <Box
          component="img"
          loading="lazy"
          alt={block.label || block.name}
          src={block.url}
          sx={{ maxHeight: 300 }}
        />
      </Box>

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

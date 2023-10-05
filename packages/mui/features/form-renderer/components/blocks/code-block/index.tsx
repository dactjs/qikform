import { Box, Typography } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import sanitizer from "dompurify";

import type { CodeBlock } from "@qikform/core";

export function CodeBlockRenderer({
  block,
}: {
  block: CodeBlock;
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

      <Box
        dangerouslySetInnerHTML={{
          __html: sanitizer.sanitize(block.content, {
            FORCE_BODY: true,
            ADD_TAGS: ["style"],
          }),
        }}
      />

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

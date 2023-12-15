"use client";

import { Box, Stack, Divider, Typography } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";

import type { DividerBlock } from "@qikform/core";

export function DividerBlockRenderer({
  block,
}: {
  block: DividerBlock;
}): React.ReactElement {
  if (!block.label && !block.helperText) return <Divider flexItem />;

  const extensions = [
    StarterKit,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
  ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: (theme) => theme.spacing(4),
        "::before": {
          content: '""',
          flexGrow: 1,
          marginRight: (theme) => theme.spacing(2),
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        },
        "::after": {
          content: '""',
          flexGrow: 1,
          marginLeft: (theme) => theme.spacing(2),
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Stack>
        {Boolean(block.label) && (
          <Typography variant="h6" align="center">
            {block.label}
          </Typography>
        )}

        {Boolean(block.helperText) && (
          <Box sx={{ color: (theme) => theme.palette.text.secondary }}>
            <RichTextReadOnly
              extensions={extensions}
              content={block.helperText}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
}

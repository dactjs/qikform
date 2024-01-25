"use client";

import { Box, Stack, Divider, Typography } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";

import type { DividerBlock } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "../../../../../../lib";

export function DividerBlockRenderer({
  block,
}: {
  block: DividerBlock;
}): React.ReactElement {
  if (!block.label && !block.helperText) return <Divider flexItem />;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        "::before": {
          content: '""',
          flexGrow: 1,
          marginRight: 2,
          borderBottom: 1,
          borderBottomColor: "divider",
        },
        "::after": {
          content: '""',
          flexGrow: 1,
          marginLeft: 2,
          borderBottom: 1,
          borderBottomColor: "divider",
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
          <Box sx={{ color: "text.secondary" }}>
            <RichTextReadOnly
              extensions={BASE_MUI_TIPTAP_EXTENSIONS}
              content={block.helperText}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
}

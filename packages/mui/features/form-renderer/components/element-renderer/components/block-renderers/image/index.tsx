"use client";

import { Box, Typography, IconButton } from "@mui/material";
import { Visibility as VisibilityIcon } from "@mui/icons-material";
import { RichTextReadOnly } from "mui-tiptap";

import type { ImageBlock } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "@/lib";

import { GalleryDialog } from "./components";
import { useImageBlockRenderer } from "./hooks";

export function ImageBlockRenderer({
  block,
}: {
  block: ImageBlock;
}): React.ReactElement {
  const {
    loading,
    endLoading,
    isGalleryDialogOpen,
    openGalleryDialog,
    closeGalleryDialog,
  } = useImageBlockRenderer({ initialLoading: true });

  return (
    <>
      <GalleryDialog
        fullWidth
        maxWidth="md"
        block={block}
        open={isGalleryDialogOpen}
        onClose={closeGalleryDialog}
      />

      <Box component="figure" sx={{ position: "relative" }}>
        {!loading && Boolean(block.url) && (
          <Box
            sx={{
              position: "absolute",
              bottom: 2,
              left: 2,
              borderRadius: 1,
              backgroundColor: "background.paper",
              opacity: 0.8,
            }}
          >
            <IconButton
              size="small"
              color="inherit"
              aria-label="Open Gallery View"
              onClick={openGalleryDialog}
            >
              <VisibilityIcon />
            </IconButton>
          </Box>
        )}

        {Boolean(block.label) && (
          <Typography component="figcaption" variant="h6">
            {block.label}
          </Typography>
        )}

        <Box
          component="img"
          loading="lazy"
          onLoad={endLoading}
          alt={block.label || block.name}
          src={block.url}
          sx={{ maxWidth: "100%", maxHeight: 300, objectFit: "cover" }}
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
    </>
  );
}

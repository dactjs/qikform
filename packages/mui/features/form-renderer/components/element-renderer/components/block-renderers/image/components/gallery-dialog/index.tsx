"use client";

import type { DialogProps } from "@mui/material";
import { Box, Dialog, DialogContent } from "@mui/material";

import type { ImageBlock } from "@qikform/core";

export interface GalleryDialogProps extends DialogProps {
  block: ImageBlock;
}

export function GalleryDialog({
  block,
  ...dialogProps
}: GalleryDialogProps): React.ReactElement {
  return (
    <Dialog {...dialogProps}>
      <DialogContent>
        <Box
          component="img"
          loading="lazy"
          src={block.url}
          alt={block.label || block.name}
          sx={{
            width: "100%",
            height: "auto",
            aspectRatio: "16 / 9",
            objectFit: "contain",
            objectPosition: "left",
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";

export interface UseImageBlockRendererReturn {
  isGalleryDialogOpen: boolean;
  openGalleryDialog: () => void;
  closeGalleryDialog: () => void;
}

export function useImageBlockRenderer(): UseImageBlockRendererReturn {
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] =
    useState<boolean>(false);

  const handleOpenGalleryDialog = (): void => {
    setIsGalleryDialogOpen(true);
  };

  const handleCloseGalleryDialog = (): void => {
    setIsGalleryDialogOpen(false);
  };

  return {
    isGalleryDialogOpen,
    openGalleryDialog: handleOpenGalleryDialog,
    closeGalleryDialog: handleCloseGalleryDialog,
  };
}

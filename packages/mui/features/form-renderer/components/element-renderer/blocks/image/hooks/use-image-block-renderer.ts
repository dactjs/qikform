import { useState } from "react";

export interface UseImageBlockRendererParams {
  initialLoading: boolean;
}

export interface UseImageBlockRendererReturn {
  loading: boolean;
  startLoading: () => void;
  endLoading: () => void;
  isGalleryDialogOpen: boolean;
  openGalleryDialog: () => void;
  closeGalleryDialog: () => void;
}

export function useImageBlockRenderer({
  initialLoading,
}: UseImageBlockRendererParams): UseImageBlockRendererReturn {
  const [loading, setLoading] = useState<boolean>(initialLoading);

  const startLoading = (): void => {
    setLoading(true);
  };

  const endLoading = (): void => {
    setLoading(false);
  };

  const [isGalleryDialogOpen, setIsGalleryDialogOpen] =
    useState<boolean>(false);

  const handleOpenGalleryDialog = (): void => {
    setIsGalleryDialogOpen(true);
  };

  const handleCloseGalleryDialog = (): void => {
    setIsGalleryDialogOpen(false);
  };

  return {
    loading,
    startLoading,
    endLoading,
    isGalleryDialogOpen,
    openGalleryDialog: handleOpenGalleryDialog,
    closeGalleryDialog: handleCloseGalleryDialog,
  };
}

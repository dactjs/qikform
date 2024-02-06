import { useState } from "react";

export interface UseSelectFieldSettingsReturn {
  isOptionsDialogOpen: boolean;
  openOptionsDialog: () => void;
  closeOptionsDialog: () => void;
}

export function useSelectFieldSettings(): UseSelectFieldSettingsReturn {
  const [isOptionsDialogOpen, setIsOptionsDialogOpen] =
    useState<boolean>(false);

  const handleOpenOptionsDialog = (): void => {
    setIsOptionsDialogOpen(true);
  };

  const handleCloseOptionsDialog = (): void => {
    setIsOptionsDialogOpen(false);
  };

  return {
    isOptionsDialogOpen,
    openOptionsDialog: handleOpenOptionsDialog,
    closeOptionsDialog: handleCloseOptionsDialog,
  };
}

import { useState } from "react";

export interface UseSingleChoiceFieldSettingsReturn {
  isOptionsDialogOpen: boolean;
  openOptionsDialog: () => void;
  closeOptionsDialog: () => void;
}

export function useSingleChoiceFieldSettings(): UseSingleChoiceFieldSettingsReturn {
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

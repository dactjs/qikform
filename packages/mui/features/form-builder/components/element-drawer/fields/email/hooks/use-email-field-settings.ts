import { useState } from "react";

export interface UseEmailFieldSettingsReturn {
  isAllowedDomainsDialogOpen: boolean;
  openAllowedDomainsDialog: () => void;
  closeAllowedDomainsDialog: () => void;
}

export function useEmailFieldSettings(): UseEmailFieldSettingsReturn {
  const [isAllowedDomainsDialogOpen, setIsAllowedDomainsDialogOpen] =
    useState<boolean>(false);

  const handleOpenAllowedDomainsDialog = (): void => {
    setIsAllowedDomainsDialogOpen(true);
  };

  const handleCloseAllowedDomainsDialog = (): void => {
    setIsAllowedDomainsDialogOpen(false);
  };

  return {
    isAllowedDomainsDialogOpen,
    openAllowedDomainsDialog: handleOpenAllowedDomainsDialog,
    closeAllowedDomainsDialog: handleCloseAllowedDomainsDialog,
  };
}

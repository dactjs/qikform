import { useState } from "react";

export interface UseURLFieldSettingsReturn {
  isAllowedDomainsDialogOpen: boolean;
  openAllowedDomainsDialog: () => void;
  closeAllowedDomainsDialog: () => void;
}

export function useURLFieldSettings(): UseURLFieldSettingsReturn {
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

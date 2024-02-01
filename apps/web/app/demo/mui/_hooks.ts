import { useState } from "react";
import type { SnackbarProps } from "@mui/material";

import type { Form } from "@qikform/core";

interface SnackbarInfo {
  message: string;
  color: string;
  backgroundColor: string;
}

export interface UseMuiDemoPageReturn {
  snackbarInfo: SnackbarInfo | null;
  closeSnackbar: SnackbarProps["onClose"];
  copyToClipboard: (form: Form) => Promise<void>;
}

export function useMuiDemoPage(): UseMuiDemoPageReturn {
  const [snackbarInfo, setSnackbarInfo] = useState<SnackbarInfo | null>(null);

  const handleCloseSnackbar: SnackbarProps["onClose"] = (_, reason) => {
    if (reason === "clickaway") return;

    setSnackbarInfo(null);
  };

  const handleCopyToClipboard = async (form: Form): Promise<void> => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(form, null, 2));

      setSnackbarInfo({
        message: "📋 Copied to clipboard",
        color: "info.contrastText",
        backgroundColor: "info.main",
      });
    } catch (err) {
      setSnackbarInfo({
        message: "😵 Failed to copy to clipboard",
        color: "error.contrastText",
        backgroundColor: "error.main",
      });
    }
  };

  return {
    snackbarInfo,
    closeSnackbar: handleCloseSnackbar,
    copyToClipboard: handleCopyToClipboard,
  };
}

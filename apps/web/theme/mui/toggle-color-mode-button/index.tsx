"use client";

import { IconButton, Tooltip } from "@mui/material";
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";

import { useMuiColorMode } from "../color-mode-provider";

export function MuiToggleColorModeButton(): React.ReactElement {
  const { mode, toggleMode } = useMuiColorMode();

  const message =
    mode === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Tooltip title={message}>
      <IconButton color="inherit" aria-label={message} onClick={toggleMode}>
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}

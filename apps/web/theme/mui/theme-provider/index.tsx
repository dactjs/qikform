"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { MuiColorModeProvider, useMuiColorMode } from "../color-mode-provider";

export interface MuiThemeProviderProps {
  children: React.ReactElement;
}

function MuiThemeProvider({
  children,
}: MuiThemeProviderProps): React.ReactElement {
  const { mode } = useMuiColorMode();

  const theme = createTheme({ palette: { mode } });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <GlobalStyles
        styles={{
          "*": {
            "&::-webkit-scrollbar": {
              width: 7.5,
              height: 7.5,
              backgroundColor: "hsla(0, 0%, 0%, 0.05)",
            },

            "&::-webkit-scrollbar-track": {
              borderRadius: 2.5,
              backgroundColor: "hsla(0, 0%, 0%, 0.05)",
            },

            "&::-webkit-scrollbar-thumb": {
              borderRadius: 2.5,
              backgroundColor: "steelblue",
            },
          },
        }}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

function MuiThemeProviderWrapper({
  children,
}: MuiThemeProviderProps): React.ReactElement {
  return (
    <MuiColorModeProvider>
      <MuiThemeProvider>{children}</MuiThemeProvider>
    </MuiColorModeProvider>
  );
}

export { MuiThemeProviderWrapper as MuiThemeProvider };

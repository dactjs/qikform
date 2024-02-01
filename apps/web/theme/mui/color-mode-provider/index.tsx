"use client";

import type { Reducer } from "react";
import { useReducer, useContext, createContext } from "react";
import type { PaletteMode } from "@mui/material";

///////////
// State //
///////////

interface MuiColorModeProviderState {
  mode: PaletteMode;
}

interface MuiColorModeProviderAction {
  type: "TOGGLE_MODE";
}

const reducer: Reducer<
  MuiColorModeProviderState,
  MuiColorModeProviderAction
> = (state, action): MuiColorModeProviderState => {
  switch (action.type) {
    case "TOGGLE_MODE": {
      return {
        ...state,
        mode: state.mode === "dark" ? "light" : "dark",
      };
    }
  }
};

const initialState: MuiColorModeProviderState = {
  mode: "dark",
};

/////////////
// Context //
/////////////

export interface MuiColorModeContextValue {
  mode: PaletteMode;
  toggleMode: () => void;
}

const MuiColorModeContext = createContext<MuiColorModeContextValue>({
  mode: initialState.mode,
  toggleMode: () => undefined,
});

export interface MuiColorModeProviderProps {
  children: React.ReactElement;
}

export function MuiColorModeProvider({
  children,
}: MuiColorModeProviderProps): React.ReactElement {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleToggleMode = (): void => {
    dispatch({ type: "TOGGLE_MODE" });
  };

  return (
    <MuiColorModeContext.Provider
      value={{
        mode: state.mode,
        toggleMode: handleToggleMode,
      }}
    >
      {children}
    </MuiColorModeContext.Provider>
  );
}

export function useMuiColorMode(): MuiColorModeContextValue {
  return useContext(MuiColorModeContext);
}

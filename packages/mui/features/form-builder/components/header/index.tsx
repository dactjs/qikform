"use client";

import { AppBar, Toolbar, IconButton, Tooltip } from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";

import { useFormBuilder } from "../../context";

export interface FormBuilderHeaderProps {
  children?: React.ReactElement;
}

export function FormBuilderHeader({
  children,
}: FormBuilderHeaderProps): React.ReactElement {
  const { save } = useFormBuilder();

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        {children}

        <Tooltip title="Save Changes">
          <IconButton
            color="inherit"
            aria-label="Save Changes"
            onClick={save as unknown as React.MouseEventHandler}
            sx={{ marginLeft: "auto" }}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

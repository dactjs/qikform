"use client";

import { AppBar, Toolbar, IconButton, Tooltip } from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";
import { useFormContext } from "react-hook-form";

import type { Form } from "@qikform/core";

export interface HeaderProps {
  onSave?: (form: Form) => void | Promise<void>;
  children?: React.ReactElement;
}

export function Header({ onSave, children }: HeaderProps): React.ReactElement {
  const { handleSubmit } = useFormContext<Form>();

  const handleOnSave = async (form: Form): Promise<void> => {
    if (!onSave) return;

    await onSave(form);
  };

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          gap: (theme) => theme.spacing(1),
        }}
      >
        {children}

        <Tooltip title="Save Changes">
          <IconButton
            color="inherit"
            aria-label="Save Changes"
            onClick={handleSubmit(handleOnSave) as () => void}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

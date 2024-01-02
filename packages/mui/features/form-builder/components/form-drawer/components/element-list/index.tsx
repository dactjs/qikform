"use client";

import { useState, useMemo } from "react";
import { Stack, Divider, List, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useFormContext } from "react-hook-form";

import type { Form } from "@qikform/core";

import { NoData } from "../../../../../../components";

import { FormElementItem } from "../element-item";
import { AddElementButton } from "../add-element-button";

export function FormElementList(): React.ReactElement {
  const { watch } = useFormContext<Form>();

  const [search, setSearch] = useState("");

  const elements = watch("elements");

  const filteredElements = useMemo(
    () =>
      elements.filter(
        (element) =>
          element.name.toLowerCase().includes(search.toLowerCase()) ||
          element.label?.toLowerCase().includes(search.toLowerCase())
      ),
    [elements, search]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  return (
    <Stack spacing={1} divider={<Divider flexItem />}>
      <TextField
        autoComplete="off"
        size="small"
        placeholder="Search element..."
        value={search}
        onChange={handleChange}
        InputProps={{ endAdornment: <SearchIcon /> }}
      />

      {filteredElements.length > 0 ? (
        <List dense disablePadding sx={{ maxHeight: 350, overflow: "auto" }}>
          {filteredElements.map((element) => (
            <FormElementItem
              key={element.id}
              filtering={!search}
              element={element}
            />
          ))}
        </List>
      ) : (
        <NoData message="No elements found" />
      )}

      <AddElementButton />
    </Stack>
  );
}

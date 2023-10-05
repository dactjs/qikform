import { Stack, Divider } from "@mui/material";

import { FormElementType } from "@qikform/core";

import { NoData } from "../../../../components";

import { useFormBuilder } from "../../context";

import {
  Header,
  TextBlockSettings,
  ImageBlockSettings,
  CodeBlockSettings,
  DividerBlockSettings,
  PlainTextFieldSettings,
  RichTextFieldSettings,
  NumberFieldSettings,
} from "./components";

export function ElementDrawer(): React.ReactElement {
  const { selectedElement } = useFormBuilder();

  if (!selectedElement) {
    return <NoData message="Select an element from the elements list" />;
  }

  return (
    <Stack
      spacing={1.5}
      divider={<Divider flexItem />}
      sx={{ position: "relative" }}
    >
      <Header />

      {selectedElement.type === FormElementType.TEXT && (
        <TextBlockSettings block={selectedElement} />
      )}

      {selectedElement.type === FormElementType.IMAGE && (
        <ImageBlockSettings block={selectedElement} />
      )}

      {selectedElement.type === FormElementType.CODE && (
        <CodeBlockSettings block={selectedElement} />
      )}

      {selectedElement.type === FormElementType.DIVIDER && (
        <DividerBlockSettings block={selectedElement} />
      )}

      {selectedElement.type === FormElementType.PLAIN_TEXT && (
        <PlainTextFieldSettings field={selectedElement} />
      )}

      {selectedElement.type === FormElementType.RICH_TEXT && (
        <RichTextFieldSettings field={selectedElement} />
      )}

      {selectedElement.type === FormElementType.NUMBER && (
        <NumberFieldSettings field={selectedElement} />
      )}
    </Stack>
  );
}

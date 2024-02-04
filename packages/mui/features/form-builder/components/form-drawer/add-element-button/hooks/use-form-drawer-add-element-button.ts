import { useState } from "react";
import { useSnackbar } from "notistack";
import { useFieldArray } from "react-hook-form";

import type { Form } from "@qikform/core";
import { FormElementSchema, FormElementType } from "@qikform/core";

import { useFormBuilder } from "../../../../context";

export interface UseFormDrawerAddElementButtonReturn {
  isElementsDrawerOpen: boolean;
  openElementsDrawer: () => void;
  closeElementsDrawer: () => void;
  addElement: (type: FormElementType) => () => void;
}

export function useFormDrawerAddElementButton(): UseFormDrawerAddElementButtonReturn {
  const { enqueueSnackbar } = useSnackbar();

  const { fields: elements, append } = useFieldArray<Form>({
    name: "elements",
  });

  const { selectElement } = useFormBuilder();

  const [isElementsDrawerOpen, setIsElementsDrawerOpen] =
    useState<boolean>(false);

  const handleOpenElementsDrawer = (): void => {
    setIsElementsDrawerOpen(true);
  };

  const handleCloseElementsDrawer = (): void => {
    setIsElementsDrawerOpen(false);
  };

  const handleAddElement = (type: FormElementType) => (): void => {
    const schemas: Record<FormElementType, unknown> = {
      // Meaningful
      [FormElementType.TEXT]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Text Element",
        content: "This is a new text element.",
      },
      [FormElementType.IMAGE]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Image Element",
        url: "https://picsum.photos/200/300",
      },
      [FormElementType.CODE]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Code Element",
        content: "<p>This is a new code element.</p>",
      },

      // Layout
      [FormElementType.DIVIDER]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Divider Element",
      },
      [FormElementType.PAGE_BREAK]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Page Break Element",
      },

      // Text
      [FormElementType.PLAIN_TEXT]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Plain Text Element",
      },
      [FormElementType.RICH_TEXT]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Rich Text Element",
      },

      // Number
      [FormElementType.NUMBER]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Number Element",
      },

      // Contact
      [FormElementType.EMAIL]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Email Element",
      },
      [FormElementType.PHONE]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Phone Element",
      },
      [FormElementType.URL]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New URL Element",
      },

      // Choices
      [FormElementType.CHECKBOX]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Checkbox Element",
      },
      [FormElementType.SWITCH]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Switch Element",
      },
      [FormElementType.SINGLE_CHOICE]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Single Choice Element",
        options: ["Option 1", "Option 2", "Option 3"],
      },
      [FormElementType.MULTIPLE_CHOICE]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Multiple Choice Element",
        options: ["Option 1", "Option 2", "Option 3"],
      },
      [FormElementType.SELECT]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Select Element",
        options: ["Option 1", "Option 2", "Option 3"],
      },

      // Date & Time
      [FormElementType.TIME]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Time Element",
      },
      [FormElementType.DATE]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Date Element",
      },
      [FormElementType.DATE_TIME]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Date Time Element",
      },
    };

    const result = FormElementSchema.safeParse(schemas[type]);

    if (!result.success) {
      enqueueSnackbar(result.error.message, { variant: "error" });
      return;
    }

    const element = result.data;

    append(element);
    selectElement(element);
  };

  return {
    isElementsDrawerOpen,
    openElementsDrawer: handleOpenElementsDrawer,
    closeElementsDrawer: handleCloseElementsDrawer,
    addElement: handleAddElement,
  };
}

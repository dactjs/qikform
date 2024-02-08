import { useFieldArray } from "react-hook-form";

import type { Form } from "@qikform/core";

import { useFormBuilder } from "../../../../../context";

export interface UseHeaderReturn {
  duplicateSelectedElement: () => void;
  deleteSelectedElement: () => void;
  closeElementDrawer: () => void;
}

export function useHeader(): UseHeaderReturn {
  const { insert, remove } = useFieldArray<Form>({ name: "elements" });

  const { elementIndexById, selectedElement, selectElement, unselectElement } =
    useFormBuilder();

  const handleDuplicate = (): void => {
    if (!selectedElement) return;

    const index = elementIndexById[selectedElement.id];

    const clone = globalThis.structuredClone(selectedElement);

    clone.id = globalThis.crypto.randomUUID();
    clone.name = `${clone.name}_copy`;

    insert(index + 1, clone);

    selectElement(clone);
  };

  const handleDelete = (): void => {
    if (!selectedElement) return;

    const index = elementIndexById[selectedElement.id];

    remove(index);

    unselectElement();
  };

  const handleClose = (): void => {
    unselectElement();
  };

  return {
    duplicateSelectedElement: handleDuplicate,
    deleteSelectedElement: handleDelete,
    closeElementDrawer: handleClose,
  };
}

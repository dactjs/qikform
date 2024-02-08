import { useState } from "react";

export type EditingProperty = "name" | "label";

export interface UseElementItemContentReturn {
  editingProperty: EditingProperty | null;
  startEditing: (property: EditingProperty) => () => void;
  endEditing: () => void;
}

export function useElementItemContent(): UseElementItemContentReturn {
  const [editingProperty, setEditingProperty] =
    useState<EditingProperty | null>(null);

  const handleStartEditing = (property: EditingProperty) => (): void => {
    setEditingProperty(property);
  };

  const handleEndEditing = (): void => {
    setEditingProperty(null);
  };

  return {
    editingProperty,
    startEditing: handleStartEditing,
    endEditing: handleEndEditing,
  };
}

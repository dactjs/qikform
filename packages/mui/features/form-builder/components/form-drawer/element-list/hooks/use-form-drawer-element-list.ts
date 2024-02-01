import { useState } from "react";
import type { Active, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useFormContext, useFieldArray } from "react-hook-form";

import type { Form, FormElement } from "@qikform/core";

import { useFormBuilder } from "../../../../context";

export interface UseFormDrawerElementListReturn {
  search: string;
  filteredElements: FormElement[];
  searchElements: (event: React.ChangeEvent<HTMLInputElement>) => void;
  active: Active | null;
  startDrag: (event: DragStartEvent) => void;
  endDrag: (event: DragEndEvent) => void;
}

export function useFormDrawerElementList(): UseFormDrawerElementListReturn {
  const { watch } = useFormContext<Form>();

  const { move } = useFieldArray<Form>({ name: "elements" });

  const { elementIndexById } = useFormBuilder();

  const elements = watch("elements");

  ///////////////
  // Searching //
  ///////////////

  const [search, setSearch] = useState<string>("");

  const filteredElements = elements.filter(
    (element) =>
      !element.name || // in the schema, the name is required, but in the <FormBuilder /> it could be null
      element.name.toLowerCase().includes(search.toLowerCase()) ||
      element.label?.toLowerCase().includes(search.toLowerCase()),
  );

  const searchElements = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  /////////////////
  // Drag & Drop //
  /////////////////

  const [active, setActive] = useState<Active | null>(null);

  const handleStartDrag = (event: DragStartEvent): void => {
    setActive(event.active);
  };

  const handleEndDrag = (event: DragEndEvent): void => {
    if (!event.over) return;

    const oldIndex = Number(elementIndexById[event.active.id]);
    const newIndex = Number(elementIndexById[event.over.id]);

    if (oldIndex !== newIndex) move(oldIndex, newIndex);

    setActive(null);
  };

  return {
    search,
    filteredElements,
    searchElements,
    active,
    startDrag: handleStartDrag,
    endDrag: handleEndDrag,
  };
}

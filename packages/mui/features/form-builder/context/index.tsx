"use client";

import type { Reducer } from "react";
import { useReducer, useContext, createContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Form, FormElement } from "@qikform/core";
import { FormSchema } from "@qikform/core";

import type { FileURLBuildStrategy } from "../types";

///////////
// State //
///////////

interface FormBuilderState {
  selectedElementId: string | null;
}

type FormBuilderAction =
  | {
      type: "SELECT_ELEMENT";
      payload: FormElement;
    }
  | {
      type: "UNSELECT_ELEMENT";
    };

const reducer: Reducer<FormBuilderState, FormBuilderAction> = (
  state,
  action
): FormBuilderState => {
  switch (action.type) {
    case "SELECT_ELEMENT": {
      return {
        ...state,
        selectedElementId: action.payload.id,
      };
    }

    case "UNSELECT_ELEMENT": {
      return {
        ...state,
        selectedElementId: null,
      };
    }
  }
};

const initialState: FormBuilderState = {
  selectedElementId: null,
};

/////////////
// Context //
/////////////

export interface FormBuilderContextValue {
  elementIndexById: Record<string, number>;
  selectedElement: FormElement | null;
  selectElement: (element: FormElement) => void;
  unselectElement: () => void;
  save: () => Promise<void>;
  fileURLBuildStrategy: FileURLBuildStrategy;
}

export const FormBuilderContext = createContext<FormBuilderContextValue>({
  elementIndexById: {},
  selectedElement: null,
  selectElement: () => undefined,
  unselectElement: () => undefined,
  save: () => Promise.resolve(),
  fileURLBuildStrategy: () => Promise.resolve("uploaded.file"),
});

export interface FormBuilderProviderProps {
  form: Form;
  fileURLBuildStrategy: FileURLBuildStrategy;
  onSave?: (form: Form) => void | Promise<void>;
  children: React.ReactElement;
}

export function FormBuilderProvider({
  form,
  fileURLBuildStrategy,
  onSave,
  children,
}: FormBuilderProviderProps): React.ReactElement {
  const methods = useForm<Form>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: form.title,
      description: form.description,
      elements: form.elements,
      customization: form.customization,
    },
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  const elements = methods.watch("elements");

  const elementIndexById = elements.reduce<Record<string, number>>(
    (acc, current, index) => {
      acc[current.id] = index;
      return acc;
    },
    {}
  );

  const selectedElement = state.selectedElementId
    ? elements[elementIndexById[state.selectedElementId]]
    : null;

  const handleSelectElement = (element: FormElement): void => {
    dispatch({ type: "SELECT_ELEMENT", payload: element });
  };

  const handleUnselectElement = (): void => {
    dispatch({ type: "UNSELECT_ELEMENT" });
  };

  const handleSave = methods.handleSubmit(
    async (schema: Form): Promise<void> => {
      if (!onSave) return;

      await onSave(schema);
    }
  );

  return (
    <FormBuilderContext.Provider
      value={{
        elementIndexById,
        selectedElement,
        selectElement: handleSelectElement,
        unselectElement: handleUnselectElement,
        save: handleSave,
        fileURLBuildStrategy,
      }}
    >
      <FormProvider {...methods}>{children}</FormProvider>
    </FormBuilderContext.Provider>
  );
}

export function useFormBuilder(): FormBuilderContextValue {
  return useContext(FormBuilderContext);
}

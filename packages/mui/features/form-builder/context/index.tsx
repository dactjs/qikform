"use client";

import type { Reducer } from "react";
import { useReducer, useContext, createContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Form, FormElement } from "@qikform/core";
import { FormSchema } from "@qikform/core";

///////////
// State //
///////////

interface FormBuilderState {
  selectedElement: FormElement | null;
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
        selectedElement: action.payload,
      };
    }

    case "UNSELECT_ELEMENT": {
      return {
        ...state,
        selectedElement: null,
      };
    }
  }
};

const initialState: FormBuilderState = {
  selectedElement: null,
};

/////////////
// Context //
/////////////

export interface FormBuilderContextValue {
  selectedElement: FormElement | null;
  selectElement: (element: FormElement) => void;
  unselectElement: () => void;
}

export const FormBuilderContext = createContext<FormBuilderContextValue>({
  selectedElement: initialState.selectedElement,
  selectElement: () => undefined,
  unselectElement: () => undefined,
});

export interface FormBuilderProviderProps {
  form: Form;
  children: React.ReactElement;
}

export function FormBuilderProvider({
  form,
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

  const handleSelectElement = (element: FormElement): void => {
    dispatch({ type: "SELECT_ELEMENT", payload: element });
  };

  const handleUnselectElement = (): void => {
    dispatch({ type: "UNSELECT_ELEMENT" });
  };

  return (
    <FormBuilderContext.Provider
      value={{
        selectedElement: state.selectedElement,
        selectElement: handleSelectElement,
        unselectElement: handleUnselectElement,
      }}
    >
      <FormProvider {...methods}>{children}</FormProvider>
    </FormBuilderContext.Provider>
  );
}

export function useFormBuilder(): FormBuilderContextValue {
  return useContext(FormBuilderContext);
}

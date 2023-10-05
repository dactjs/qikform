"use client";

import { useContext, createContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

import type { Form } from "@qikform/core";

/////////////
// Context //
/////////////

export interface FormRendererContextValue {
  form: Form;
}

export const FormRendererContext = createContext<FormRendererContextValue>({
  form: {} as Form,
});

export interface FormRendererProviderProps {
  form: Form;
  children: React.ReactElement;
}

export function FormRendererProvider({
  form,
  children,
}: FormRendererProviderProps): React.ReactElement {
  const methods = useForm();

  return (
    <FormRendererContext.Provider value={{ form }}>
      <FormProvider {...methods}>{children}</FormProvider>
    </FormRendererContext.Provider>
  );
}

export function useFormRenderer(): FormRendererContextValue {
  return useContext(FormRendererContext);
}

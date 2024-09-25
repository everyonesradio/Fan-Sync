import { createContext, useContext, useState, useMemo } from "react";

interface FormDataContextType {
  formData: FormData | null;
  setFormData: (data: FormData) => void;
}

interface FormProviderProps {
  children: React.ReactNode;
}

const FormDataContext = createContext<FormDataContextType | null>(null);

export const useFormContext = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormDataProvider");
  }
  return context;
};

export const FormDataProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const formDataMemoized = useMemo(
    () => ({ formData, setFormData }),
    [formData]
  );

  return (
    <FormDataContext.Provider value={formDataMemoized}>
      {children}
    </FormDataContext.Provider>
  );
};

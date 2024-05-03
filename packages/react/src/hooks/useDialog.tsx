import React, {
  ReactElement,
  createContext,
  useContext,
  useState,
} from "react";
import { Dialog, DialogTypeProps } from "../components/Dialog";

interface DialogContextType {
  dialog: DialogTypeProps | null;
  showDialog(dialog: DialogTypeProps): void;
  hideDialog(): void;
}

const DialogContext = createContext<DialogContextType>(null!);

export const DialogProvider = ({ children }: { children: ReactElement }) => {
  const [dialog, setDialog] = useState<DialogTypeProps | null>(null);

  const showDialog = (dialog: DialogTypeProps) => {
    setDialog(dialog);
  };

  const hideDialog = () => setDialog(null);

  return (
    <DialogContext.Provider value={{ dialog, showDialog, hideDialog }}>
      {children}
      <Dialog />
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  return context;
};

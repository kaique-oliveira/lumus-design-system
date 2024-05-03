import { ReactElement, createContext, useContext, useState } from "react";
import { ContextMenu, ContextMenuTypeProps } from "../components/ContextMenu";

interface ContexMenuContextType {
  contextMenu: ContextMenuTypeProps | null;
  showContextMenu(context: ContextMenuTypeProps): void;
  hideContextMenu(): void;
}

const ContextMenuContext = createContext<ContexMenuContextType>(null!);

export const ContextMenuProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuTypeProps | null>(
    null
  );

  const showContextMenu = (context: ContextMenuTypeProps) => {
    if (contextMenu && contextMenu.objectId == context.objectId) {
      setContextMenu(null);
      console.log(context);
    } else {
      setContextMenu(context);
    }
  };

  const hideContextMenu = () => setContextMenu(null);

  return (
    <ContextMenuContext.Provider
      value={{ contextMenu, showContextMenu, hideContextMenu }}
    >
      {children}
      <ContextMenu />
    </ContextMenuContext.Provider>
  );
};

export const useContextMenu = () => {
  const context = useContext(ContextMenuContext);
  return context;
};

import { Home } from "./pages/Home";
import { NotificationProvider } from "@lumus-ui/react/src/hooks/useNotification";
import { DialogProvider } from "@lumus-ui/react/src/hooks/useDialog";
import { ContextMenuProvider } from "@lumus-ui/react/src/hooks/useContextMenu";

import "./styles/styles.css";

function App() {
  return (
    <NotificationProvider>
      <ContextMenuProvider>
        <DialogProvider>
          <Home />
        </DialogProvider>
      </ContextMenuProvider>
    </NotificationProvider>
  );
}

export default App;

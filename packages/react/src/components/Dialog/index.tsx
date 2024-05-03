import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Text } from "../Text";
import { BackContainer, DialogContainer, WrapperButtons } from "./styles";
import useTimeoutEffect from "../../hooks/useTimeoutEffect";
import { useDialog } from "../../hooks/useDialog";

export interface DialogTypeProps {
  message: string;
  callback: Function;
}

export function Dialog() {
  const [visibleBackground, setVisibleBackground] = useState(false);
  const [visibleDialog, setVisibleDialog] = useState(false);

  const [show, setShow] = useState(false);
  const { dialog, hideDialog } = useDialog();

  useEffect(() => {
    if (dialog) {
      setVisibleBackground(true);
    } else {
      setShow(false);
    }
  }, [dialog]);

  useTimeoutEffect(
    () => {
      if (visibleBackground) {
        setShow(true);
        setVisibleDialog(true);
      }
    },
    [visibleBackground],
    300
  );

  useTimeoutEffect(
    () => {
      if (!show) {
        setVisibleBackground(false);
        setVisibleDialog(false);
        hideDialog();
      }
    },
    [show],
    200
  );

  if (visibleBackground)
    return (
      <BackContainer>
        {visibleDialog && (
          <DialogContainer visible={show}>
            <Text sizeText="lg">Atenção</Text>
            <Text>{dialog?.message}</Text>
            <WrapperButtons>
              <Button
                label="Sim"
                variant="text"
                onClick={() => dialog?.callback()}
              />
              <Button label="Não" variant="text" onClick={hideDialog} />
            </WrapperButtons>
          </DialogContainer>
        )}
      </BackContainer>
    );
}

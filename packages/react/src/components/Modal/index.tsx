import { ReactElement, useEffect, useState } from "react";
import { Button } from "../Button";
import { Text } from "../Text";
import {
  BackContainer,
  ModalButtons,
  ModalContainer,
  ModalContent,
  ModalHeader,
} from "./styles";
import useTimeoutEffect from "../../hooks/useTimeoutEffect";

interface ModalTypeProps {
  visible: boolean;
  onHideModal(visible: boolean): void;
  children: ReactElement;
  buttons?: ReactElement;
  title?: string;
}

export function Modal({
  visible,
  onHideModal,
  children,
  buttons,
  title = "",
}: ModalTypeProps) {
  const [visibleBackground, setVisibleBackground] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setVisibleBackground(true);
    } else {
      setShow(false);
    }
  }, [visible]);

  useTimeoutEffect(
    () => {
      if (visibleBackground) {
        setShow(true);
        setVisibleModal(true);
      }
    },
    [visibleBackground],
    300
  );

  useTimeoutEffect(
    () => {
      if (!show) {
        setVisibleBackground(false);
        setVisibleModal(false);
      }
    },
    [show],
    200
  );

  if (visibleBackground)
    return (
      <BackContainer>
        {visibleModal && (
          <ModalContainer visible={show}>
            <ModalHeader>
              <Text>{title}</Text>
              <Button
                variant="text"
                icon="closeLinear"
                onClick={() => onHideModal(false)}
              />
            </ModalHeader>

            <ModalContent>{children}</ModalContent>

            <ModalButtons>{buttons}</ModalButtons>
          </ModalContainer>
        )}
      </BackContainer>
    );
}

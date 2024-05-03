import { useEffect, useState } from "react";
import { ArrowDown } from "../../assets/icons/ArrowDown";
import { Button } from "../Button";
import { ContextMenuContainer, ContextMenuWrapper } from "./styles";
import { IconsProps } from "../../assets/icons";
import { useContextMenu } from "../../hooks/useContextMenu";
import useTimeoutEffect from "../../hooks/useTimeoutEffect";

type ButtonsContextMenu = {
  label?: string;
  icon?: IconsProps;
  actionClick(id: string): void;
};

export interface ContextMenuTypeProps {
  options: ButtonsContextMenu[];
  objectId: string;
  position: { top: string; left: string };
}

export function ContextMenu() {
  const context = useContextMenu();
  const [visible, setVisible] = useState(false);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (context.contextMenu) {
      setVisible(true);
      setShow(true);
    } else {
      setShow(false);
    }
  }, [context.contextMenu]);

  if (visible)
    return (
      <ContextMenuWrapper
        visible={show}
        css={{
          "--left": context.contextMenu?.position.left ?? "-100px",
          "--top": context.contextMenu?.position.top,
        }}
      >
        <ContextMenuContainer>
          <div>
            <ArrowDown />
          </div>

          {context.contextMenu?.options.map((option, indice) => (
            <Button
              key={indice}
              icon={option.icon}
              label={option.label}
              variant="text"
              onClick={() =>
                option.actionClick(context.contextMenu?.objectId! ?? 0)
              }
            />
          ))}
        </ContextMenuContainer>
      </ContextMenuWrapper>
    );
}

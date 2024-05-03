import {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { PopoverContainer, PopoverHeader, PopoverWrapper } from "./styles";
import { ArrowDown } from "../../assets/icons/ArrowDown";
import { Text } from "../Text";
import { Button } from "../Button";
import { IconsProps } from "../../assets/icons";
import { ButtonTypeStyledProps } from "../Button/styles";
import useTimeoutEffect from "../../hooks/useTimeoutEffect";

export interface PopoverTypeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactElement;
  title?: string;
  label?: string;
  icon?: IconsProps;
  variant?: ButtonTypeStyledProps;
}

export function Popover({
  label,
  title,
  icon,
  variant = "contained",
  children,
  ...rest
}: PopoverTypeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isNearLeft, setIsNearLeft] = useState(false);
  const [isNearRight, setIsNearRight] = useState(false);

  const [mouseClick, setMouseClick] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [dispatch, setDispatch] = useState(false);

  useEffect(() => {
    if (mouseClick) {
      setDispatch(mouseClick);
    } else {
      setShowPopover(false);
    }
  }, [mouseClick]);

  useEffect(() => {
    if (dispatch) {
      setShowPopover(dispatch);
    }
  }, [dispatch]);

  useLayoutEffect(() => {
    if (dispatch) {
      const handleResize = () => {
        const rect = wrapperRef.current!.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const margin = 16;

        setIsNearLeft(rect.left < margin);
        setIsNearRight(rect.right > windowWidth - margin);
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [showPopover]);

  useTimeoutEffect(
    () => {
      if (!showPopover) {
        setDispatch(false);
      }
    },
    [showPopover],
    200
  );

  return (
    <PopoverContainer {...rest}>
      <Button
        label={label}
        icon={icon}
        variant={variant}
        onClick={() => setMouseClick(!mouseClick)}
      />
      {dispatch && (
        <PopoverWrapper
          ref={wrapperRef}
          visible={showPopover}
          position={isNearLeft ? "left" : isNearRight ? "right" : "center"}
        >
          <PopoverHeader
            position={isNearLeft ? "left" : isNearRight ? "right" : "center"}
          >
            <div>
              <ArrowDown />
            </div>

            <Text>{title}</Text>
            <Button
              variant="text"
              icon="closeLinear"
              onClick={() => setMouseClick(false)}
            />
          </PopoverHeader>

          {children}
        </PopoverWrapper>
      )}
    </PopoverContainer>
  );
}

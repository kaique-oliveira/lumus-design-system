import { ReactElement, useLayoutEffect, useRef, useState } from "react";
import useTimeoutEffect from "../../hooks/useTimeoutEffect";
import { Text } from "../Text";
import { TooltipContainer, TooltipText, WrapperArrow } from "./styles";
import { ArrowDown } from "../../assets/icons/ArrowDown";

export interface TooltipTypeProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  children: ReactElement;
}

export function Tooltip({ label, children, ...rest }: TooltipTypeProps) {
  const tooltipTextRef = useRef<HTMLParagraphElement>(null);
  const [isNear, setIsNear] = useState(false);

  const [mouseOver, setMouseOver] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useTimeoutEffect(
    () => {
      if (mouseOver) {
        setShowTooltip(mouseOver);
      }
    },
    [mouseOver],
    1000
  );

  useTimeoutEffect(
    () => {
      if (!mouseOver) {
        setShowTooltip(false);
      }
    },
    [mouseOver],
    300
  );

  useLayoutEffect(() => {
    const handleResize = () => {
      const rect = tooltipTextRef.current!.getBoundingClientRect();

      const windowHeight = window.innerHeight;
      const margin = 16;

      setIsNear(rect.top < margin);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <TooltipContainer
      onMouseOut={() => setMouseOver(false)}
      onMouseOver={() => setMouseOver(true)}
      {...rest}
    >
      {children}
      <TooltipText
        sizeText={label.length <= 22 ? "small" : "large"}
        position={isNear ? "bottom" : "top"}
        ref={tooltipTextRef}
        visible={showTooltip}
      >
        <WrapperArrow position={isNear ? "bottom" : "top"}>
          {label}
          <div>
            <ArrowDown />
          </div>
        </WrapperArrow>
      </TooltipText>
    </TooltipContainer>
  );
}

import {
  ReactElement,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { PopoverContainer, PopoverHeader, PopoverWrapper } from './styles';
import { ArrowDown } from '../../assets/icons/ArrowDown';
import { Text } from '../Text';
import { Button } from '../Button';
import { IconsProps } from '../../assets/icons';
import { ButtonTypeStyledProps } from '../Button/styles';
import useTimeoutEffect from '../../hooks/useTimeoutEffect';

export interface PopoverTypeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactElement;
  title?: string;
  label?: string;
  icon?: IconsProps | ReactElement;
  iconPosition?: 'left' | 'right';
  variant?: ButtonTypeStyledProps;
  showHeader?: boolean;
  disabled?: boolean;
  modelAlign?: 'primary' | 'secondary';
}

export const Popover = forwardRef<HTMLButtonElement, PopoverTypeProps>(
  function Popover(
    {
      label,
      title,
      icon,
      iconPosition,
      variant = 'contained',
      children,
      showHeader = false,
      disabled = false,
      modelAlign = 'primary',
      ...rest
    },
    ref
  ) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isNearLeft, setIsNearLeft] = useState(false);
    const [isNearRight, setIsNearRight] = useState(false);

    const [mouseClick, setMouseClick] = useState(false);
    const [showPopover, setShowPopover] = useState(false);
    const [dispatch, setDispatch] = useState(false);

    // const refPopover = useRef<HTMLDivElement>(null);

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

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
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

    useEffect(() => {
      function handleCliqueFora(event: MouseEvent) {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setMouseClick(false);
        }
      }

      document.addEventListener('mousedown', handleCliqueFora);

      return () => {
        document.removeEventListener('mousedown', handleCliqueFora);
      };
    }, []);

    return (
      <PopoverContainer {...rest}>
        <Button
          ref={ref}
          disabled={disabled}
          label={label}
          icon={icon}
          iconPosition={iconPosition}
          variant={variant}
          onClick={() => setMouseClick(!mouseClick)}
        />

        {dispatch && (
          <PopoverWrapper
            ref={wrapperRef}
            css={{ '--modelAlign': modelAlign }}
            visible={showPopover}
            position={isNearLeft ? 'left' : isNearRight ? 'right' : 'center'}
          >
            <PopoverHeader
              position={isNearLeft ? 'left' : isNearRight ? 'right' : 'center'}
              style={
                !showHeader
                  ? {
                      height: '1px',
                      margin: '0px',
                      padding: '0px',
                      marginBottom: '-8px ',
                    }
                  : {}
              }
            >
              <div>
                <ArrowDown />
              </div>
              {showHeader && (
                <>
                  <Text>{title}</Text>
                  <Button
                    variant="text"
                    icon="close"
                    onClick={() => setMouseClick(false)}
                  />
                </>
              )}
            </PopoverHeader>

            {children}
          </PopoverWrapper>
        )}
      </PopoverContainer>
    );
  }
);

import { keyframes, styled } from '../../styles';

export const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(0)' },
  '100%': { opacity: 1, transform: 'translateY(2px)' },
});

export const PopoverContainer = styled('div', {
  position: 'relative',
  display: 'flex',
});

export const PopoverWrapper = styled('div', {
  userSelect: 'none',
  cursor: 'default',
  opacity: 0,

  maxWidth: '250px',
  minWidth: '40px',
  width: 'max-content',
  backgroundColor: '$gray300',

  borderRadius: '$sm',
  padding: '$4',
  position: 'absolute',
  zIndex: '10',
  top: '120%',

  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: '$2',

  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',

  variants: {
    visible: {
      true: {
        animation: `${slideUpAndFade} .2s forwards`,
      },
    },
    position: {
      left: {
        right: 0,
      },
      right: {
        left: 0,
      },
      center: {
        "--modelAlign === 'primary'": {
          left: '-50%',
          transform: 'translateX(50%)',
        },
        "--modelAlign === 'secondary'": {
          left: 0,
          right: 0,
          margin: 'auto',
        },
      },
    },
  },
});

export const PopoverHeader = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  marginBottom: '$2',

  variants: {
    position: {
      left: {
        div: {
          position: 'absolute',
          top: '-33px',
          left: '-8px',

          transform: 'rotate(180deg)',

          svg: {
            path: {
              fill: '$gray300',
            },
          },
        },
      },
      right: {
        div: {
          position: 'absolute',
          top: '-33px',
          right: '-8px',

          transform: 'rotate(180deg)',

          svg: {
            path: {
              fill: '$gray300',
            },
          },
        },
      },
      center: {
        div: {
          width: '18px',
          height: '16px',
          position: 'absolute',

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          top: '-18px',

          left: '50%',
          right: '50%',
          transform: 'translate(-50%, -50%) rotate(180deg)',

          svg: {
            path: {
              fill: '$gray300',
            },
          },
        },
      },
    },
  },

  button: {
    height: 'max-content',
    padding: '0px',
  },
});

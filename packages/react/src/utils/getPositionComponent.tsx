export const getPositionComponent = (
  event: React.MouseEvent<HTMLButtonElement>
): { top: string; left: string } => {
  const rect = event.currentTarget.getBoundingClientRect();
  const { top, left } = rect;

  const position = {
    top: `${top + 35}px`,
    left: `${left - 10}px`,
  };

  return position;
};

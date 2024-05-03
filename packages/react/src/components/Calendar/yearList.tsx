import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { styled } from "../../styles";
import useTimeoutEffect from "../../hooks/useTimeoutEffect";

const ContainerYear = styled("div", {
  width: "60px",
  height: "200px",
  overflowY: "scroll",
  overflowX: "none",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "$2",

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "$main200",
    borderRadius: "$xs",
  },

  "&::-webkit-scrollbar": {
    width: "6px",
    backgroundColor: "$main100",
    borderRadius: "$xs",
  },
});

const YearOption = styled("span", {
  width: "70%",

  fontSize: "$xs",
  fontFamily: "$default",
  color: "$text100",
  cursor: "pointer",
  textAlign: "center",

  padding: "$1",
  borderRadius: "$px",

  "&:hover": {
    background: "$main200",
    color: "$main300",
    transition: "all .2s",
  },

  variants: {
    selected: {
      true: {
        background: "$main300",
        color: "$gray300",
      },
    },
  },
});

interface YearListProps {
  startYear?: number;
  endYear?: number;
  yearSelected: number;
  onSelectedYear: Function;
}

export const YearList: React.FC<YearListProps> = ({
  startYear = new Date().getFullYear() - 100,
  endYear = new Date().getFullYear() + 20,
  yearSelected,
  onSelectedYear,
}) => {
  const [years, setYears] = useState<number[]>([]);
  const currentYearRef = useRef<HTMLSpanElement>(null);

  function Scrool() {
    if (currentYearRef.current) {
      currentYearRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }

  useEffect(() => {
    const yearsArray = Array.from(
      { length: endYear - startYear + 1 },
      (_, index) => startYear + index
    );
    setYears(yearsArray);
  }, [startYear, endYear]);

  useTimeoutEffect(
    () => {
      Scrool();
    },
    [yearSelected],
    100
  );

  return (
    <ContainerYear>
      {years.map((year) => (
        <YearOption
          key={year}
          onClick={() => onSelectedYear(year)}
          selected={year === yearSelected ? true : false}
          ref={year === yearSelected ? currentYearRef : null}
        >
          {year}
        </YearOption>
      ))}
    </ContainerYear>
  );
};

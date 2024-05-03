import { styled } from "../../styles";

export const CalendarContainer = styled("div", {
  width: "220px",
  height: "225px",

  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "$2",
  padding: "$4",

  background: "$gray300",
  borderRadius: "$px",
  position: "relative",
});

export const CalendarHeader = styled("div", {
  width: "100%",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "$2",
  marginBottom: "8px",

  ":nth-child(1)": {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "$1",

    span: {
      fontSize: "$xs",
      fontFamily: "$default",
      cursor: "pointer",
    },

    ":nth-child(1)": {
      color: "$text200",
      textTransform: "capitalize",
    },
    ":nth-child(2)": {
      color: "$text100",
    },
  },

  ":nth-child(2)": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    button: {
      svg: {
        width: "16px",
        height: "16px",
        viewBox: "0 0 16px 16px",
        path: {
          stroke: "$text100",
        },
      },
    },
  },
});

export const CalendarContainerWeekDay = styled("div", {
  width: "100%",

  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",

  justifyContent: "space-between",
  alignItems: "center",
  gap: "$2",

  span: {
    width: "100%",
    textAlign: "center",
    color: "$main200",
    fontSize: "$xxs",
    fontFamily: "$default",
  },
});

export const CalendarGridDays = styled("div", {
  width: "100%",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",

  gap: "$2",
});

export const CalendarDay = styled("div", {
  width: "100%",

  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",

  justifyContent: "space-between",
  alignItems: "center",
  gap: "$1",

  variants: {
    state: {
      selected: {
        background: "$main300",
        color: "$gray300",
      },
      current: {
        background: "$gray100",
      },
      deselected: {
        "&:hover": {
          background: "$main100",
          color: "$main300",
        },
      },
    },
  },

  div: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    fontSize: "$xs",
    fontFamily: "$default",

    padding: "4px 0",
    borderRadius: "4px",
    cursor: "pointer",
  },
});

export const CalendarContainerMonths = styled("div", {
  width: "100%",
  height: "100%",

  position: "absolute",

  top: "50%",
  left: "50%",
  right: "50%",
  transform: "translate(-50%, -50%)",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "transparent",
  backdropFilter: "blur(.8px)",

  "& > :nth-child(2)": {
    width: "90%",
    height: "68%",

    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(4, 1fr)",
    padding: "$1",

    gap: "$1",
    borderRadius: " 0 0 $px $px",

    background: "$main100",

    div: {
      borderRadius: "$px",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      fontSize: "$xxs",
      fontFamily: "$default",
      cursor: "pointer",
      padding: "0 $2",

      "&:hover": {
        background: "$main200",
        color: "$gray300",
        transition: "all .2s",
      },
    },
  },
});

export const CalendarMonthsHeader = styled("div", {
  width: "93.176%",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "$main100",
  borderRadius: "$px $px 0 0",
  padding: "2px $2",
  boxSizing: "border-box",

  span: {
    fontSize: "$xs",
    fontFamily: "$default",
    color: "$main300",
  },

  button: {
    marginRight: "-8px",
    svg: {
      width: "16px",
      height: "16px",
      viewBox: "0 0 16px 16px",
      path: {
        stroke: "$text100",
      },
    },
  },
});

export const CalendarContainerYears = styled("div", {
  width: "100%",
  height: "100%",

  position: "absolute",

  top: "50%",
  left: "50%",
  right: "50%",
  transform: "translate(-50%, -50%)",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",

  backgroundColor: "transparent",
  backdropFilter: "blur(.8px)",

  "& > :nth-child(1)": {
    width: "66.5%",
  },

  "& > :nth-child(2)": {
    width: "60%",
    height: "190px",

    overflow: "none",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    padding: "$2",

    gap: "$1",
    borderRadius: "0 0 $px $px",

    background: "$main100",
  },
});

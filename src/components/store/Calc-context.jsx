import React from "react";

const CalcContext = React.createContext({
  screen: "",
  answer: false,
  btnClick: () => {},
});
export default CalcContext;

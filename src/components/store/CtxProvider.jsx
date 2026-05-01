import { useReducer } from "react";
import CalcContext from "./Calc-context";

const defaltState = {
  screen: "",
  answer: false,
};

function dotInspector(regEx) {
  const regexCheck = regEx
    .match(/[0-9.]+/g)
    ?.at(-1)
    .includes(".");
  return regexCheck;
}

// function commaAdder(text) {
//   let treshHold = 3;
//   const textWithComma = text.match(/\d+/).at(0);
//   if (text.length === treshHold) textWithComma;
// }

function calcReducer(state, action) {
  if (action.type === "clear") {
    let display;
    if (action.text === "RESET") display = "";

    if (action.text === "DEL") {
      const currDisplay = state.screen;
      display = currDisplay.slice(0, -1);
    }
    return { screen: display, answer: state.answer && true };
  }

  if (action.type === "number" || action.type === "operator") {
    const prevScreen = { screen: state.screen };
    // To make sure DOT only exist between numbers
    if (dotInspector(state.screen) && action.text === ".") return prevScreen;

    // preventing double or more different operators from being together
    if (/[*/+-.]$/.test(state.screen) && /[/*.+]/.test(action.text))
      return prevScreen;

    // preventing minus from being more than 2 on a row
    if (/[-]$/.test(state.screen) && /[-]/.test(action.text)) return prevScreen;

    // preventing calculations from begining with invalid operators
    if (state.screen === "" && /[/*.+]/.test(action.text))
      return { screen: `0${action.text}` };

    const display = state.screen + action.text;
    return { screen: display };
  }

  if (action.type === "equal" && state.screen !== "") {
    let display, ansCalc;
    if (/[-+/*]$/.test(state.screen)) {
      const validCalc = state.screen.slice(0, -1);
      ansCalc = eval(validCalc);
    } else {
      ansCalc = eval(state.screen);
    }
    display = `${ansCalc}`;
    return { screen: display, answer: true };
  }
  return defaltState;
}

function ContextProvider(props) {
  const [calcState, calcActionDispatcher] = useReducer(
    calcReducer,
    defaltState,
  );

  const clickHandler = (type, text) => {
    calcActionDispatcher({ type, text });
  };

  const interCtx = {
    screen: calcState.screen,
    answer: calcState.answer,
    btnClick: clickHandler,
  };
  return (
    <CalcContext.Provider value={interCtx}>
      {props.children}
    </CalcContext.Provider>
  );
}

export default ContextProvider;

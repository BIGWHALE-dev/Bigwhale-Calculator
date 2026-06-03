import { evaluate } from "mathjs";
import { dotInspector } from "./effectHandler";

function useCalculatorLogic({ currDisplay, writeOnScreen, setAnswer }) {
  return (type, text) => {
    if (type === "clear") {
      if (text === "RESET") writeOnScreen([""]);

      if (text === "DEL") writeOnScreen((prev) => [prev.join("").slice(0, -1)]);
    }

    if (type === "number" || type === "operator") {
      setAnswer(false);
      const prevScreen = () => writeOnScreen((prev) => prev);

      const displayString = currDisplay.join("");

      // To make sure only 1 DOT exist between numbers
      if (dotInspector(currDisplay) && text === ".") return prevScreen();

      // preventing operators and DOT from being together
      if (/[*/+-.]$/.test(displayString) && /[/*.+]/.test(text))
        return prevScreen();

      // preventing minus from being more than 2 on a row
      if (/[-]$/.test(displayString) && /[-]/.test(text)) return prevScreen();

      // preventing calculations from begining with invalid operators
      if (
        currDisplay.at(-1) === "" &&
        currDisplay.length === 1 &&
        /[/*.+]/.test(text)
      )
        return prevScreen();

      writeOnScreen((prev) => {
        const exprArray = [...prev];
        if (type === "number") {
          exprArray[exprArray.length - 1] += text;
        }

        if (type === "operator") {
          if (
            currDisplay.at(-1) === "" &&
            currDisplay.length === 1 &&
            /[-]/.test(text)
          ) {
            exprArray.pop();
          }
          exprArray.push(text, "");
        }
        return exprArray;
      });
    }

    if (type === "equal" && currDisplay.join("") !== "") {
      let ansCalc;

      if (currDisplay.at(-1) === "") {
        const validCalc = currDisplay.slice(0, -2);
        ansCalc = evaluate(validCalc.join(""));
      } else {
        ansCalc = evaluate(currDisplay.join(""));
      }

      writeOnScreen([`${ansCalc}`]);
      setAnswer(true);
    }
  };
}

export default useCalculatorLogic;

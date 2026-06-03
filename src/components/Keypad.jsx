import "./Keypad.css";
import Btn from "./UI/Button";
import { dotInspector } from "./controller/effectHandler";

import { evaluate } from "mathjs";

const keyTexts = [
  { text: "7", type: "number", action: "seven" },
  { text: "8", type: "number", action: "eight" },
  { text: "9", type: "number", action: "nine" },
  { text: "DEL", type: "clear", action: "del" },
  { text: "4", type: "number", action: "four" },
  { text: "5", type: "number", action: "five" },
  { text: "6", type: "number", action: "six" },
  { text: "+", type: "operator", action: "add" },
  { text: "1", type: "number", action: "one" },
  { text: "2", type: "number", action: "two" },
  { text: "3", type: "number", action: "three" },
  { text: "-", type: "operator", action: "subtract" },
  { text: ".", type: "number", action: "dot" },
  { text: "0", type: "number", action: "zero" },
  { text: "/", type: "operator", action: "divide" },
  { text: "*", type: "operator", action: "multiply" },
  { text: "RESET", type: "clear", action: "reset" },
  { text: "=", type: "equal", action: "equals" },
];

function Keypad(props) {
  const btnClickHandler = (type, text) => {
    if (type === "clear") {
      if (text === "RESET") props.writeOnScreen([""]);

      if (text === "DEL")
        props.writeOnScreen((prev) => [prev.join("").slice(0, -1)]);
    }

    if (type === "number" || type === "operator") {
      props.answer(false);
      const prevScreen = () => props.writeOnScreen((prev) => prev);

      // To make sure only 1 DOT exist between numbers
      if (dotInspector(props.currDisplay) && text === ".") return prevScreen();

      // preventing operators and DOT from being together
      if (/[*/+-.]$/.test(props.currDisplay.join("")) && /[/*.+]/.test(text))
        return prevScreen();

      // preventing minus from being more than 2 on a row
      if (/[-]$/.test(props.currDisplay.join("")) && /[-]/.test(text))
        return prevScreen();

      // preventing calculations from begining with invalid operators
      if (
        props.currDisplay.at(-1) === "" &&
        props.currDisplay.length === 1 &&
        /[/*.+]/.test(text)
      )
        return prevScreen();

      props.writeOnScreen((prev) => {
        const exprArray = [...prev];
        if (type === "number") {
          exprArray[exprArray.length - 1] += text;
        }

        if (type === "operator") {
          if (
            props.currDisplay.at(-1) === "" &&
            props.currDisplay.length === 1 &&
            /[-]/.test(text)
          ) {
            exprArray.pop();
          }
          exprArray.push(text, "");
        }
        return exprArray;
      });
    }

    if (type === "equal" && props.currDisplay !== "") {
      let ansCalc;

      if (props.currDisplay.at(-1) === "") {
        const validCalc = props.currDisplay.slice(0, -2);
        ansCalc = evaluate(validCalc.join(""));
      } else {
        ansCalc = evaluate(props.currDisplay.join(""));
      }

      props.writeOnScreen([ansCalc]);
      props.answer(true);
    }
  };

  return (
    <div className="keypad">
      {keyTexts.map((key, index) => (
        <Btn
          className={key.type}
          key={index}
          features={{ "aria-label": key.action }}
          onclick={btnClickHandler.bind(null, key.type, key.text)}
        >
          {key.text}
        </Btn>
      ))}
    </div>
  );
}

export default Keypad;

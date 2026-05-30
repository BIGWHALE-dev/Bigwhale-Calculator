import "./Keypad.css";
import Btn from "./UI/Button";
import { evaluate } from "mathjs";

import { commaAdder2, dotInspector } from "./controller/effectHandler";

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
      if (text === "RESET") props.writeOnScreen("");

      if (text === "DEL") props.writeOnScreen((prev) => prev.slice(0, -1));
    }

    if (type === "number" || type === "operator") {
      props.answer(false);
      const prevScreen = () => props.writeOnScreen((prev) => prev);

      // To make sure DOT only exist between numbers
      if (dotInspector(props.currDisplay) && text === ".") return prevScreen();

      // preventing double or more different operators from being together
      if (/[*/+-.]$/.test(props.currDisplay) && /[/*.+]/.test(text))
        return prevScreen();

      // preventing minus from being more than 2 on a row
      if (/[-]$/.test(props.currDisplay) && /[-]/.test(text))
        return prevScreen();

      // preventing calculations from begining with invalid operators
      if (props.currDisplay === "" && /[/*.+]/.test(text))
        return props.writeOnScreen(`0${text}`);

      props.writeOnScreen((prev) => {
        const expression = `${prev}${text}`;
        return expression;
      });
      //
      commaAdder2(text, type);
    }

    if (type === "equal" && props.currDisplay !== "") {
      let ansCalc;
      const calcExpression = props.currDisplay.replaceAll(",", "");

      if (/[-+/*]$/.test(props.currDisplay)) {
        const validCalc = calcExpression.slice(0, -1);
        ansCalc = evaluate(validCalc);
      } else {
        ansCalc = evaluate(calcExpression);
      }

      props.writeOnScreen(`${ansCalc.toLocaleString("en-US")}`);
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

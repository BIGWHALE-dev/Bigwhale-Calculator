import { useContext } from "react";
import "./Keypad.css";
import Btn from "./UI/Button";
import CalcContext from "./store/Calc-context";

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

function Keypad() {
  const calcCtx = useContext(CalcContext);
  const btnClickHandler = (type, text) => {
    calcCtx.btnClick(type, text);
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

import "./Calculator.css";
import Display from "./Display";
import Head from "./Head";
import Keypad from "./Keypad";
import { useState } from "react";

function Calculator() {
  const [screen, setScreen] = useState("");
  const [answer, setAnswer] = useState(false);

  return (
    <section className="calculator">
      <Head />
      <Display display={screen} answer={answer} />
      <Keypad
        writeOnScreen={setScreen}
        answer={setAnswer}
        currDisplay={screen}
      />
    </section>
  );
}

export default Calculator;

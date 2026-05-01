import "./Calculator.css";
import Display from "./Display";
import Head from "./Head";
import Keypad from "./Keypad";

function Calculator() {
  return (
    <section className="calculator">
      <Head />
      <Display />
      <Keypad />
    </section>
  );
}

export default Calculator;

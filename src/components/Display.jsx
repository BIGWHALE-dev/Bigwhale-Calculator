import { useContext } from "react";
import "./Display.css";
import CalcContext from "./store/Calc-context";

function Display() {
  const calcCtx = useContext(CalcContext);
  return (
    <div className="input-container">
      <input
        type="text"
        id="screen"
        readOnly
        className={calcCtx.answer ? "total" : ""}
        value={calcCtx.screen}
      />
    </div>
  );
}

export default Display;

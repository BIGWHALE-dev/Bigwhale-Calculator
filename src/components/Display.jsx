import "./Display.css";

function Display(props) {
  return (
    <div className="input-container">
      <input
        type="text"
        id="screen"
        readOnly
        className={props.answer ? "total" : ""}
        value={props.display}
      />
    </div>
  );
}

export default Display;

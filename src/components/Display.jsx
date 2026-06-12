import "./Display.css";

function Display(props) {
  return (
    <div className="input-container">
      <input
        type="text"
        id="screen"
        readOnly
        className={props.answer ? "total" : ""}
        value={props.display
          .map((el) => {
            if (!isNaN(+el)) {
              if (el.endsWith(".")) {
                return `${Intl.NumberFormat("en-us").format(el.slice(0, -1))}.`;
              }
              return Intl.NumberFormat("en-us").format(el);
            } else return el;
          })
          .join(" ")}
      />
    </div>
  );
}

export default Display;

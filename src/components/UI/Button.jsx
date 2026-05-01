import "./Button.css";
function Btn(props) {
  const classes = `button ${props.className || ""}`;
  return (
    <button className={classes} {...props.features} onClick={props.onclick}>
      {props.children}
    </button>
  );
}

export default Btn;

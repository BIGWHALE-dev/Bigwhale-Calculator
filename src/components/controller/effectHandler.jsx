export function dotInspector(regEx) {
  const regexCheck = regEx
    .match(/[0-9.]+/g)
    ?.at(-1)
    .includes(".");
  return regexCheck;
}

// function commaAdder(text) {
//   // let treshHold = 3;
//   let arr = [""];
//   const num = text.match(/\d+/g)?.at(0);
//   // const opr = text
//   //   .match(/[+-/*]/g)
//   //   ?.at(0)
//   //   .push(arr);
//   // if (text.length === treshHold) textWithComma;
//   console.log(arr, num);
// }

let disp = [""];
export function commaAdder2(text, type) {
  const myScreen = Intl.NumberFormat("en-Us", { notation: "standard" });
  myScreen.format(disp);
  if (type === "number") {
    disp[disp.length - 1] += text;
    console.log(disp);
  }

  if (type === "operator") {
    disp.push(text, "");
    console.log(disp);
  }
}

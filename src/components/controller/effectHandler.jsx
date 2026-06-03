export function dotInspector(regEx) {
  const regexCheck = regEx.at(-1).includes(".");
  return regexCheck;
}

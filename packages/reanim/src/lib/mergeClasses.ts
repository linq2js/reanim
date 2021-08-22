export default function mergeClasses(...classes: string[]): string {
  if (classes.length == 0) return "";
  if (classes.length === 1) return classes[0] ? classes[0] : "";
  return classes.reduce(
    (result, c) => (c ? (result ? result + " " + c : c) : result),
    ""
  );
}

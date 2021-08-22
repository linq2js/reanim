export default function addPrefix(className: string) {
  if (!className) return "";
  return "animate__" + className;
}

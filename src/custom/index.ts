import { CustomAnimationType } from "../lib/types";

export * from "./reset";
export * from "./collapsible";

export function Custom(name: string): CustomAnimationType {
  return {
    class: () => name,
  };
}

import type { PropertyType } from "./types";

export const getPropertyType = (property: unknown): PropertyType => {
  if (typeof property === "string") {
    return "string";
  }

  if (typeof property === "number") {
    return "number";
  }

  if (typeof property === "boolean") {
    return "boolean";
  }

  if (Array.isArray(property)) {
    return "array";
  }

  return "object";
};

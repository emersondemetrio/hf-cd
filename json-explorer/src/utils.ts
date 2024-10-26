import type { InlineValue, JsonLike, PropertyType } from "./types";

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

export const delay = (callback: () => void, ms = 500) => {
  setTimeout(callback, ms);
};

const toCamelCase = (input: string): string =>
  input.replace(/-([a-z])/g, (_: string, match: string) => match.toUpperCase());

const parseArrayNotation = (segment: string): [string, number?] => {
  // Extracts array index from a path segment (e.g., "fields[0]" -> ["fields", 0])
  const match = /^(.*?)\[(\d+)\]$/.exec(segment);

  if (match) {
    const [, prop, index] = match;
    return [prop ?? "", parseInt(index ?? "0", 10)];
  }

  return [segment];
};

type KeyInResult =
  | string
  | number
  | boolean
  | JsonLike
  | JsonLike[]
  | undefined
  | null;

export const isInlineValue = (value: KeyInResult): boolean =>
  typeof value === "string" || typeof value === "number" ||
  typeof value === "boolean";

export const getKeyIn = (
  data: JsonLike,
  keyPath: string,
  rootKey?: string,
): KeyInResult => {
  const fullPath = toCamelCase(rootKey ? `${rootKey}.${keyPath}` : keyPath);

  // Split by dots but preserve array notation
  const segments = fullPath.split(/\.(?![^\[]*\])/);
  let result: KeyInResult = data;

  for (const segment of segments) {
    if (result == null) break;

    const [prop, arrayIndex] = parseArrayNotation(segment);

    console.log(`prop,arrayIndex`, prop, arrayIndex);

    // Get the value for the current property
    result = typeof result === "object" && result !== null
      ? (result as JsonLike)[prop]
      : undefined;

    // If we have an array index, try to access it
    if (arrayIndex !== undefined) {
      result = Array.isArray(result) ? result[arrayIndex] : undefined;
    }
  }

  console.log(`result`, result);

  return result;
};

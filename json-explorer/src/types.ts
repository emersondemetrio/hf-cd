export type JsonLike = {
  [key: string]:
    | string
    | number
    | boolean
    | undefined
    | null
    | JsonLike
    | JsonLike[]
    | Record<string, JsonLike>;
};

export type OnPropertyClickFn = (path: string, property: string) => void;

export type PropertyType = "string" | "number" | "boolean" | "object" | "array";

export type ValueType = string | number | boolean | JsonLike;

export type ViewerFn = (
  path: string,
  property: string,
  value: ValueType,
  onClick: OnPropertyClickFn,
) => JSX.Element;

export type ViewerMapType = Record<PropertyType, ViewerFn>;

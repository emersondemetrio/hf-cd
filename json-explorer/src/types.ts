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

export type PropertyType = "string" | "number" | "boolean" | "object" | "array";

export type InlineValue = string | number | boolean;

export type ValueType = InlineValue | JsonLike;

export type OnPropertyClickFn = (fullPath: string, value: InlineValue) => void;

export type ViewerFn = (
  path: string,
  property: string,
  value: ValueType,
  onClick: OnPropertyClickFn,
) => JSX.Element;

export type ViewerMapType = Record<PropertyType, ViewerFn>;

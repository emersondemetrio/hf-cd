import {
  type JsonLike,
  type OnPropertyClickFn,
  type PropertyType,
} from "~/types";
import { InlineViewer } from "./components/inline-viewer";
import { getPropertyType } from "~/utils";

const renderViewer = (
  path: string,
  property: string,
  value: PropertyType,
  onClick: OnPropertyClickFn,
) => {
  const propertyType = getPropertyType(value);
  switch (propertyType) {
    case "string":
    case "number":
    case "boolean":
      return (
        <InlineViewer
          path={path}
          property={property}
          propertyType={propertyType}
          value={propertyType === "string" ? value : value.toString()}
          onClick={onClick}
        />
      );

    case "object":
    case "array":
      return (
        <DataViewer
          originalKey={property}
          path={path}
          renderAsArray={propertyType === "array"}
          onPropertyClick={onClick}
          data={value as unknown as JsonLike}
        />
      );

    default:
      return <strong>Not possible {propertyType}</strong>;
  }
};

export type DataViewProps = {
  path?: string;
  originalKey?: string;
  renderAsArray?: boolean;
  data: JsonLike;
  onPropertyClick: OnPropertyClickFn;
};

export const DataViewer = (
  { path, originalKey, data, renderAsArray, onPropertyClick }: DataViewProps,
) => {
  console.log(`renderAsArray`, renderAsArray);

  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

      {originalKey && (
        <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
          <div className="font-bold">{originalKey}</div>
        </div>
      )}

      {Object.keys(data).map((key) => {
        const originalPath = path ? `${path}.${key}` : key;

        return (
          <div
            key={key}
            className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700"
          >
            {renderViewer(
              originalPath,
              key,
              data[key] as PropertyType,
              onPropertyClick,
            )}
          </div>
        );
      })}
    </div>
  );
};

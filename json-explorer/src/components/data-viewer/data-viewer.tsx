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
  level: number,
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
          level={level + 1}
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
  level: number;
};

export const DataViewer = ({
  level,
  path,
  originalKey,
  data,
  renderAsArray,
  onPropertyClick,
}: DataViewProps) => {
  // console.log(`renderAsArray`, renderAsArray);
  const marginLeft = level ? `ml-${level}` : `ml-0`;
  const parentType = getPropertyType(data);

  return (
    <div className={`w-full p-6 border shadow ${marginLeft}`}>
      <span>level {level}</span>
      {!path && <span>{"{"}</span>}
      {originalKey && (
        <div className="flex items-center justify-between p-2 border-b">
          <div className="font-bold">
            {originalKey}
            {renderAsArray && <span>{": ["}</span>}
          </div>
        </div>
      )}

      {Object.keys(data).map((key) => {
        let originalPath = "";

        if (parentType === "array") {
          originalPath = path ? `${path}[${key}]` : key;
        }

        if (parentType === "object") {
          originalPath = path ? `${path}.${key}` : key;
        }

        return (
          <div
            key={key}
            className="flex items-center justify-between p-2 border-b dark:border-gray-700"
          >
            {renderViewer(
              originalPath,
              key,
              data[key] as PropertyType,
              onPropertyClick,
              level,
            )}
          </div>
        );
      })}
      {renderAsArray && <span>{"]"}</span>}
      {!path && <span>{"}"}</span>}
    </div>
  );
};

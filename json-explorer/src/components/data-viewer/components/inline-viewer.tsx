import { type InlineValue, type PropertyType } from "~/types";
import { PropertyLink } from "./property-link";

type InlineViewerProps = {
  path: string;
  property: string;
  value: InlineValue;
  propertyType: PropertyType;
  onClick: (path: string, property: InlineValue) => void;
};

export const InlineViewer = ({
  path,
  property,
  propertyType,
  value,
  onClick,
}: InlineViewerProps) => {
  return (
    <div>
      <PropertyLink
        property={property}
        onClick={() => onClick(path, value)}
      />
      <span className="ml-2">
        {propertyType === "string" && <>{`'${value}'`}</>}
        {propertyType === "number" && <>{value}</>}
        {propertyType === "boolean" && <>{value ? "true" : "false"}</>}
      </span>
    </div>
  );
};

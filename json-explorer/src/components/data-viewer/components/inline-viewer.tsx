import { type PropertyType } from "~/types";
import { PropertyLink } from "./property-link";

type InlineViewerProps = {
  path: string;
  property: string;
  value: string | number | boolean;
  propertyType: PropertyType
  onClick: (path: string, property: string) => void;
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
        onClick={() => onClick(path, property)}
      />
      <span className="ml-2">{
        propertyType === "string" ? `'${value}'` : value
      }</span>
    </div>
  );
};

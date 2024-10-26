type PropertyLinkProps = {
  property: string;
  onClick: (property: string) => void;
};

export const PropertyLink = ({ property, onClick }: PropertyLinkProps) => {
  return (
    <div
      className="inline-flex font-medium items-center text-blue-600 hover:underline"
      onClick={() => onClick(property)}
    >
      {property}:
    </div>
  );
};

import { type InlineValue } from "~/types";

type InputBlockProps = {
  label: string;
  placeholder: string;
  value?: string;
  propertyValue?: InlineValue | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const noop = () => null;

const renderValue = (value: InlineValue | null | undefined) => {
  console.log(`value`, value);

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  return "undefined";
};

export const InputBlock = ({
  label,
  placeholder,
  propertyValue,
  value,
  onChange = noop,
}: InputBlockProps) => {
  return (
    <div className="w-full">
      <label className="block 0 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <small>{renderValue(propertyValue)}</small>
    </div>
  );
};

type InputBlockProps = {
  label: string;
  placeholder: string;
  help?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const noop = () => null;

export const InputBlock = ({
  label,
  placeholder,
  help,
  onChange = noop,
}: InputBlockProps) => {
  return (
    <div className="w-full">
      <label className="block 0 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <small>{help ?? "undefined"}</small>
    </div>
  );
};

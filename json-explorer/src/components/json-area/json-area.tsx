type JsonAreaProps = Record<string, unknown>;

export const JsonArea = (props: JsonAreaProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-12 px-4 py-16">
      <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
        JSON Area
      </h1>
    </div>
  );
};

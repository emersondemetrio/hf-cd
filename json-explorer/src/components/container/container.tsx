import { DataViewer } from "../data-viewer/data-viewer";
import { RightIcon } from "../icons/right";
import { InputBlock } from "../input-block/input-block";

export const Container = () => {
  const demoData = {
    "eae": "man",
    "age": 25,
    "date": "2021-10-27T07:49:14.896Z",
    "hasError": false,
    "fields": [
      {
        "id": "4c212130",
        "prop": "iban",
        "value": "DE81200505501265402568",
        "hasError": false,
      },
      {
        "id": "eaeman2",
        "prop": "iban",
        "value": "DE81200505501265402568",
        "hasError": false,
      },
    ],
  };

  const onPropertyClick = (path: string, property: string) => {
    console.log(path, property);
  };

  return (
    <div className="container mx-auto px-4 ">
      <div className="grid grid-cols-[45%_10%_45%] gap-4">
        <InputBlock
          label="Property"
          placeholder="Type..."
          onChange={(e) => console.log(e.target.value)}
        />
        <div className="flex items-center justify-center">
          <RightIcon />
        </div>
        <InputBlock
          label="Block/Variable"
          placeholder="Variable"
        />

        <div className="col-span-3 w-full">
          <label className="block 0 text-sm font-bold mb-2">
            Response
          </label>
          <DataViewer data={demoData} onPropertyClick={onPropertyClick} />
        </div>
      </div>
    </div>
  );
};

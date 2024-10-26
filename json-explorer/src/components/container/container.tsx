import { useState } from "react";
import { DataViewer } from "../data-viewer/data-viewer";
import { RightIcon } from "../icons/right";
import { InputBlock } from "../input-block/input-block";
import { type InlineValue, type ValueType } from "~/types";
import { delay, getKeyIn, isInlineValue } from "~/utils";

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

  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [value, setValue] = useState<InlineValue | null>(null);

  const onPropertyClick = (path: string, value: InlineValue) => {
    setSelectedProperty(path);
    setValue(value);
  };

  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // what is up with res?
    const data = getKeyIn(demoData, e.target.value.replace("res.", ""));

    setSelectedProperty(e.target.value);

    if (
      isInlineValue(data)
    ) {
      setValue(data as InlineValue);
    } else {
      setValue(null);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      <div className="mt-10 mb-10">
        <h3>JSON Explorer</h3>
      </div>
      <div className="grid grid-cols-[45%_10%_45%] gap-4">
        <InputBlock
          label="Property"
          placeholder="Type..."
          value={selectedProperty}
          propertyValue={value}
          onChange={handlePropertyChange}
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
          <div className="bg-white w-full">
            <DataViewer
              path="res"
              level={1}
              data={demoData}
              onPropertyClick={onPropertyClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

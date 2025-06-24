"use client";
import React, { useState } from "react";

export type InvoiceColumn =
  | "srNo"
  | "description"
  | "quantity"
  | "uom"
  | "netWeight"
  | "pricePerItem"
  | "tax";

const columnOptions: { key: InvoiceColumn; label: string; defaultChecked: boolean }[] = [
  { key: "srNo", label: "Sr. No.", defaultChecked: true },
  { key: "description", label: "Description", defaultChecked: true },
  { key: "quantity", label: "Quantity", defaultChecked: true },
  { key: "uom", label: "Unit of Measure (UOM)", defaultChecked: false },
  { key: "netWeight", label: "Net Weight", defaultChecked: false },
  { key: "pricePerItem", label: "Price per Item", defaultChecked: true },
  { key: "tax", label: "Tax", defaultChecked: false },
];

type Props = {
  selected: InvoiceColumn[];
  onChange: (columns: InvoiceColumn[]) => void;
  onSubmit: (taxRate?: string) => void;
};


const ColumnSelector: React.FC<Props> = ({ selected, onChange, onSubmit }) => {
  const [taxRate, setTaxRate] = useState<string>("");

  const handleCheckbox = (col: InvoiceColumn) => {
    if (selected.includes(col)) {
      onChange(selected.filter((c) => c !== col));
      if (col === "tax") {
        setTaxRate("");
      }
    } else {
      onChange([...selected, col]);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(taxRate);
      }}
      className="space-y-6"
    >
      <div>
        <div className="font-semibold mb-2">Select Invoice Item Columns:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {columnOptions.map((col) => (
            <label key={col.key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.includes(col.key)}
                onChange={() => handleCheckbox(col.key)}
                className="accent-blue-600"
              />
              {col.label}
            </label>
          ))}
        </div>
        {selected.includes("tax") && (
          <div className="mt-2">
            <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700">
              Tax Percentage (%)
            </label>
            <input
              type="number"
              id="taxRate"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
        )}
        <div className="mt-4 text-xs text-gray-500">
          <span className="font-semibold">Note:</span> “Total Price” column is always included and calculated as <br />
          <span className="italic">Total Price = Quantity × Price/Item</span>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Next
      </button>
    </form>
  );
};

export { columnOptions };
export default ColumnSelector;
"use client";
import React, { useState } from "react";
import Image from "next/image";
import type { InvoiceColumn } from "./ColumnSelector";

export type InvoiceItem = {
  description?: string;
  quantity?: number;
  uom?: string;
  netWeight?: string;
  pricePerItem?: number;
  taxed?: boolean;
};

type Props = {
  columns: InvoiceColumn[];
  onSubmit: (items: InvoiceItem[], subtotal: number) => void;
  onPreview: (items: InvoiceItem[], subtotal: number) => void;
};

const defaultItem = (columns: InvoiceColumn[]): InvoiceItem => {
  const item: InvoiceItem = {};
  if (columns.includes("description")) item.description = "";
  if (columns.includes("quantity")) item.quantity = 1;
  if (columns.includes("uom")) item.uom = "";
  if (columns.includes("netWeight")) item.netWeight = "";
  if (columns.includes("pricePerItem")) item.pricePerItem = 0;
  return item;
};

const InvoiceItemsTable: React.FC<Props> = ({ columns, onSubmit, onPreview }) => {
  const [items, setItems] = useState<InvoiceItem[]>([defaultItem(columns)]);

  const addItem = () => setItems([...items, defaultItem(columns)]);
  const deleteItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  const duplicateItem = (idx: number) => setItems([...items.slice(0, idx + 1), { ...items[idx] }, ...items.slice(idx + 1)]);

  const updateItem = (idx: number, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));
  };

  const getTotalPrice = (item: InvoiceItem) =>
    (columns.includes("quantity") ? Number(item.quantity) || 0 : 0) *
    (columns.includes("pricePerItem") ? Number(item.pricePerItem) || 0 : 0);

  const subtotal = items.reduce((sum, item) => sum + getTotalPrice(item), 0);

  return (
    <div className="space-y-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(items, subtotal);
        }}
      >
        <div className="flex justify-end gap-2 mb-4">
          <button
            type="button"
            onClick={() => onPreview(items, subtotal)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Preview Invoice
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr>
                <th className="border px-2 py-1">Sr. No.</th>
                {columns.includes("description") && <th className="border px-2 py-1">Description</th>}
                {columns.includes("quantity") && <th className="border px-2 py-1">Quantity</th>}
                {columns.includes("uom") && <th className="border px-2 py-1">UOM</th>}
                {columns.includes("netWeight") && <th className="border px-2 py-1">Net Weight</th>}
                {columns.includes("pricePerItem") && <th className="border px-2 py-1">Price/Item</th>}
                <th className="border px-2 py-1">Total Price</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1 text-center">{idx + 1}</td>
                  {columns.includes("description") && (
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        value={item.description || ""}
                        onChange={(e) => updateItem(idx, "description", e.target.value)}
                        className="w-full border rounded px-1 py-0.5"
                        required
                      />
                    </td>
                  )}
                  {columns.includes("quantity") && (
                    <td className="border px-2 py-1">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity ?? 1}
                        onChange={(e) => updateItem(idx, "quantity", Number(e.target.value))}
                        className="w-20 border rounded px-1 py-0.5"
                        required
                      />
                    </td>
                  )}
                  {columns.includes("uom") && (
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        value={item.uom || ""}
                        onChange={(e) => updateItem(idx, "uom", e.target.value)}
                        className="w-20 border rounded px-1 py-0.5"
                      />
                    </td>
                  )}
                  {columns.includes("netWeight") && (
                    <td className="border px-2 py-1">
                      <input
                        type="text"
                        value={item.netWeight || ""}
                        onChange={(e) => updateItem(idx, "netWeight", e.target.value)}
                        className="w-20 border rounded px-1 py-0.5"
                      />
                    </td>
                  )}
                  {columns.includes("pricePerItem") && (
                    <td className="border px-2 py-1">
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        value={item.pricePerItem ?? 0}
                        onChange={(e) => updateItem(idx, "pricePerItem", Number(e.target.value))}
                        className="w-20 border rounded px-1 py-0.5"
                        required
                      />
                    </td>
                  )}
                  <td className="border px-2 py-1 text-center">
                    {getTotalPrice(item).toFixed(2)}
                  </td>
                  <td className="border px-2 py-1 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() => duplicateItem(idx)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-md shadow-md transition"
                        aria-label="Duplicate item"
                      >
                        <Image
                          width={24}
                          height={24}
                          src="https://img.icons8.com/material-rounded/24/duplicate.png"
                          alt="duplicate"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteItem(idx)}
                        className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-md shadow-md transition"
                        aria-label="Delete item"
                      >
                        <Image
                          width={16}
                          height={16}
                          src="https://img.icons8.com/small/16/filled-trash.png"
                          alt="filled-trash"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={addItem}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Item
          </button>
          <div className="text-lg font-semibold">
            Subtotal: <span className="text-blue-700">{subtotal.toFixed(2)}</span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded mt-4"
        >
          Generate Invoice
        </button>
      </form>
    </div>
  );
};

export default InvoiceItemsTable;
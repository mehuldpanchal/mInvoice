"use client";
import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import InvoicePDFTemplate from "./InvoicePDFTemplate";
import Stepper from "./Stepper";
import CompanyDetailsForm from "./CompanyDetailsForm";
import BillToForm from "./BillToForm";
import ColumnSelector, { columnOptions, InvoiceColumn } from "./ColumnSelector";
import InvoiceItemsTable from "./InvoiceItemsTable";
import type { InvoiceItem } from "./InvoiceItemsTable";

const steps = [
  "Company Details",
  "Bill To",
  "Column Selector",
  "Invoice Items",
];

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [billToDetails, setBillToDetails] = useState<any>(null);
  const [selectedColumns, setSelectedColumns] = useState<InvoiceColumn[]>(
    columnOptions.filter((c) => c.defaultChecked).map((c) => c.key)
  );
  const [taxRate, setTaxRate] = useState<string>("");
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CompanyDetailsForm
            onSubmit={async (data) => {
              if (data.logo && data.logo.length > 0) {
                const file = data.logo[0];
                const base64 = await new Promise<string>((resolve, reject) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => resolve(reader.result as string);
                  reader.onerror = (error) => reject(error);
                });
                const newData = { ...data, logo: base64 };
                setCompanyDetails(newData);
              } else {
                setCompanyDetails(data);
              }
              setCurrentStep(1);
            }}
            defaultValues={
              companyDetails
                ? { ...companyDetails, logo: undefined }
                : undefined
            }
          />
        );
      case 1:
        return (
          <>
            <button
              type="button"
              onClick={() => setCurrentStep(0)}
              style={{ marginBottom: "10px" }}
            >
              Back
            </button>
            <BillToForm
              onSubmit={(data) => {
                setBillToDetails(data);
                setCurrentStep(2);
              }}
              defaultValues={billToDetails || undefined}
            />
          </>
        );
      case 2:
        return (
          <>
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              style={{ marginBottom: "10px" }}
            >
              Back
            </button>
            <ColumnSelector
              selected={selectedColumns}
              onChange={setSelectedColumns}
              onSubmit={(tax) => {
                setTaxRate(tax || "");
                setCurrentStep(3);
              }}
            />
          </>
        );
      case 3:
        const generateInvoicePDF = async (items: InvoiceItem[], sub: number) => {
          const pdfDoc = (
            <InvoicePDFTemplate
              companyDetails={companyDetails}
              billToDetails={billToDetails}
              items={items}
              subtotal={sub}
              selectedColumns={selectedColumns}
              taxRate={(parseFloat(taxRate) || 0) / 100}
            />
          );

          const blob = await pdf(pdfDoc).toBlob();
          return URL.createObjectURL(blob);
        };

        return (
          <div className="relative">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              style={{ marginBottom: "10px" }}
            >
              Back
            </button>
            {previewUrl && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
                  <iframe src={previewUrl} className="w-full h-[80vh] border-none" />
                  <button
                    onClick={() => {
                      URL.revokeObjectURL(previewUrl);
                      setPreviewUrl(null);
                    }}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            )}
            <InvoiceItemsTable
              columns={selectedColumns}
              onPreview={async (items, sub) => {
                setInvoiceItems(items);
                setSubtotal(sub);
                const url = await generateInvoicePDF(items, sub);
                setPreviewUrl(url);
              }}
              onSubmit={async (items, sub) => {
                setInvoiceItems(items);
                setSubtotal(sub);
                const url = await generateInvoicePDF(items, sub);
  
                // Trigger download
                const link = document.createElement("a");
                link.href = url;
                link.download = `invoice_${new Date().toISOString().slice(0, 10)}.pdf`;
                link.click();
                URL.revokeObjectURL(url);
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Stepper steps={steps} currentStep={currentStep} />
      {renderStep()}
    </div>
  );
};

export default MultiStepForm;
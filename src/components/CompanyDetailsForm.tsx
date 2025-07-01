"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

export interface CompanyDetails {
  logo: FileList | null;
  companyName: string;
  companyAddress: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  invoiceNumber: string;
  terms: string;
  invoiceDate: string;
}

export type CompanyDetailsData = Omit<CompanyDetails, 'logo'> & {
  logo: string | null;
};

type Props = {
  defaultValues?: Partial<CompanyDetails>;
  onSubmit: (data: CompanyDetails) => void;
};

const CompanyDetailsForm: React.FC<Props> = ({ defaultValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CompanyDetails>({
    defaultValues: {
      ...defaultValues,
      invoiceDate: defaultValues?.invoiceDate || new Date().toISOString().substring(0, 10),
    },
    mode: "onTouched",
  });

  const logoFile = watch("logo");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Company Logo</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          {...register("logo")}
          className="block w-full border rounded px-3 py-2"
        />
        {errors.logo && <span className="text-red-500 text-xs">{errors.logo.message}</span>}
        {logoFile && logoFile.length > 0 && (
          <Image
            src={URL.createObjectURL(logoFile[0])}
            alt="Logo Preview"
            className="mt-2 object-contain"
            height={64}
            width={128}
            style={{ height: "4rem", width: "auto" }}
            unoptimized
          />
        )}
      </div>
      <div>
        <label className="block font-medium mb-1">Company Name</label>
        <input
          type="text"
          {...register("companyName", { required: "Company Name is required" })}
          className="block w-full border rounded px-3 py-2"
        />
        {errors.companyName && <span className="text-red-500 text-xs">{errors.companyName.message}</span>}
      </div>
      <div>
        <label className="block font-medium mb-1">Company Address</label>
        <input
          type="text"
          {...register("companyAddress", { required: "Company Address is required" })}
          className="block w-full border rounded px-3 py-2"
        />
        {errors.companyAddress && <span className="text-red-500 text-xs">{errors.companyAddress.message}</span>}
      </div>
      <div>
        <label className="block font-medium mb-1">Invoice Date</label>
        <input
          type="date"
          {...register("invoiceDate", { required: "Invoice Date is required" })}
          className="block w-full border rounded px-3 py-2"
        />
        {errors.invoiceDate && <span className="text-red-500 text-xs">{errors.invoiceDate.message}</span>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium mb-1">City</label>
          <input
            type="text"
            {...register("city", { required: "City is required" })}
            className="block w-full border rounded px-3 py-2"
          />
          {errors.city && <span className="text-red-500 text-xs">{errors.city.message}</span>}
        </div>
        <div>
          <label className="block font-medium mb-1">State</label>
          <input
            type="text"
            {...register("state", { required: "State is required" })}
            className="block w-full border rounded px-3 py-2"
          />
          {errors.state && <span className="text-red-500 text-xs">{errors.state.message}</span>}
        </div>
        <div>
          <label className="block font-medium mb-1">ZIP</label>
          <input
            type="text"
            {...register("zip", { required: "ZIP Code is required" })}
            className="block w-full border rounded px-3 py-2"
          />
          {errors.zip && <span className="text-red-500 text-xs">{errors.zip.message}</span>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="text"
            {...register("phone", { required: "Phone is required" })}
            className="block w-full border rounded px-3 py-2"
          />
          {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            className="block w-full border rounded px-3 py-2"
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Invoice Number</label>
          <input
            type="text"
            {...register("invoiceNumber", { required: "Invoice Number is required" })}
            className="block w-full border rounded px-3 py-2"
          />
          {errors.invoiceNumber && <span className="text-red-500 text-xs">{errors.invoiceNumber.message}</span>}
        </div>
        <div>
          <label className="block font-medium mb-1">Terms & Conditions</label>
          <textarea
            {...register("terms")}
            className="block w-full border rounded px-3 py-2 min-h-[60px]"
          />
          {errors.terms && <span className="text-red-500 text-xs">{errors.terms.message}</span>}
        </div>
      </div>
      <button
        type="submit"
        className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Next
      </button>
    </form>
  );
};

export default CompanyDetailsForm;
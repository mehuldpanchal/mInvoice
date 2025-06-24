"use client";
import React from "react";
import { useForm } from "react-hook-form";

type BillToDetails = {
  clientCompanyName: string;
  clientCompanyAddress: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
};

type Props = {
  defaultValues?: Partial<BillToDetails>;
  onSubmit: (data: BillToDetails) => void;
};

const BillToForm: React.FC<Props> = ({ defaultValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillToDetails>({
    defaultValues,
    mode: "onTouched",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Client Company Name</label>
        <input
          type="text"
          {...register("clientCompanyName", { required: "Client Company Name is required" })}
          className="block w-full border rounded px-3 py-2"
        />
        {errors.clientCompanyName && <span className="text-red-500 text-xs">{errors.clientCompanyName.message}</span>}
      </div>
      <div>
        <label className="block font-medium mb-1">Client Company Address</label>
        <input
          type="text"
          {...register("clientCompanyAddress", { required: "Address is required" })}
          className="block w-full border rounded px-3 py-2"
        />
        {errors.clientCompanyAddress && <span className="text-red-500 text-xs">{errors.clientCompanyAddress.message}</span>}
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
            {...register("zip", { required: "ZIP is required" })}
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
      <button
        type="submit"
        className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Next
      </button>
    </form>
  );
};

export default BillToForm;
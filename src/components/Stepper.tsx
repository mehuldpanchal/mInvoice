"use client";
import React from "react";

type StepperProps = {
  steps: string[];
  currentStep: number;
};

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => (
  <nav className="flex items-center justify-center w-full mb-8">
    <ol className="flex w-full max-w-xl">
      {steps.map((step, idx) => (
        <li
          key={step}
          className={`flex-1 flex flex-col items-center relative ${
            idx < steps.length - 1 ? "after:content-[''] after:w-full after:h-1 after:bg-gray-200 after:absolute after:top-1/2 after:left-full after:-translate-y-1/2" : ""
          }`}
        >
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center font-bold border-2 ${
              idx === currentStep
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-500 border-gray-300"
            }`}
          >
            {idx + 1}
          </div>
          <span className={`mt-2 text-xs text-center ${idx === currentStep ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
            {step}
          </span>
        </li>
      ))}
    </ol>
  </nav>
);

export default Stepper;
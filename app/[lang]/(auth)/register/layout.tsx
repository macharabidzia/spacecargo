"use client";

import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { Fragment } from "react";

const steps = [
    { path: "register", label: "1" },
    { path: "verify", label: "2" },
    { path: "complete", label: "3" },
    { path: "address", label: "4" },
];

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const currentStep = pathname.split("/").pop();

    const isCompleted = (stepKey: string) => {
        return (
            (stepKey === "register" && (currentStep === "verify" || currentStep === "complete" || currentStep === "address")) ||
            (stepKey === "verify" && (currentStep === "complete" || currentStep === "address")) ||
            (stepKey === "complete" && currentStep === "address")
        );
    };

    const isActive = (stepKey: string) => currentStep === stepKey;

    return (
        <div className="p-4">
            <div className="flex flex-col items-center mb-12">
                <div className="flex items-center gap-4 sm:gap-8 w-full max-w-xl">
                    {steps.map((step, index) => (
                        <Fragment key={step.path}>
                            <div
                                className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all duration-300 transform 
                                ${isActive(step.path)
                                        ? "bg-blue-600 text-white scale-110 shadow-lg"
                                        : isCompleted(step.path)
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-200 text-gray-500"
                                    }`}
                            >
                                {isCompleted(step.path) && !isActive(step.path) ? (
                                    <Check size={20} />
                                ) : (
                                    step.label
                                )}
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`flex-1 h-1 rounded-full transition-colors duration-300 
                                    ${isCompleted(step.path) || isActive(step.path)
                                            ? "bg-blue-500"
                                            : "bg-gray-200"
                                        }`}
                                ></div>
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>

            {/* Page Content */}
            <div className="max-w-2xl mx-auto w-full">{children}</div>
        </div>
    );
}
"use client";

import { cn } from "@/lib/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
          variant === "primary" &&
            "bg-[#1a237e] text-white shadow-lg shadow-[#1a237e]/25 hover:bg-[#0d1454] hover:shadow-xl",
          variant === "secondary" &&
            "bg-white text-[#1a237e] shadow-lg hover:bg-blue-50",
          variant === "outline" &&
            "border-2 border-[#1a237e] text-[#1a237e] hover:bg-[#1a237e] hover:text-white",
          variant === "ghost" && "text-slate-600 hover:bg-slate-100",
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-base",
          size === "lg" && "px-8 py-4 text-lg",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export default Button;

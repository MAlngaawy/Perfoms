import React from "react";
import AppIcons from "../core/AppIcons";

interface ButtonProps {
  label: string;
  onClick?: any;
  className?: string;
  style?: "bordered" | "primary" | "basic";
  icon?: string;
  primary?: boolean;
  size?: "small" | "large";
  styles?: {};
}

export const Button = ({
  label,
  onClick,
  className,
  style,
  icon,
}: ButtonProps) => {
  return (
    <>
      <button
        type="button"
        className={`${
          style === "primary"
            ? "bg-perfBlue text-white hover:shadow hover:opacity-95"
            : style === "bordered"
            ? "border border-perfBlue text-perfBlue hover:shadow-lg"
            : style === "basic"
            ? "text-black border-0"
            : ""
        } ${className} flex xs:flex-row flex-col justify-center px-3 disabled:bg-gray-500 items-center`}
        onClick={onClick}
      >
        {icon && (
          <AppIcons
            className={`w-5 mr-1 ${
              style === "primary"
                ? "text-white"
                : style === "bordered"
                ? "text-perfBlue"
                : style === "basic"
                ? "text-black"
                : ""
            } xs:text-perfBlue`}
            icon="PlusIcon:outline"
          />
        )}
        {label}
      </button>
    </>
  );
};

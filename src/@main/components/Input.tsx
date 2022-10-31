import React from "react";
// import { Controller } from "react-hook-form";
import { Input } from "@mantine/core";

interface inputTypes {
  placeHolder?: string;
  type: string;
  id?: string;
  label?: string;
  description?: string;
  error?: string;
  required: boolean;
  register: any;
  forWhat: string;
}

const PerfInput = ({
  placeHolder,
  type,
  id,
  label,
  description,
  error,
  required,
  register,
  forWhat,
}: inputTypes) => {
  return (
    <Input.Wrapper
      className="w-full"
      id={id}
      withAsterisk={required}
      label={label}
      description={description}
      error={error}
    >
      <Input
        sx={{
          ".mantine-Input-input": {
            border: 0,
            padding: 0,
          },
        }}
        className=" border-0 border-b border-black"
        id="input-demo"
        placeholder={placeHolder}
        type={type}
      />
    </Input.Wrapper>
  );
};

export default PerfInput;

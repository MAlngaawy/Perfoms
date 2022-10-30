import React from "react";
// import { Controller } from "react-hook-form";
import { Input } from "@mantine/core";
import UseFormRegisterReturn from "react-hook-form";

interface inputTypes {
  placeHolder?: string;
  type: string;
  id?: string;
  label?: string;
  description?: string;
  error?: string;
  required: boolean;
  register: any;
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
}: inputTypes) => {
  const { onChange, onBlur, name, ref } = register("firstName");
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
        onChange={onChange} // assign onChange event
        onBlur={onBlur} // assign onBlur event
        name={name} // assign name prop
        ref={ref} // assign ref prop
        id="input-demo"
        placeholder={placeHolder}
        type={type}
      />
    </Input.Wrapper>
  );
};

export default PerfInput;

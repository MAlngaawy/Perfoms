import React, { ReactNode } from "react";
import { Select } from "@mantine/core";
import { Controller } from "react-hook-form";
import __ from "lodash";

export interface Option {
  label: string;
  value: string;
}

interface inputTypes {
  placeHolder?: string;
  id?: string;
  name: string;
  label?: string;
  error?: string | undefined | null | ReactNode;
  required?: boolean;
  data: Array<Option> | string[];
  className?: string;
  control: any;
  placeholder?: string;
}

const PerfSelect = ({
  id,
  name,
  label,
  error,
  required,
  data,
  className,
  control,
  placeholder,
}: inputTypes) => {
  return (
    <Controller
      render={({ field }) => (
        <Select
          placeholder={placeholder}
          id={id}
          withAsterisk={required}
          error={error}
          sx={{
            ".mantine-Input-input": {
              border: 0,
              padding: 0,
              borderBottom: 1,
              borderStyle: "solid",
              borderRadius: 0,
              minHeight: 20,
            },
            ".mantine-Select-dropdown": {
              minWidth: 100,
              // overflow: "auto",
            },
          }}
          className={className}
          label={label}
          data={data}
          {...field}
        />
      )}
      name={name}
      control={control}
    />
  );
};

export default PerfSelect;

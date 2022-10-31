import React from "react";
import { Select } from "@mantine/core";
import { Controller } from "react-hook-form";
import { ClassNames } from "@emotion/react";
import __ from "lodash";

interface Option {
  label: string;
  value: string;
}

interface inputTypes {
  placeHolder?: string;
  id?: string;
  name: string;
  label?: string;
  error?: string;
  required?: boolean;
  data: Array<Option>;
  className: string;
  control: any;
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
}: inputTypes) => {
  return (
    <Controller
      render={({ field }) => (
        <Select
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

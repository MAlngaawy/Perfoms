import React, { ReactNode } from "react";
import { Select } from "@mantine/core";
import { Controller } from "react-hook-form";
import __ from "lodash";

export interface Option {
  label: string;
  value: string;
  image?: string;
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
  searchable?: boolean;
  itemComponent?: any;
  disabled?: boolean;
  normalStyle?: boolean;
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
  searchable,
  itemComponent,
  disabled,
  normalStyle,
}: inputTypes) => {
  return (
    <Controller
      render={({ field }) => (
        <Select
          placeholder={placeholder}
          disabled={disabled}
          id={id}
          withAsterisk={required}
          searchable={searchable}
          error={error}
          itemComponent={itemComponent}
          sx={{
            ".mantine-Input-input": {
              border: 0,
              padding: 0,
              borderBottom: 1,
              borderStyle: "solid",
              borderRadius: 0,
              minHeight: !normalStyle ? 10 : "auto",
              maxHeight: !normalStyle ? 15 : "auto",
              fontSize: !normalStyle ? 12 : "auto",
            },
            ".mantine-Select-dropdown": {
              minWidth: 100,
              // overflow: "auto",
            },
            ".mantine-Select-label": {
              fontSize: 10,
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

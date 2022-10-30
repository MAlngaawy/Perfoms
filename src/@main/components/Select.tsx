import React from "react";
// import { Controller } from "react-hook-form";
import { Input, Select } from "@mantine/core";
// import { object } from 'prop-types';

interface Option {
  label: string;
  value: string;
}

interface inputTypes {
  placeHolder?: string;
  id?: string;
  label?: string;
  error?: string;
  required: boolean;
  data: Array<Option>;
}

const PerfSelect = ({
  placeHolder,
  id,
  label,
  error,
  required,
  data,
}: inputTypes) => {
  //   return (<Input.Wrapper
  //   id={id}
  //   withAsterisk={required}
  //   label={label}
  //   error={error}
  // >
  // <Select
  //       label="Your favorite framework/library"
  //       placeholder="Pick one"
  //       data={data}
  //     />
  // </Input.Wrapper>
  // )
  return (
    <Select
      id={id}
      error={error}
      withAsterisk={required}
      className="border-0 border-b"
      sx={{
        ".mantine-Select-input": {
          border: 0,
        },
      }}
      label={label}
      placeholder={placeHolder}
      data={data}
      onChange={(e: string) => console.log(e)}
    />
  );
};

export default PerfSelect;

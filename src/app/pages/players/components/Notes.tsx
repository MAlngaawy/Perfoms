import React from "react";
import { Textarea } from "@mantine/core";

type Props = {};

const Notes = (props: Props) => {
  return (
    <div className="p-4 m-1 md:m-3 h-1/3 bg-white rounded-3xl">
      <Textarea
        placeholder="Write your notes about his attendance"
        label="Overall Notes"
        className="border-unset"
        sx={{
          ".mantine-Textarea-input": {
            border: "unset",
            padding: 0,
          },
        }}
      />
    </div>
  );
};

export default Notes;

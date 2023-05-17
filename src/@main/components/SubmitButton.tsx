import React from "react";
import { Loader } from "@mantine/core";

type Props = {
  isLoading: boolean;
  text: string;
  disabled?: boolean;
};

const SubmitButton = ({ isLoading, text, disabled }: Props) => {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className="mx-auto flex justify-center w-full disabled:bg-gray-500 bg-perfBlue rounded-lg items-center text-white h-12 mt-6 mb-2"
    >
      {!isLoading ? (
        <span>{text} </span>
      ) : (
        <Loader variant="dots" color="white" />
      )}
    </button>
  );
};

export default SubmitButton;

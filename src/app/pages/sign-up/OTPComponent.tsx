import { Button } from "@mantine/core";
import React, { useState } from "react";
import OtpInput from "react-otp-input";

type Props = {};

const OTPComponent = (props: Props) => {
  const [otp, setOtp] = useState("");
  const handleChange = (otp: any) => setOtp(otp);
  return (
    <div className="flex flex-col gap-6 w-72 justify-center items-center">
      <h2 className=" text-2xl font-medium text-perfBlue text-center">
        Enter 4-Gigital numer you recived on your phone number
      </h2>
      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={6}
        containerStyle="gap-2"
        inputStyle="border rounded-sm border-perfBlue w-10 h-10"
      />
      <button
        onClick={() => console.log("Confirm")}
        className="w-full bg-perfBlue hover:bg-blue-700 text-white py-2 font-medium rounded-md"
      >
        Confirme
      </button>
      <p className=" text-xs text-perfGray2">
        didnt recive a SMS?
        <span
          className="text-sm text-perfBlue font-medium ml-1 cursor-pointer"
          onClick={() => console.log("Send")}
        >
          send again
        </span>
      </p>
    </div>
  );
};

export default OTPComponent;

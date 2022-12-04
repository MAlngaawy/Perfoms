import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useParams, useSearchParams } from "react-router-dom";
import { useVerifyOtpMutation } from "~/app/store/user/userApi";

type Props = {};

const OTPComponent = (props: Props) => {
  const [param] = useSearchParams();
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isSuccess, isError, error }] = useVerifyOtpMutation();

  return (
    <div className="flex flex-col gap-6 w-72 justify-center items-center">
      <h2 className=" text-2xl font-medium text-perfBlue text-center">
        Enter 4-Gigital numer you recived on your phone number
      </h2>
      <OtpInput
        value={otp}
        onChange={(e: any) => setOtp(e)}
        numInputs={6}
        containerStyle="gap-2"
        inputStyle="border rounded-sm border-perfBlue w-10 h-10"
      />
      <button
        onClick={() => verifyOtp({ id: Number(param.get("userid")), otp })}
        className="w-full bg-perfBlue hover:bg-blue-700 text-white py-2 font-medium rounded-md"
      >
        Confirme
      </button>
      <p className=" text-xs text-perfGray2">
        didnt recive a SMS?
        <span
          className="text-sm text-perfBlue font-medium ml-1 cursor-pointer"
          onClick={() => console.log()}
        >
          send again
        </span>
      </p>
    </div>
  );
};

export default OTPComponent;

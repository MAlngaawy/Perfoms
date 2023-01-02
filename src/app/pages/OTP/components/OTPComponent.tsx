import { Box, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useVerifyOtpMutation } from "~/app/store/user/userApi";

type Props = {};

const OTPComponent = (props: Props) => {
  const [param] = useSearchParams();
  const navigare = useNavigate();
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isSuccess, isError, error }] = useVerifyOtpMutation();

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-2 w-72 xs:w-96 text-center justify-center items-center">
        <Info />
        <h2 className="text-perfBlue text-2xl font-medium ">
          Your application was sent to the admins to be confirmed.
        </h2>
        <p className="text-orange text-xl">you will recive an SMS</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-72 xs:w-96 justify-center items-center">
      <h2 className=" text-2xl font-medium text-perfBlue text-center">
        Enter 6-Gigital numer you recived on your phone number
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

const Info = () => {
  return (
    <div className="mb-4 flex flex-col gap-2">
      {/* Logo */}
      <Box
        sx={{
          // height: { xs: 56, sm: 100 },
          padding: 2.5,
          display: "flex",
          flexDirection: "row",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          margin: "auto",
        }}
        className="app-logo"
      >
        <img
          style={{ height: "100%" }}
          src="/assets/images/logo/logo.png"
          alt="performs-logo"
        />
      </Box>

      {/* Info */}
      <h3 className="text-xs text-center text-perfGray2 mt-2">
        Maximize Players Full Potential.
      </h3>
    </div>
  );
};

export default OTPComponent;

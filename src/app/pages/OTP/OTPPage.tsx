import { Avatar } from "@mantine/core";
import React from "react";
import OTPComponent from "./components/OTPComponent";

const OTPPage = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="h-full w-1/2 relative hidden md:block">
        <div className="absolute left-4 top-4  bg-white/60 rounded-2xl p-4">
          <img
            className="w-20 h-20"
            src="/assets/images/logo/logo.png"
            alt="logo"
          />
        </div>
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
          }}
          className=" text-perfBlue p-2 absolute right-4 bottom-4 text-xl"
        >
          Maximize Players Full Potential.
        </div>
        <img
          src="/assets/images/otpImage.png"
          className="w-full h-full max-w-full max-h-full object-cover"
        />
      </div>
      <div className="mx-auto flex justify-center">
        <OTPComponent />
      </div>
    </div>
  );
};

export default OTPPage;

import React from "react";
import { Link } from "react-router-dom";
import { Info } from "../components/OTPComponent";

type Props = {};

const RequestSent = (props: Props) => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="h-full relative hidden md:block">
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
          src="/assets/images/performs_signup.jpg"
          className="w-full h-full max-w-full max-h-full object-cover"
        />
      </div>
      <div className="mx-auto flex justify-center">
        <div className="flex flex-col gap-2 w-72 xs:w-96 text-center justify-center items-center">
          <Info />
          <h2 className="text-perfBlue text-2xl font-medium ">
            Your application was sent to the admins to be confirmed.
          </h2>
          <p className="text-orange text-xl">you will recive an SMS</p>
          <div className="text-perfGray3 font-semibold">
            Go to{" "}
            <Link className="text-perfBlue" to="/sign-in">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSent;

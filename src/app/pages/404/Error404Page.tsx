import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Error404Page = (props: Props) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-slate-200 rounded-3xl gap-4 p-10 xs:p-20 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold">404</h1>
        <h2>This Page Not Found</h2>
        <Link
          to="/"
          className="text-md px-8 py-2 text-perfBlue border rounded-md border-perfBlue hover:bg-perfBlue hover:text-white"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default Error404Page;

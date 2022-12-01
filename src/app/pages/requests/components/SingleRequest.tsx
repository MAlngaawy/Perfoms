import React from "react";
import { Button } from "~/@main/components/Button";
import Info from "~/@main/components/Info";

type RequestProps = {
  name: string;
  phone: string;
  address: string;
};

const SingleRequest = ({ name, phone, address }: RequestProps) => {
  return (
    <div className="h-full flex flex-col rounded-3xl bg-white px-3 py-6 gap-2 border border-perfBlue items-stretch">
      <h1>Request's Info.</h1>
      <Info label="Name" value={name} />
      <div className="flex flex-row gap-5 lg:gap-7 justify-between">
        <Info label="Phone" value={phone} />
        <Info label="Address" value={address} />
      </div>
      <Button
        label="Accept"
        style="primary"
        className="h-10 rounded-md hover:shadow-md"
        onClick={() => console.log("accepted")}
      />
      <Button
        label="Decline"
        style="basic"
        className="h-10 rounded-md bg-perfGray4 text-perfGray2 hover:shadow-md"
        onClick={() => console.log("decline")}
      />
    </div>
  );
};

export default SingleRequest;

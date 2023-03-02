import { Avatar } from "@mantine/core";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  url: string;
  icon: string;
  name: string;
  children: ReactNode;
};

const ItemBox = ({ url, icon, name, children }: Props) => {
  return (
    <div className="sport-card relative bg-white rounded-3xl p-4 xs:p-12 flex flex-col justify-center items-center gap-4">
      <Link
        to={url}
        className="bg-pagesBg rounded-full w-16 xs:w-24 h-16 xs:h-24 mt-6 xs:mt-0 flex justify-center items-center"
      >
        <Avatar
          sx={{
            ".mantine-Avatar-image": {
              borderRadius: "100%",
            },
          }}
          radius={"xl"}
          className="w-full h-full"
          src={icon}
          alt="icon"
        />
      </Link>
      <h2 className=" text-md xs:text-xl  break-words text-perfBlue w-28 text-center mx-auto">
        {name}
      </h2>
      {/* Edit and Delete Buttons */}
      <div className="flex absolute right-2 top-5 gap-2">{children}</div>
    </div>
  );
};

export default ItemBox;

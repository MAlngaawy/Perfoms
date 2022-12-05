import React from "react";
import { Avatar } from "@mantine/core";

type Props = {
  image: string;
  type: string;
};

const ReportsCategoriesCard = ({ image, type }: Props) => {
  return (
    <div className=" w-11/12 xs:w-auto py-10 pointer xs:px-20 flex flex-col gap-4 justify-center items-center bg-white rounded-3xl">
      <div className="bg-pagesBg p-4 rounded-full">
        <Avatar src={image} radius="xl" size={60} />
      </div>
      <h2 className="text-xl text-perfGray1 font-semibold">{type}</h2>
    </div>
  );
};

export default ReportsCategoriesCard;

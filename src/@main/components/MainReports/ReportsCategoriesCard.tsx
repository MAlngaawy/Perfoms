import React from "react";
import { Avatar } from "@mantine/core";

type Props = {
  image: string;
  type: string;
};

const ReportsCategoriesCard = ({ image, type }: Props) => {
  return (
    <div className=" w-60 hover:shadow-sm transform hover:scale-105 transition-all xs:w-auto py-10 pointer xs:px-20 flex flex-col gap-4 justify-center items-center bg-white rounded-3xl">
      <div className="bg-pagesBg p-4 rounded-full">
        <Avatar src={image} size={60} />
      </div>
      <h2 className="text-lg text-perfGray1 font-semibold">{type}</h2>
    </div>
  );
};

export default ReportsCategoriesCard;

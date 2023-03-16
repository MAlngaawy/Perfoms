import React from "react";
import { Avatar } from "@mantine/core";
import cn from "classnames";

type Props = {
  image: string;
  type: string;
  clickable?: boolean;
};

const ReportsCategoriesCard = ({ image, type, clickable = true }: Props) => {
  return (
    <div
      className={cn(
        " w-60 xs:w-auto py-10 xs:px-20 flex flex-col gap-4 justify-center items-center bg-white rounded-3xl",
        {
          "hover:shadow-sm transform hover:scale-105 transition-all": clickable,
        }
      )}
    >
      <div className="bg-pagesBg p-4 rounded-full">
        <Avatar src={image} size={60} />
      </div>
      <h2 className="text-lg text-perfGray1 font-semibold">{type}</h2>
    </div>
  );
};

export default ReportsCategoriesCard;

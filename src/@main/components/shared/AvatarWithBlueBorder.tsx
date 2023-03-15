import { Avatar } from "@mantine/core";
import React from "react";

type Props = {
  image: string;
  name: string;
  size?: number;
  subTitle?: string;
};

const AvatarWithBlueBorder = ({ image, name, size, subTitle }: Props) => {
  return (
    <div className="my-4 sm:my-6 flex flex-col justify-center items-center">
      <Avatar
        src={image}
        className="border border-perfBlue"
        sx={{
          ".mantine-Avatar-placeholder": {
            border: "2px solid #2F80ED",
          },
          ".mantine-Avatar-image": {
            border: "2px solid #2F80ED",
            borderRadius: "100%",
          },
        }}
        radius={100}
        size={size || 100}
      />
      <h2 className=" font-medium text-perfGray1 text-lg">{name}</h2>
      {subTitle && (
        <span className="text-sm mt-2 text-perfGray3">{subTitle}</span>
      )}
    </div>
  );
};

export default AvatarWithBlueBorder;

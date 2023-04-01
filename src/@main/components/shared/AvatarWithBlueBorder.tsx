import { Avatar } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";

type Props = {
  image: string;
  name: string;
  size?: number;
  subTitle?: string;
  navigateLink?: string;
};

const AvatarWithBlueBorder = ({
  image,
  name,
  size,
  subTitle,
  navigateLink,
}: Props) => {
  const navigate = useNavigate();
  return (
    <div className="my-4 sm:my-6 flex flex-col justify-center items-center">
      <Avatar
        onClick={() => navigateLink && navigate(navigateLink)}
        src={image}
        className={cn("border border-perfBlue ", {
          "cursor-pointer": navigateLink,
        })}
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

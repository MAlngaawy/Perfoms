import { Avatar } from "@mantine/core";
import React, { useRef, useState } from "react";
import AppIcons from "~/@main/core/AppIcons";

type Props = {
  currentImage?: string;
  userAvatar: File | null;
  setUserAvatar: React.Dispatch<React.SetStateAction<any>>;
  inputAlt?: string;
};

const AvatarInput = ({
  userAvatar,
  setUserAvatar,
  inputAlt,
  currentImage,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageTypeError, setImageTypeError] = useState<boolean>();

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="relative photo place-self-center w-28 h-28">
        <Avatar
          className="object-cover w-full h-full rounded-lg"
          src={(userAvatar && URL.createObjectURL(userAvatar)) || currentImage}
          alt="album-cover"
        />
        <div
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <AppIcons
            className="w-5 h-5 absolute top-2 cursor-pointer right-2 text-perfGray3 hover:text-perfGray1"
            icon="PencilSquareIcon:outline"
          />
        </div>
        <input
          alt={inputAlt || "add image"}
          ref={fileInputRef}
          accept={"image/png,image/jpeg,image/jpg"}
          onChange={(e) => {
            if (
              e?.currentTarget?.files?.[0].type === "image/jpeg" ||
              e?.currentTarget?.files?.[0].type === "image/png"
            ) {
              setImageTypeError(false);
              setUserAvatar(e?.currentTarget?.files?.[0] as File);
            } else {
              setUserAvatar(null);
              setImageTypeError(true);
            }
          }}
          type="file"
          className="hidden"
          id={"avatar"}
        />
      </div>
      {imageTypeError && (
        <div className=" text-red text-xs my-1">
          This field accepts just (*/jpg,*/jpeg,*/png) image types
        </div>
      )}
    </div>
  );
};

export default AvatarInput;

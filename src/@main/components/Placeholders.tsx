import React from "react";

interface PlaceholderProps {
  img: string;
  preText?: string;
  pageName?: string;
  postText?: string;
}

const Placeholders = ({
  img,
  preText,
  pageName,
  postText,
}: PlaceholderProps) => {
  return (
    <div className="text-center flex flex-col items-center gap-5 mt-4 mx-auto">
      <img className="w-96" src={img} alt={`no ${pageName}`} />
      <p className="mx-4 sm:mx-60">
        {preText} <span className="text-perfBlue font-medium">{pageName}</span>
        {postText}
      </p>
    </div>
  );
};

export default Placeholders;

import React from "react";

interface PlaceholderProps {
  img: string;

  preText: string;
  pageName: string;
  postText: string;
}

const Placeholders = ({
  img,
  preText,
  pageName,
  postText,
}: PlaceholderProps) => {
  return (
    <div className="md:w-1/2 p-2 mt-10 text-center flex flex-col items-center gap-5 md:mt-32 mx-auto">
      <img className="w-96" src={img} alt={`no ${pageName}`} />
      <p>
        {preText} <span className="text-perfBlue font-medium">{pageName}</span>{" "}
        {postText}{" "}
      </p>
    </div>
  );
};

export default Placeholders;

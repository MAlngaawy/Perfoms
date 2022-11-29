import React from "react";
import { CardProps } from "~/app/store/types/user-types";

type Props = {
  header: string;
  firstText: string;
  secondText: string;
  detailedText: string;
};

const ActionsAndRecommendationsCard = (props: Props) => {
  return (
    <div className="info-card flex flex-col p-6 pb-20 bg-white gap-1 rounded-3xl">
      <h2 className="text-perfGray1 text-base font-semibold">{props.header}</h2>
      <p>{props.firstText}</p>
      <p>{props.secondText}</p>
      <p className=" text-perfGray3 text-sm">{props.detailedText}</p>
    </div>
  );
};

export default ActionsAndRecommendationsCard;

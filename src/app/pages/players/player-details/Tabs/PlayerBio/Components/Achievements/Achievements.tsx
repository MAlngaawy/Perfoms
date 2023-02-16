import React from "react";

type Props = {};

const Achievements = (props: Props) => {
  return (
    <div className="bg-white rounded-3xl p-6 px-3 min-h-full">
      <h2 className="text-lg text-perfLightBlack font-medium mb-6">
        Achievements
      </h2>
      <div className="flex flex-col gap-5">
        <OneAchievement />
        <OneAchievement />
        <OneAchievement />
        <OneAchievement />
      </div>
    </div>
  );
};

export default Achievements;

const OneAchievement = ({ type, date, place }: any) => {
  return (
    <div className="flex gap-1">
      <div className="icon">
        <img src="/assets/images/medal.png" className="w-10" alt="medal" />
      </div>
      <div className="details break-words">
        <h2 className="type text-xs font-medium text-perfLightBlack">Type</h2>
        <p className="text-xs text-perfGray3">2020, Qatar</p>
      </div>
    </div>
  );
};

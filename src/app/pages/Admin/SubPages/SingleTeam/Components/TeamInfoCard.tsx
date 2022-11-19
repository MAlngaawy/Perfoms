import React from "react";

type Props = {};

const TeamInfoCard = (props: Props) => {
  return (
    <div>
      <h2>Team Info</h2>
      <div className="flex flex-wrap gap-2 mt-4">
        <Schema label="Name" value="14Th Team" />
        <Schema label="Name" value="14Th Team" />
        <Schema label="Name" value="14Th Team" />
        <Schema label="Name" value="14Th Team" />
        <Schema label="Name" value="14Th Team" />
        <Schema label="Name" value="14Th Team" />
      </div>
    </div>
  );
};

export default TeamInfoCard;

const Schema = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-sm text-perfGray3">{label}</h3>
      <h2 className="text-base text-perfGray1">{value}</h2>
    </div>
  );
};

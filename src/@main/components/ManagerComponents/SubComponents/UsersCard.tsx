import React, { ReactNode } from "react";
import DeleteButton from "./DeleteButton";
import { Avatar } from "@mantine/core";
import AddUserForm from "./AddUser";

type Props = {
  type: "Player" | "Coach" | "Supervisor";
  data: { name: string; image: string; id: number }[];
};

const UsersCard = ({ type, data }: Props) => {
  return (
    <div className="bg-white rounded-lg p-4 ">
      <div className="header flex justify-between items-center">
        <h2 className="sm:text-lg text-perfGray1"> {type}s in the system </h2>
        <div className="flex gap-6">
          <AddUserForm type={type} />
        </div>
      </div>
      <div className="flex flex-wrap gap-x-6 overflow-scroll  max-h-52 gap-y-1 my-4">
        {data.map((user) => {
          return (
            <div className="flex justify-between rounded-3xl items-center p-1 gap-20 hover:bg-pagesBg transition-all">
              <div className="coach-data flex gap-2 cursor-pointer">
                <Avatar src={user.image} size="sm" radius={"xl"} />
                <h3 className="text-base text-perfGray2">{user.name}</h3>
              </div>
              <DeleteButton
                deleteFun={() => console.log("Delete")}
                type={type}
                name={user.name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersCard;

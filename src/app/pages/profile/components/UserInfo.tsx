import { Avatar, Modal } from "@mantine/core";
import { useState } from "react";
import AppIcons from "~/@main/core/AppIcons";
import { Player } from "~/app/store/types/parent-types";
import { User } from "~/app/store/types/user-types";
import EditForm from "./EditForm";

type Props = {
  user: User;
  players: Player[];
};

const UserInfo = ({ user, players }: Props) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="content relative flex flex-col justify-center items-center gap-2 bg-white rounded-3xl p-6 w-11/12 md:w-auto md:p-12">
      <div
        onClick={() => setOpened((o) => !o)}
        className="absolute cursor-pointer right-6 top-6"
      >
        <AppIcons
          className="w-5 h-5  text-perfGray3 hover:text-perfGray1"
          icon="PencilSquareIcon:outline"
        />
        <Modal opened={opened} onClose={() => setOpened(false)}>
          <EditForm user={user} setOpened={setOpened} />
        </Modal>
      </div>
      <div className="photo w-28 md:w-48 h-32 md:h-52">
        <img
          className="object-cover w-full h-full rounded-lg"
          src={
            user.avatar ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          }
          alt="user-avatar"
        />
      </div>
      <h2 className="w-full text-center my-4 text-xl">{`${user.first_name} ${user.last_name}`}</h2>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-left sm:gap-12">
        <div className="age">
          {/* <p className="title text-sm text-perfGray3">{user.bio}</p> */}
          <p className="title text-sm text-perfGray3">Age</p>
          <h2 className="val text-xl text-perfGray1">
            {user.dob}{" "}
            <span className="ml-2 text-sm text-perfGray3">
              ( {new Date().getFullYear() - +user.dob?.split("-")?.[0] || 0})
            </span>
          </h2>
        </div>
        <div className="job">
          <p className="title text-sm text-perfGray3">Job</p>
          <h2 className="val text-xl text-perfGray1">{user.job || "NA"}</h2>
        </div>
        <div className="subscription">
          <p className="title text-sm text-perfGray3">Subscription</p>
          <h2 className="val text-xl text-perfGray1">Golden</h2>
        </div>
      </div>
      <div className="flex justify-around w-full mt-4">
        <div className="playersNumber flex flex-col text-left">
          <p className="title text-sm text-perfGray3">Players</p>
          <h2 className="val text-xl text-perfGray1">{players.length || 0}</h2>
        </div>
        <div className="playersProfile flex flex-col gap-4">
          {players?.map((player) => (
            <div className="player flex items-center gap-2 cursor-pointer">
              <Avatar radius={"xl"} size="sm" src={player.icon} />
              <h2 className="name text-base">{player.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

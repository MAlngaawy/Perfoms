import { Avatar, Modal } from "@mantine/core";
import { useState } from "react";
import AppIcons from "~/@main/core/AppIcons";
import { ProfileResponse, User } from "~/app/store/types/user-types";
import EditForm from "./EditForm";

type Props = {
  user: User;
};

const UserInfo = ({ user }: Props) => {
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
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Introduce yourself!"
        >
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
          <h2 className="val text-xl text-perfGray1">2</h2>
        </div>
        <div className="playersProfile flex flex-col gap-4">
          <div className="player flex items-center gap-2 cursor-pointer">
            <Avatar
              radius={"xl"}
              size="sm"
              src="https://static9.depositphotos.com/1053646/1105/i/950/depositphotos_11058078-stock-photo-cute-boy-playing-football.jpg"
            />
            <h2 className="name text-base">Ali Mohamed</h2>
          </div>
          <div className="player flex items-center gap-2 cursor-pointer">
            <Avatar
              radius={"xl"}
              size="sm"
              src="https://media.istockphoto.com/photos/flag-football-player-picture-id182184005?k=20&m=182184005&s=612x612&w=0&h=g4-UBiBMAlW9bJJNKIPfmpjb2Us0-TPmjloNQhPUlP4="
            />
            <h2 className="name text-base">Amr Ali</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

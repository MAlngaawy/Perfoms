import { Avatar, Modal } from "@mantine/core";
import { useState } from "react";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import AppIcons from "~/@main/core/AppIcons";
import { useParentDeletePlayerMutation } from "~/app/store/parent/parentApi";
import { Player } from "~/app/store/types/parent-types";
import EditForm from "./EditForm";
import AppUtils from "~/@main/utils/AppUtils";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {
  players: Player[];
};

const UserInfo = ({ players }: Props) => {
  const { data: user } = useUserQuery({});
  const [opened, setOpened] = useState(false);
  const [deletePlayer, { isSuccess, isError }] =
    useParentDeletePlayerMutation();

  return (
    <div className="content relative flex flex-col justify-center items-center gap-2 mx-2 bg-white rounded-3xl p-6 w-80">
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
          title={`Edit user info`}
        >
          <EditForm setOpened={setOpened} />
        </Modal>
      </div>
      <div className="photo w-28 md:w-48 h-32 md:h-52">
        <img
          className="object-cover w-full h-full rounded-lg"
          src={
            user?.avatar ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          }
          alt="user-avatar"
        />
      </div>
      <h2 className="w-full text-center my-4 text-xl">{`${user?.first_name} ${user?.last_name}`}</h2>
      <div className="w-full flex flex-col justify-start ml-10">
        <div className="flex gap-4 text-left w-full sm:gap-12">
          {/* <div className="age">
          <p className="title text-sm text-perfGray3">Age</p>
          <h2 className="val text-xl text-perfGray1">
          {user.dob}{" "}
          <span className="ml-2 text-sm text-perfGray3">
              ( {new Date().getFullYear() - +user.dob?.split("-")?.[0] || 0})
            </span>
          </h2>
        </div> */}
          {/* <div className="job">
          <p className="title text-sm text-perfGray3">Job</p>
          <h2 className="val text-xl text-perfGray1">{user.job || "NA"}</h2>
        </div> */}
          <div className="subscription">
            <p className="title text-sm text-perfGray3">Subscription</p>
            <h2 className="val text-xl text-perfGray1">Golden</h2>
          </div>
        </div>
        <div className="flex w-full mt-4">
          {/* <div className="playersNumber flex flex-col text-left">
          <p className="title text-sm text-perfGray3">Players</p>
          <h2 className="val text-xl text-perfGray1">{players.length || 0}</h2>
        </div> */}
          <div className="playersProfile flex flex-col gap-4">
            {players?.map((player) => (
              <div
                key={player.id}
                className="player flex items-center justify-between gap-6 cursor-pointer"
              >
                <div className="flex gap-2">
                  <Avatar radius={"xl"} size="sm" src={player.icon} />
                  <h2 className="name text-base">{player.name}</h2>
                </div>
                <DeleteButton
                  name={player.name}
                  type="Player"
                  deleteFun={() => {
                    deletePlayer({ player_id: player.id })
                      .then((res) => {
                        AppUtils.showNotificationFun(
                          "Success",
                          "Done",
                          "Successfully Deleted"
                        );
                      })
                      .catch((err) => {
                        console.log(err);

                        AppUtils.showNotificationFun(
                          "Error",
                          "Sorry",
                          "Try again later"
                        );
                      });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

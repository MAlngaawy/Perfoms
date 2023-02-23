import { Avatar } from "@mantine/core";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import AppIcons from "~/@main/core/AppIcons";
import {
  useDeleteEventMutation,
  useGetPlayerEventsQuery,
} from "~/app/store/user/userApi";
import AddAlbum from "./Components/AddAlbum";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {};

const PlayerAlbums = (props: Props) => {
  const { id } = useParams();
  const { data: playerEvents } = useGetPlayerEventsQuery(
    { player_id: id },
    { skip: !id }
  );
  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4">
        {playerEvents?.results.map(({ name, id, icon }) => {
          return <SingleAlbum name={name} id={id} image={icon} />;
        })}
        <div>
          <AddAlbum />
        </div>
      </div>
    </div>
  );
};

type SingleAlbumTypes = {
  image: string;
  id: number;
  name: string;
};

const SingleAlbum = ({ image, id, name }: SingleAlbumTypes) => {
  const navigate = useNavigate();
  const [deletePlayerEvent] = useDeleteEventMutation();

  return (
    <div className="bg-white rounded-lg cursor-pointer relative group shadow-sm">
      <div className="absolute right-4 top-4 z-50 bg-white p-1 rounded-full">
        <DeleteButton
          deleteFun={() => {
            deletePlayerEvent({ event_id: id })
              .then(() => {
                AppUtils.showNotificationFun(
                  "Success",
                  "Done",
                  "Successfully deleted Album"
                );
              })
              .catch((err) => {
                AppUtils.showNotificationFun(
                  "Error",
                  "Sorry",
                  "Tray again later"
                );
              });
          }}
          type="Album"
          name={name}
        />
      </div>
      <div
        className="overlay z-20 rounded-lg  justify-center items-center absolute w-full h-full left-0 top-0 bg-black opacity-60 hidden group-hover:flex"
        onClick={() => {
          navigate(`albums/${id}`);
        }}
      ></div>
      <Avatar
        src={image}
        className={"w-60 h-40 rounded-none rounded-tl-lg rounded-tr-lg"}
        alt="Album Cover"
      />
      <div className="title m-2 text-center">
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default PlayerAlbums;

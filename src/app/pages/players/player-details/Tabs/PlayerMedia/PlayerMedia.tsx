import { Avatar } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppIcons from "~/@main/core/AppIcons";

type Props = {};

const mockData = [
  {
    name: "Album Zero",
    id: 1,
    image:
      "https://thumbs.dreamstime.com/b/group-children-playing-soap-bubbles-outdoors-friends-trying-to-catch-147493464.jpg",
  },
  {
    name: "Album One",
    id: 2,
    image:
      "https://media.istockphoto.com/id/800433350/photo/portrait-of-happy-boy-playing-on-swing-against-sky.jpg?s=170667a&w=0&k=20&c=JG2ucexIrol8qVagfkeb1cQrYDD2Aknx7hmY6YoFgYQ=",
  },
  {
    name: "Album Two",
    id: 3,
    image:
      "https://media.istockphoto.com/id/1252210017/photo/smiling-girl-playing-on-the-swing.jpg?b=1&s=170667a&w=0&k=20&c=H2jRnAeVS2ZRHPhBPdgfsYuVl1x-lMkqNm4iBYf5K8E=",
  },
  {
    name: "Album Three",
    id: 4,
    image: "https://media.sciencephoto.com/f0/33/74/09/f0337409-800px-wm.jpg",
  },
  {
    name: "Album four",
    id: 5,
    image:
      "https://cff2.earth.com/uploads/2018/07/25115124/Kids-now-spend-twice-as-much-time-playing-indoors-than-outdoors-850x500.jpg",
  },
  {
    name: "Album Five",
    id: 6,
    image:
      "https://blog.nemours.org/wp-content/uploads/2016/04/BP_ToolBox_0002-750x480.jpg",
  },
];

const PlayerMedia = (props: Props) => {
  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4">
        {mockData.map(({ name, id, image }) => {
          return <SingleAlbum name={name} id={id} image={image} />;
        })}
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

  return (
    <div className="bg-white rounded-lg cursor-pointer relative group">
      <div
        className="overlay z-20 rounded-lg  justify-center items-center absolute w-full h-full left-0 top-0 bg-black opacity-60 hidden group-hover:flex"
        onClick={() => {
          navigate(`albums/${id}`);
        }}
      ></div>
      <AppIcons
        icon="ArrowLongRightIcon:outline"
        className="w-6 h-6 text-white z-30 opacity-100 absolute left-24 top-20 hidden group-hover:block"
      />
      <Avatar src={image} className={"w-60 h-40"} alt="Album Cover" />
      <div className="title m-2">
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default PlayerMedia;

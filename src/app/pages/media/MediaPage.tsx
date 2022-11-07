import React , { useState } from "react";
import FirstNav from "~/@main/components/FirstNav";
import SecondNav from "../home/organisms/SecondNav";
import MediaCard from "./molecules/MediaCard";
import { players } from "../home/HomePage";

const dummyData = {
  img: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
  header: 'Kickboxing -under 12',
  date: 'Sunday, 15/SEP',
  place: 'Al - ahly club'
}

const MediaPage = () => {
  const [selectedplayer, setSelectedPlayer] = useState<any>(null);

  return (
      <div>
        <FirstNav pageName="Media" />
        <SecondNav
          players={players}
          selectedplayer={selectedplayer}
          setSelectedPlayer={setSelectedPlayer}
        />
        <div className="flex flex-row justify-center items-center flex-wrap gap-2 m-1">
            <MediaCard {...dummyData} />
            <MediaCard {...dummyData} />
            <MediaCard {...dummyData} />
            <MediaCard {...dummyData} />
            <MediaCard {...dummyData} />
            <MediaCard {...dummyData} />
            <MediaCard {...dummyData} />
            <MediaCard {...dummyData} />
            <MediaCard {...dummyData} />
            <MediaCard {...dummyData} />
          </div>;
      </div>
      )
};

export default MediaPage;

import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const AlbumMedia = (props: Props) => {
  const { album_id } = useParams();
  return (
    <div>
      AlbumMedia <h1>{album_id}</h1>
    </div>
  );
};

export default AlbumMedia;

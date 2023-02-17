import authRoles from "~/app/auth/authRoles";
import AlbumMedia from "./AlbumMedia";

const AlbumMediaConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: true,
        },
        toolbar: {
          display: true,
        },
        footer: {
          display: true,
        },
      },
    },
  },
  auth: authRoles.All,
  routes: [
    {
      path: "players/:player_id/albums/:album_id",
      element: <AlbumMedia player_id={1} />,
    },
  ],
};

export default AlbumMediaConfig;

import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import PlayerCertificatePage from "./PlayerCertificatePage";

const PlayerCertificateConfig: PagesRouteConfig = {
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
  auth: authRoles.Parent,
  routes: [
    {
      path: "player-certificates/:id",
      element: <PlayerCertificatePage />,
    },
  ],
};

export default PlayerCertificateConfig;

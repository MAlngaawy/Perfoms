import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import SearchPlayersPage from "./SearchPlayersPage";

const SearchPlayersPageConfig: PagesRouteConfig = {
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
  auth: [...authRoles.Supervisor, ...authRoles.Admin, ...authRoles.Coach],
  routes: [
    {
      path: "/main-reports/search-players",
      element: <SearchPlayersPage />,
    },
  ],
};

export default SearchPlayersPageConfig;

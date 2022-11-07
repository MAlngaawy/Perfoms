import { Avatar, Button, Divider, Grid, Menu, Text } from "@mantine/core";
import { userApi } from "~/app/store/user/userApi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import AppIcons from "~/@main/core/AppIcons";
import HomeFirstNav from "~/app/pages/home/organisms/HomeFirstNav";
import FirstNav from "~/@main/components/FirstNav";

type Props = {
  opened: boolean;
  setOpened: any;
};

const Toolbar = ({ setOpened }: Props) => {
  const dispatch = useDispatch();

  let href = window.location.href;
  let routeName = href.slice(href.lastIndexOf("/") + 1, href.length);

  // if (routeName === "home") {
  //   return <HomeFirstNav userName="Ahmed Kamal" />;
  // }

  return (
    <nav className="w-full flex justify-between items-center shadow-md p-4 bg-white">
      <div className="bg-fadedGray p-2 w-full flex justify-between items-center">
        <button
          className="block md:hidden text-black border-0"
          onClick={() => setOpened(true)}
        >
          <AppIcons className="w-6 h-6 " icon="Bars3BottomLeftIcon:solid" />
        </button>
        <div className="clubLogo hidden lg:block">Club Logo</div>
      </div>
      <div className="right flex gap-2 justify-center items-center">
        {/* Notifications Menu */}
        <Menu trigger="hover" shadow="md" width={200}>
          <Menu.Target>
            <Avatar className="cursor-pointer" radius="xl">
              <AppIcons
                className="w-5 h-5 text-perfGray3"
                icon="BellIcon:outline"
              />
            </Avatar>
          </Menu.Target>

          <Menu.Dropdown>
            <h2 className="m-2 text-perfLightBlack text-sm">Notifications</h2>
            <Divider />
            <Menu.Label>
              <div>This is The first Nvigation</div>
            </Menu.Label>
            <Menu.Label>
              <div>This is The Second one </div>
            </Menu.Label>
          </Menu.Dropdown>
        </Menu>

        {/* Messages Menu */}
        <Menu trigger="hover" shadow="md" width={200}>
          <Menu.Target>
            <Avatar className="cursor-pointer" radius="xl">
              <AppIcons
                className="w-5 h-5 text-perfGray3"
                icon="EnvelopeIcon:outline"
              />
            </Avatar>
          </Menu.Target>

          <Menu.Dropdown>
            <h2 className="m-2 text-perfLightBlack text-sm">Messages</h2>
            <Divider />
            <Menu.Label>
              <div>Message One</div>
            </Menu.Label>
            <Menu.Label>
              <div> Message Two </div>
            </Menu.Label>
          </Menu.Dropdown>
        </Menu>
      </div>
    </nav>
  );
};

export default Toolbar;

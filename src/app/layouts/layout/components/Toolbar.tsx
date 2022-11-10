import { Avatar, Indicator, Divider, Grid, Menu, Text } from "@mantine/core";
import { userApi } from "~/app/store/user/userApi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import AppIcons from "~/@main/core/AppIcons";
import { Link, useNavigate } from "react-router-dom";
import Notification from "~/@main/components/Notification";
import { eventInstance } from "~/@main/utils/AppUtils";
import Notifications from "./subComponents/Notifications";
import SelectUser from "./subComponents/SelectUser";
import useWindowSize from "~/@main/hooks/useWindowSize";

type Props = {
  opened: boolean;
  setOpened: any;
};

const Toolbar = ({ setOpened }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let href = window.location.href;
  let routeName = href.slice(href.lastIndexOf("/") + 1, href.length);

  return (
    <nav className="w-full flex justify-between  items-center shadow-md p-4 bg-white">
      <div className="bg-fadedGray p-2 flex w-fit gap-3 justify-between items-center">
        <button
          className="block lg:hidden text-black border-0"
          onClick={() => setOpened(true)}
        >
          <AppIcons className="w-6 h-6 " icon="Bars3BottomLeftIcon:solid" />
        </button>
        <div className="clubLogo gap-2 hidden lg:flex justify-center items-center">
          <img
            className="w-8"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png"
            alt="club logo"
          />
          <span>Royal Club</span>
        </div>
        <SelectUser />
      </div>
      <div className="right flex gap-2 justify-center items-center">
        {/* Messages Menu */}
        <Menu trigger="hover" shadow="md" width={200}>
          <Menu.Target>
            <Avatar className="cursor-pointer" radius="xl">
              <AppIcons
                className="w-5 h-5 text-black"
                icon="EnvelopeIcon:outline"
              />
            </Avatar>
          </Menu.Target>

          <Menu.Dropdown>
            <h2 className="m-2 text-perfLightBlack text-sm">Messages</h2>
            <Divider />
            <Menu.Label>
              <div>Message One Here</div>
            </Menu.Label>
            <Menu.Label>
              <div> Message Two Here</div>
            </Menu.Label>
          </Menu.Dropdown>
        </Menu>

        {/* Notifications Menu */}
        <Notifications />

        {/* User Menu */}
        <Menu trigger="hover" shadow="md" width={200}>
          <Menu.Target>
            <Avatar
              src="https://s.studiobinder.com/wp-content/uploads/2021/01/Best-black-and-white-portraits-by-Platon.jpg?resolution=2560,1"
              alt="userImage"
              className="cursor-pointer"
              radius="xl"
              size={"md"}
            />
          </Menu.Target>

          <Menu.Dropdown className="p-0">
            <Menu.Label className="p-0">
              <div className="w-full hover:bg-slate-200 py-2">
                <Link className="w-full h-full" to="profile">
                  <div className="flex gap-2 mx-10">
                    <AppIcons className="w-4 h-4 " icon="UserIcon:outline" />
                    <p>Profile</p>
                  </div>
                </Link>
              </div>
            </Menu.Label>

            <Menu.Label className="p-0">
              <div className="w-full hover:bg-slate-200 py-2">
                <Link className="w-full h-full" to="settings">
                  <div className="flex gap-2 mx-10">
                    <AppIcons
                      className="w-4 h-4 "
                      icon="Cog6ToothIcon:outline"
                    />
                    <p>Settings</p>
                  </div>
                </Link>
              </div>
            </Menu.Label>

            <Menu.Label className="p-0">
              <div>
                <div
                  onClick={() => {
                    Cookies.remove("token");
                    window.location.reload();
                    // dispatch(userApi.util.resetApiState());
                  }}
                  className="w-full cursor-pointer hover:bg-slate-200 py-2"
                >
                  <div className="flex gap-2 mx-10">
                    <AppIcons
                      className="w-4 h-4 "
                      icon="ArrowRightOnRectangleIcon:outline"
                    />
                    <p>Sign out</p>
                  </div>
                </div>
              </div>
            </Menu.Label>
          </Menu.Dropdown>
        </Menu>
      </div>
    </nav>
  );
};

export default Toolbar;

import { Avatar, Divider, Menu } from "@mantine/core";
import Cookies from "js-cookie";
import AppIcons from "~/@main/core/AppIcons";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "./subComponents/Notifications";
import SelectUser from "./subComponents/SelectUser";
import useWindowSize from "~/@main/hooks/useWindowSize";
import OneMessageBox from "~/@main/components/OneMessageBox";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import { useSelector } from "react-redux";
import { ParentClub, Player } from "~/app/store/types/parent-types";
import { usePlayerClubQuery } from "~/app/store/parent/parentApi";
import { useUserQuery } from "~/app/store/user/userApi";
import { useMyClubQuery } from "~/app/store/coach/coachApi";
import { useEffect, useState } from "react";
import { useSuperClubQuery } from "~/app/store/supervisor/supervisorMainApi";

type Props = {
  opened: boolean;
  setOpened: any;
};

const Toolbar = ({ setOpened }: Props) => {
  const windowSize = useWindowSize();
  const { data: user } = useUserQuery(null);

  const [club, setClub] = useState<ParentClub>();

  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const { data: playerClub } = usePlayerClubQuery(
    { id: selectedPlayer?.id },
    { skip: !selectedPlayer?.id || user?.user_type !== "Parent" }
  );

  const { data: coachClub } = useMyClubQuery(
    {},
    { skip: user?.user_type !== "Coach" }
  );

  const { data: superClub } = useSuperClubQuery(
    {},
    { skip: user?.user_type !== "Supervisor" }
  );

  useEffect(() => {
    if (playerClub) setClub(playerClub);
    if (coachClub) setClub(coachClub);
    if (superClub) setClub(superClub);
  }, [coachClub, playerClub, superClub]);

  return (
    <nav className="w-full flex justify-between items-center shadow-md p-2 lg:p-4 bg-perfBlue lg:bg-white overflow-scroll">
      <div className="bg-fadedGray flex w-fit gap-2 justify-between items-center">
        <button
          className="block lg:hidden text-white lg:text-black border-0"
          onClick={() => setOpened(true)}
        >
          <AppIcons className="w-6 h-6 " icon="Bars3BottomLeftIcon:solid" />
        </button>
        <div className="clubLogo gap-2 hidden lg:flex justify-center items-center">
          <Avatar
            radius={"xl"}
            className="w-8"
            src={club?.icon_url}
            alt="club logo"
          />
          <span>{club?.name || "Alam alryada"}</span>
        </div>

        {/* Select Player For the Parent */}
        {user?.user_type === "Parent" && <SelectUser />}
      </div>
      <div className="right flex gap-2 justify-center items-center">
        {/* Messages Menu */}
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar
              className="cursor-pointer"
              size={windowSize.width && windowSize.width < 400 ? "sm" : "md"}
              radius="xl"
            >
              <AppIcons
                className="w-4 xs:w-5 text-black"
                icon="EnvelopeIcon:outline"
              />
            </Avatar>
          </Menu.Target>

          <Menu.Dropdown className="w-96 max-w-full">
            <h2 className="m-2 text-perfLightBlack text-sm">Messages</h2>
            <Divider />
            <Menu.Label>
              <OneMessageBox
                image="https://img.freepik.com/free-photo/senior-man-face-portrait-wearing-bowler-hat_53876-148154.jpg?w=2000"
                id={1}
                isActive={true}
                name="John Doue"
                lastMessageText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, voluptatum? Quos sed officiis assumenda officia modi, magnam odio saepe hic vel quisquam facere aspernatur dolorum ea consequatur eos, quae tenetur."
                lastMessageTime="10:30 am"
                unreadMessagesNumber={2}
              />
              <OneMessageBox
                id={2}
                image="https://i.pinimg.com/originals/39/e9/b3/39e9b39628e745a39f900dc14ee4d9a7.jpg"
                isActive={false}
                name="Mohammed Mon'em"
                lastMessageText="Lorem ipsum ."
                lastMessageTime="11:43 pm"
                unreadMessagesNumber={3}
              />
            </Menu.Label>
            <Link
              to="messages"
              className="flex w-full justify-center items-center p-2 hover:bg-pagesBg text-sm"
            >
              <span>All Messages</span>
            </Link>
          </Menu.Dropdown>
        </Menu>

        {/* Notifications Menu */}
        <Notifications />

        {/* User Menu */}
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar
              size={windowSize.width && windowSize.width < 400 ? "sm" : "md"}
              src={user?.avatar}
              alt="userImage"
              className="cursor-pointer"
              radius="xl"
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
                    localStorage.clear();
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

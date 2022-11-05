import AppIcons from "@main/core/AppIcons";
import navigationConfig from "app/configs/navigationConfig";
import React, { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Drawer, Group, Grid, Collapse } from "@mantine/core";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import Cookies from "js-cookie";
import { userApi } from "app/store/user/userApi";
import { useDispatch } from "react-redux";

// import { IconChevronRight, IconChevronLeft } from "@tabler/icons";
import { UnstyledButton, Avatar, Text } from "@mantine/core";

type Props = {
  opened: boolean;
  setOpened: any;
};

const Navigation = ({ opened, setOpened }: Props) => {
  return (
    <>
      {/* Large Screens SideBar */}
      <Grid.Col
        style={{
          boxShadow: "4px 8px 14px 0px #2D43771F",
        }}
        className="hidden lg:flex justify-center overflow-scroll min-h-screen max-h-full p-0 pt-6 bg-white"
        span={2}
      >
        <div
          style={{
            // boxShadow: "4px 8px 14px 0px #2D43771F",
            width: "-webkit-fill-available",
          }}
          className="Test h-full flex flex-col overflow-scroll justify-center items-center gap-2 fixed"
        >
          <Info />
          <NavList setOpened={setOpened} />
          <UserButton />
        </div>
      </Grid.Col>

      {/* Small Screens SideBar */}
      <div
        style={{
          boxShadow: "4px 8px 14px 0px #2D43771F",
        }}
        className="block lg:hidden h-screen p-0 pt-6 bg-white"
      >
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          padding="sm"
          size="sm"
          overlayOpacity={0.55}
          className="overflow-scroll"
        >
          <Info />
          <NavList setOpened={setOpened} />
          <UserButton />
        </Drawer>
      </div>
    </>
  );
};

export default memo(Navigation);

const Info = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-4">
      {/* Logo */}
      <Box
        sx={{
          // height: { xs: 56, sm: 100 },
          padding: 2.5,
          display: "flex",
          flexDirection: "row",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          margin: "auto",
        }}
        className="app-logo"
        onClick={() => navigate("/")}
      >
        <img
          style={{ height: "100%" }}
          src="/assets/images/logo/logo.png"
          alt="performs-logo"
        />
      </Box>

      {/* Info */}
      <div className="info pt-2 flex flex-col justify-center items-center gap-2">
        <h1 className="app_name font-semibold text-perfBlue text-lg">
          Performs
        </h1>
        <h3 className="text-xs">Maximize Players Full Potential.</h3>
      </div>
    </div>
  );
};

const NavList = ({ setOpened }: any) => {
  return (
    <div className="flex w-full px-6 flex-col gap-2">
      {navigationConfig.map((i) => (
        <NavLink
          to={i.url}
          key={i.id}
          onClick={() => setOpened(false)}
          className={
            "rounded-lg text-sm font-medium flex content-center items-center gap-2 py-3 xl:py-4 w-full "
          }
          style={({ isActive }) =>
            isActive
              ? {
                  backgroundColor: "#2F80ED",
                  color: "#ffffff",
                  justifyContent: "center",
                  boxShadow: "0px 5px 20px 0px #13234B42",
                }
              : {
                  color: "#828282",
                }
          }
        >
          <AppIcons className="w-5 h-5" icon={i.icon} />
          <p>{i.title}</p>
        </NavLink>
      ))}
    </div>
  );
};

// we will use this component later (https://mantine.dev/core/menu/#custom-component-as-target)
const UserButton = () => {
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="w-full bg-perfLightBlue text-perfGray3 mb-4">
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className=" my-6 mx-auto flex justify-center items-center"
      >
        <Group>
          <Avatar className="rounded-full" size={40}>
            <img
              src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000"
              alt="avatar"
            />
          </Avatar>
          <div>
            <Text className="text-base text-perfGray3">My Profile</Text>
            {!opened && (
              <Text size="xs" color="blue">
                Hassan Kamal
              </Text>
            )}
          </div>
        </Group>
      </UnstyledButton>
      <Collapse in={opened}>
        <div className="flex flex-col gap-2 mb-10 w-full">
          <Link className="w-full hover:bg-slate-200 py-2" to="/profile">
            <div className="flex gap-2 mx-10">
              <AppIcons className="w-4 h-4" icon="UserIcon:outline" />
              <p>View profile</p>
            </div>
          </Link>
          <Link className="w-full hover:bg-slate-200 py-2" to="/profile">
            <div className="flex gap-2 mx-10">
              <AppIcons className="w-4 h-4" icon="Cog6ToothIcon:outline" />
              <p>Settings</p>
            </div>
          </Link>
          <div
            onClick={() => {
              Cookies.remove("token");
              dispatch(userApi.util.resetApiState());
            }}
            className="w-full cursor-pointer hover:bg-slate-200 py-2"
          >
            <div className="flex gap-2 mx-10">
              <AppIcons
                className="w-4 h-4"
                icon="ArrowRightOnRectangleIcon:outline"
              />
              <p>Sign out</p>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

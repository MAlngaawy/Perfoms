import AppIcons from "@main/core/AppIcons";
import navigationConfig from "app/configs/navigationConfig";
import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Drawer, Group, Button, Grid } from "@mantine/core";
import { NavLink } from "react-router-dom";
import cn from "classnames";

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
          style={({ isActive }) =>
            isActive
              ? {
                  backgroundColor: "#2F80ED",
                  color: "#fff",
                  justifyContent: "center",
                  boxShadow: "0px 5px 20px 0px #13234B42",
                }
              : undefined
          }
          to={i.url}
          key={i.id}
          onClick={() => setOpened(false)}
          className={
            "rounded-lg text-sm font-medium flex content-center items-center gap-2 py-3 xl:py-4 w-full text-perfGray3"
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
  return (
    <UnstyledButton className=" my-6 mx-auto flex justify-center items-center">
      <Group>
        <Avatar className="rounded-full" size={40}>
          <img
            src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000"
            alt="avatar"
          />
        </Avatar>
        <div>
          <Text className="text-base text-perfGray3">My Profile</Text>
          <Text size="xs" color="blue">
            Hassan Kamal
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
};

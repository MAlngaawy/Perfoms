import {
  Avatar,
  Breadcrumbs,
  Group,
  Select,
  Skeleton,
  Text,
} from "@mantine/core";
import React, { forwardRef, useEffect, useState } from "react";
import AppIcons from "~/@main/core/AppIcons";
import { Controller, useForm } from "react-hook-form";
import { useSuperPlayersQuery } from "~/app/store/supervisor/supervisorMainApi";
import { Link, useNavigate } from "react-router-dom";
import { TeamPlayers } from "~/app/store/types/clubManager-types";
import { useCoachGetAllMyPlayersQuery } from "~/app/store/coach/coachApi";
import { useAdminPlayersQuery } from "~/app/store/clubManager/clubManagerApi";
import { useUserQuery } from "~/app/store/user/userApi";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {};

const SearchPlayersPage = (props: Props) => {
  const [playersData, setPlayersData] = useState<TeamPlayers | any>();
  const { handleSubmit, register, control } = useForm();
  const navigate = useNavigate();
  const { data: user } = useUserQuery({});

  const { data: coachPlayers } = useCoachGetAllMyPlayersQuery({});
  const { data: superPlayers } = useSuperPlayersQuery({});
  const { data: adminPlayers } = useAdminPlayersQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );

  useEffect(() => {
    if (superPlayers) setPlayersData(superPlayers);
    if (coachPlayers) setPlayersData(coachPlayers);
    if (adminPlayers) setPlayersData(adminPlayers);
  }, [superPlayers, coachPlayers, adminPlayers]);

  const send = (data: any) => {
    if (data.id === undefined) {
      AppUtils.showNotificationFun(
        "Error",
        "Wrong",
        "This player doesn't exist!"
      );
    } else {
      navigate(`player/${data.id}`);
    }
  };

  const data = playersData?.results.map((player: any) => {
    return {
      label: player.name,
      value: JSON.stringify(player.id),
      image: player.icon,
    };
  });

  interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    image: string;
    label: string;
  }

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} />
          <div>
            <Text size="sm">{label}</Text>
          </div>
        </Group>
      </div>
    )
  );

  const items = [
    { title: "Reports", href: "/main-reports" },
    { title: "Search Players", href: "" },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <div className="bg-white rounded-xl flex flex-col gap-4 mt-20 justify-center items-center py-9 px-4 w-11/12 sm:w-8/12 mx-auto">
        <h2 className="text-sm sm:text-lg  md:text-xl text-perfGray1 font-semibold">
          Search for a player by name
        </h2>
        <form
          className="flex w-full xs:w-11/12 justify-center"
          onSubmit={handleSubmit(send)}
        >
          {data ? (
            <>
              <Controller
                control={control}
                {...register("id")}
                render={({ field }) => (
                  <Select
                    id="id"
                    {...field}
                    data={data}
                    itemComponent={SelectItem}
                    icon={
                      <AppIcons
                        icon="MagnifyingGlassIcon:outline"
                        className="w-5 h-5 text-perfGray1"
                      />
                    }
                    sx={{
                      ".mantine-Select-input": {
                        background: "#eee",
                        borderTopLeftRadius: 30,
                        borderBottomLeftRadius: 30,
                        margin: 0,
                        padding: 0,
                        paddingLeft: 30,
                      },
                      ".mantine-Select-rightSection": {
                        display: "none",
                      },
                    }}
                    rightSection={false}
                    className="m-0 p-0 h-fit w-8/12"
                    searchable
                  />
                )}
              />

              <button
                type="submit"
                className="bg-perfGray3 text-white px-2 rounded-tr-full rounded-br-full"
              >
                Go
              </button>
            </>
          ) : (
            <Skeleton width={"66.666666%"} height={40} radius={30} />
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchPlayersPage;

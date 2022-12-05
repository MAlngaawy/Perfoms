import { Avatar, Group, Select, Text } from "@mantine/core";
import React, { forwardRef, useEffect } from "react";
import AppIcons from "~/@main/core/AppIcons";
import { Controller, useForm } from "react-hook-form";
import { useSuperPlayersQuery } from "~/app/store/supervisor/supervisorMainApi";

type Props = {};

const SearchPlayersPage = (props: Props) => {
  const { handleSubmit, register, control } = useForm();

  const {
    data: players,
    isSuccess,
    isError,
    isLoading,
  } = useSuperPlayersQuery({});

  const send = (data: any) => {
    console.log(data);
  };

  const data = players?.results.map((player) => {
    return {
      label: player.name,
      value: JSON.stringify(player.id),
      image: player.icon,
    };
  });

  useEffect(() => {
    if (isSuccess) console.log(data);
  }, [isSuccess]);

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

  return (
    <div className="bg-white rounded-xl flex flex-col gap-8 mt-20 justify-center items-center py-9 px-4 w-11/12 sm:w-8/12 mx-auto">
      <h2 className="text-xl text-perfGray1 font-semibold">
        Search for a player by name or phone number
      </h2>
      <form
        className="flex w-11/12 justify-center"
        onSubmit={handleSubmit(send)}
      >
        {data && (
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
        )}

        <button
          type="submit"
          className="bg-perfGray3 text-white px-2 rounded-tr-full rounded-br-full"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchPlayersPage;

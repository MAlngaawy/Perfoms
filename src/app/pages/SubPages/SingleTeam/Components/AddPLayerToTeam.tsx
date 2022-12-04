import React, { useState, ReactNode, LegacyRef, forwardRef } from "react";
import { Modal, Group, Avatar, Text, Select } from "@mantine/core";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import { Controller, useForm } from "react-hook-form";
import PerfSelect from "../../../../../@main/components/Select";

type Props = {};

const playersDate = [
  {
    label: "Player One",
    image:
      "https://daisybeattyphotography.com/wp-content/uploads/2016/10/best-child-portrait-photographer-nyc-daisy-beatty-2016-677x1024(pp_w480_h726).jpg",
    id: 1,
    value: "1",
  },
  {
    label: "Player Two",
    image:
      "https://images.unsplash.com/photo-1497881807663-38b9a95b7192?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGQlMjBwb3J0cmFpdHxlbnwwfHwwfHw%3D&w=1000&q=80",
    id: 2,
    value: "2",
  },
  {
    label: "Player Three",
    image:
      "https://images.squarespace-cdn.com/content/v1/5575a19ee4b0e1635672b29f/1578629190658-GJ788H0T89UXLS22LE67/Remember+When+Portraits+Children%27s+Photography+Cincinnati+Ohio?format=1000w",
    id: 3,
    value: "3",
  },
  {
    label: "Player Four",
    image:
      "https://images.squarespace-cdn.com/content/v1/575c8f5ce32140042bb45885/1475886827268-1KWOE3EXS6P3BDXMU2OU/DSCF9047-2.jpg?format=1000w",
    id: 4,
    value: "4",
  },
];

const AddPlayer = (props: Props) => {
  const [opened, setOpened] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    setOpened(false);
    reset({ player: "" });
  };

  interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    image: string;
    label: string;
    id: string;
  }

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, id, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar radius={"xl"} size="sm" src={image} />
          <div>
            <Text size="sm">{label}</Text>
          </div>
        </Group>
      </div>
    )
  );

  return (
    <div>
      <>
        <Modal
          opened={opened}
          onClose={() => {
            setOpened(false);
            reset({ player: "" });
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="player"
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Pick one"
                  searchable
                  itemComponent={SelectItem}
                  maxDropdownHeight={400}
                  // {...register("coach")}
                  nothingFound="No options"
                  data={playersDate}
                  filter={(value, item) =>
                    item.label
                      ?.toLowerCase()
                      .includes(value.toLowerCase().trim()) || false
                  }
                />
              )}
            />
            <SubmitButton isLoading={false} text="Add Player" />
          </form>
        </Modal>

        <Group position="left" className="w-full h-full">
          <button
            className="w-full h-full p-4 bg-slate-300 text-perfGray3 rounded-lg"
            onClick={() => setOpened(true)}
          >
            + Add Player
          </button>
        </Group>
      </>
    </div>
  );
};

export default AddPlayer;

import React, { useState, forwardRef } from "react";
import { Modal, Group, Avatar, Text, Select } from "@mantine/core";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import { Controller, useForm } from "react-hook-form";

type Props = {
  type: "Player" | "Coach" | "Supervisor";
  // data: { name: string; image: string; id: number }[];
};

const usersDate = [
  {
    label: "User One",
    image:
      "https://previews.123rf.com/images/blueskyimage/blueskyimage1311/blueskyimage131101911/23810213-sport-trainer-portrait-of-happy-young-coach.jpg",
    id: 1,
    value: "1",
  },
  {
    label: "User Two",
    image:
      "https://static.clubs.nfl.com/image/private/t_person_squared_mobile/f_auto/jaguars/gpvbkyjpty6w3kpdkv9m.jpg",
    id: 2,
    value: "2",
  },
  {
    label: "User Three",
    image:
      "https://previews.123rf.com/images/blueskyimage/blueskyimage1311/blueskyimage131101911/23810213-sport-trainer-portrait-of-happy-young-coach.jpg",
    id: 3,
    value: "3",
  },
  {
    label: "User Four",
    image:
      "https://static.clubs.nfl.com/image/private/t_person_squared_mobile/f_auto/jaguars/gpvbkyjpty6w3kpdkv9m.jpg",
    id: 4,
    value: "4",
  },
];

const AddUserForm = ({ type }: Props) => {
  const [opened, setOpened] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(type, data);
    setOpened(false);
    reset({ user: "" });
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
            reset({ user: "" });
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="user"
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Pick one"
                  searchable
                  itemComponent={SelectItem}
                  maxDropdownHeight={400}
                  // {...register("user")}
                  nothingFound="No options"
                  data={usersDate}
                  filter={(value, item) =>
                    item.label
                      ?.toLowerCase()
                      .includes(value.toLowerCase().trim()) || false
                  }
                />
              )}
            />
            <SubmitButton isLoading={false} text={`Add ${type}`} />
          </form>
        </Modal>

        <Group position="left">
          <button
            className="p-2 sm:px-6 sm:py-2 text-xs sm:text-base border border-perfGray3 text-perfGray3 rounded-3xl"
            onClick={() => setOpened(true)}
          >
            + Add {type}
          </button>
        </Group>
      </>
    </div>
  );
};

export default AddUserForm;

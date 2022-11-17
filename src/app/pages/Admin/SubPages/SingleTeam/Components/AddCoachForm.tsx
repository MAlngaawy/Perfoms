import React, { useState, ReactNode, LegacyRef, forwardRef } from "react";
import { Modal, Group, Avatar, Text, Select } from "@mantine/core";
import SubmitButton from "../../../../../../@main/components/SubmitButton";
import { Controller, useForm } from "react-hook-form";

type Props = {};

const coachesDate = [
  {
    label: "Coach One",
    image:
      "https://previews.123rf.com/images/blueskyimage/blueskyimage1311/blueskyimage131101911/23810213-sport-trainer-portrait-of-happy-young-coach.jpg",
    id: 1,
    value: "1",
  },
  {
    label: "Coach Two",
    image:
      "https://static.clubs.nfl.com/image/private/t_person_squared_mobile/f_auto/jaguars/gpvbkyjpty6w3kpdkv9m.jpg",
    id: 2,
    value: "2",
  },
  {
    label: "Coach Three",
    image:
      "https://previews.123rf.com/images/blueskyimage/blueskyimage1311/blueskyimage131101911/23810213-sport-trainer-portrait-of-happy-young-coach.jpg",
    id: 3,
    value: "3",
  },
  {
    label: "Coach Four",
    image:
      "https://static.clubs.nfl.com/image/private/t_person_squared_mobile/f_auto/jaguars/gpvbkyjpty6w3kpdkv9m.jpg",
    id: 4,
    value: "4",
  },
];

const AddCoachForm = (props: Props) => {
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
    reset({ coach: "" });
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
            reset({ coach: "" });
          }}
          title="Introduce yourself!"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="coach"
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Pick one"
                  searchable
                  itemComponent={SelectItem}
                  maxDropdownHeight={400}
                  // {...register("coach")}
                  nothingFound="No options"
                  data={coachesDate}
                  filter={(value, item) =>
                    item.label
                      ?.toLowerCase()
                      .includes(value.toLowerCase().trim()) || false
                  }
                />
              )}
            />
            <SubmitButton isLoading={false} text="Add Coach" />
          </form>
        </Modal>

        <Group position="left">
          <button
            className="px-6 py-2 my-6 bg-slate-300 text-perfGray3 rounded-3xl"
            onClick={() => setOpened(true)}
          >
            + Add Coach
          </button>
        </Group>
      </>
    </div>
  );
};

export default AddCoachForm;

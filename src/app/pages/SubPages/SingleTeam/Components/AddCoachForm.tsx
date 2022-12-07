import React, { useState, forwardRef, useEffect } from "react";
import { Modal, Group, Avatar, Text, Select } from "@mantine/core";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import { Controller, useForm } from "react-hook-form";
import {
  useSuperAddTeamCoachesMutation,
  useSuperAllCoachesQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import { showNotification } from "@mantine/notifications";

type Props = {
  teamId: string | number;
};

const AddCoachForm = ({ teamId }: Props) => {
  const [opened, setOpened] = useState(false);
  const [coachesData, setCoachesData] = useState<any>([]);

  const { data: coaches } = useSuperAllCoachesQuery({});

  const [addCoach, { isLoading, isError, isSuccess }] =
    useSuperAddTeamCoachesMutation();

  useEffect(() => {
    let test = coaches?.results.map((coach) => {
      return {
        label: coach.first_name + coach.first_name,
        image: coach.avatar,
        value: coach.id,
        id: coach.id,
      };
    });
    setCoachesData(test);
    console.log(test);
  }, [coaches]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log({ coach_id: data.coach, team_id: teamId });
    addCoach({ coach_id: data.coach, team_id: teamId }).then(() => {
      showNotification({
        message: "Successfly Added Coach",
        color: "green",
        title: "Done",
        styles: {
          root: {
            backgroundColor: "#27AE60",
            borderColor: "#27AE60",
            "&::before": { backgroundColor: "#fff" },
          },

          title: { color: "#fff" },
          description: { color: "#fff" },
          closeButton: {
            color: "#fff",
          },
        },
      });
    });
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
                  data={coachesData}
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

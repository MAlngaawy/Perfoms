import React, { useState, forwardRef, useEffect } from "react";
import { Modal, Group, Avatar, Text, Select } from "@mantine/core";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import { Controller, useForm } from "react-hook-form";
import { useSuperAddTeamCoachesMutation } from "~/app/store/supervisor/supervisorMainApi";
import { showNotification } from "@mantine/notifications";
import {
  useGetFilteredCoachesQuery,
  useGetTeamInfoQuery,
  useUserQuery,
} from "~/app/store/user/userApi";
import { useAdminAddTeamCoachesMutation } from "~/app/store/clubManager/clubManagerApi";
import __ from "lodash";
import { useParams } from "react-router-dom";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {
  teamId: string | number;
  teamCoaches: any;
};

const AddCoachForm = ({ teamId, teamCoaches }: Props) => {
  const [opened, setOpened] = useState(false);
  const [coachesData, setCoachesData] = useState<any>([]);
  const { data: user } = useUserQuery({});
  const { team_id } = useParams();
  const { data: teamInfo } = useGetTeamInfoQuery(
    { team_id },
    { skip: !team_id }
  );

  const { data: filteredCoaches, refetch: refetchFilteredCoaches } =
    useGetFilteredCoachesQuery(
      {
        team_id,
        sport_id: teamInfo?.sport?.id,
      },
      {
        skip: !teamInfo || !teamId,
      }
    );

  const [superAddCoach] = useSuperAddTeamCoachesMutation();
  const [adminAddCoach] = useAdminAddTeamCoachesMutation();

  useEffect(() => {
    if (filteredCoaches) {
      let filteredCoachesOptions = filteredCoaches.map((coach) => {
        return {
          label: coach.first_name + " " + coach.last_name,
          image: coach.avatar,
          value: coach.id,
          id: coach.id,
        };
      });
      setCoachesData(filteredCoachesOptions);
    }
  }, [filteredCoaches]);

  const { handleSubmit, reset, control } = useForm();

  const onSubmit = async (data: any) => {
    const addCoachFunction =
      user?.user_type === "Supervisor" ? superAddCoach : adminAddCoach;

    try {
      await addCoachFunction({ coach_id: data.coach, team_id: +teamId });
      refetchFilteredCoaches();
      AppUtils.showNotificationFun(
        "Success",
        "Done",
        "Successfully Added Coach"
      );
    } catch (error) {
      // Handle error here
      console.error("Error adding coach:", error);
    }

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
          title={`Add Coach`}
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
            className="px-6 py-2 my-2 bg-slate-300 text-perfGray3 rounded-3xl"
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

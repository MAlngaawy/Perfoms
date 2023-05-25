import React, { useState, forwardRef, useEffect } from "react";
import { Modal, Group, Avatar, Text, Select } from "@mantine/core";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import { Controller, useForm } from "react-hook-form";
import {
  useSuperAddTeamCoachesMutation,
  useSuperAllCoachesQuery,
  useSuperSubCoachesQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import { showNotification } from "@mantine/notifications";
import { useGetTeamInfoQuery, useUserQuery } from "~/app/store/user/userApi";
import {
  useAdminAddTeamCoachesMutation,
  useAdminAllCoachesQuery,
  useAdminCoachesQuery,
  useAdminSubCoachQuery,
} from "~/app/store/clubManager/clubManagerApi";
import __ from "lodash";
import { useParams } from "react-router-dom";

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

  const { data: superCoaches } = useSuperAllCoachesQuery({});
  const { data: superSubCoaches } = useSuperSubCoachesQuery({});
  const { data: adminCoaches } = useAdminAllCoachesQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );
  const { data: adminSubCoaches } = useAdminSubCoachQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );

  const [superAddCoach] = useSuperAddTeamCoachesMutation();
  const [adminAddCoach] = useAdminAddTeamCoachesMutation();

  useEffect(() => {
    if (superCoaches && superSubCoaches) {
      console.log("SuperCoaches", superCoaches);
      console.log("superSubCoaches", superSubCoaches);

      const filterdCoaches = __.xorBy(
        [...superCoaches.results, ...superSubCoaches.results],
        teamCoaches,
        "id"
      );
      const filterCoachesByTeamSport = filterdCoaches.filter((coach) => {
        return coach.sport === teamInfo?.sport;
      });
      let test = filterCoachesByTeamSport.map((coach) => {
        return {
          label: coach.first_name + " " + coach.last_name,
          image: coach.avatar,
          value: coach.id,
          id: coach.id,
        };
      });
      setCoachesData(test);
    }
    if (adminCoaches && adminSubCoaches) {
      console.log("adminCoaches", adminCoaches);
      console.log("adminCoaches", adminSubCoaches);

      const filterdCoaches = __.xorBy(
        [...adminCoaches.results, ...adminSubCoaches.results],
        teamCoaches,
        "id"
      );
      const filterCoachesByTeamSport = filterdCoaches.filter((coach) => {
        return coach.sport === teamInfo?.sport;
      });

      let test = filterCoachesByTeamSport.map((coach) => {
        return {
          label: coach.first_name + " " + coach.last_name,
          image: coach.avatar,
          value: coach.id,
          id: coach.id,
        };
      });
      setCoachesData(test);
    }
  }, [superCoaches, superSubCoaches, adminCoaches, adminSubCoaches, teamInfo]);

  const { handleSubmit, reset, control } = useForm();

  const onSubmit = (data: any) => {
    if (user?.user_type === "Supervisor") {
      superAddCoach({ coach_id: data.coach, team_id: +teamId }).then(() => {
        showNotification({
          message: "Successfully Added Coach",
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
    }

    if (user?.user_type === "Admin") {
      adminAddCoach({ coach_id: data.coach, team_id: +teamId }).then(() => {
        showNotification({
          message: "Successfully Added Coach",
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

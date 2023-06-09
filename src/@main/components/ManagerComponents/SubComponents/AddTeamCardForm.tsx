import { useState, ReactNode, useEffect } from "react";
import { Modal, Group, Input, Select } from "@mantine/core";
import AppIcons from "../../../core/AppIcons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "../../SubmitButton";
import PerfSelect from "../../Select";
import { axiosInstance } from "~/app/configs/dataService";
import { showNotification } from "@mantine/notifications";
import { useGeneralTeamsQuery, useUserQuery } from "~/app/store/user/userApi";
import { Sports } from "~/app/store/types/clubManager-types";
import {
  useAdminSportsQuery,
  useAdminTeamsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import { useSuperTeamsQuery } from "~/app/store/supervisor/supervisorMainApi";
import AppUtils from "~/@main/utils/AppUtils";
import AvatarInput from "~/@main/components/shared/AvatarInput";

type Props = {
  // refetch: any;
  sport_id: string;
};

const AddTeamCardForm = ({ sport_id }: Props) => {
  const [opened, setOpened] = useState(false);
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sports, setSports] = useState<Sports | undefined | null>();
  const { data: user } = useUserQuery({});
  const { refetch: superRefetch } = useSuperTeamsQuery({});
  const { refetch: adminRefetch } = useAdminTeamsQuery(
    { club_id: user?.club, sport_id: +sport_id },
    { skip: !user?.club }
  );
  const { data: AdminSports } = useAdminSportsQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );
  const { refetch: RefetchGeneralTeams } = useGeneralTeamsQuery({});

  useEffect(() => {
    if (AdminSports) setSports(AdminSports);
  }, [AdminSports]);

  const schema = yup.object().shape({
    icon: yup.mixed(),
    rate_per: yup.string().required("please chose the rating schedule"),
    name: yup.string().required("please add the team name"),
    players_count: yup.number(),
    from_age: yup.number(),
    to_age: yup.number(),
    gender: yup.string(),
    attend_per: yup.string(),
  });

  const resetFields = () => {
    reset({
      icon: "",
      rate_per: "",
      name: "",
      players_count: "",
      from_age: "",
      to_age: "",
      gender: "",
      attend_per: "",
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit Form Function
  const onSubmitFunction = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    if (userAvatar) {
      const image = await AppUtils.resizeImage(userAvatar);
      formData.append("icon", image as string);
    }
    try {
      const theSport = formData.get("sport");
      if (!theSport && user?.user_type === "Admin") {
        setLoading(false);
        return AppUtils.showNotificationFun(
          "Error",
          "Sorry",
          "You have to select sport first"
        );
      }

      axiosInstance
        .post(
          user?.user_type === "Supervisor"
            ? "supervisor/add-team/"
            : `club-manager/teams/${formData.get("sport")}/add-team/`,
          formData
        )
        .then((res) => {
          if (user?.user_type === "Supervisor") {
            superRefetch();
          } else {
            adminRefetch();
          }
          setLoading(false);
          setOpened(false);
          showNotification({
            title: "Done",
            color: "green",
            message: "Team Added",
          });
          RefetchGeneralTeams();
          resetFields();
        })
        .catch(() => {
          setLoading(false);
          AppUtils.showNotificationFun(
            "Error",
            "Sorry",
            "Something went wrong, try again later"
          );
        });
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div>
      <>
        <Modal
          opened={opened}
          onClose={() => {
            resetFields();
            setUserAvatar(null);
            setOpened(false);
          }}
          title="Add Team"
        >
          <form className="flex flex-col gap-4" onSubmit={onSubmitFunction}>
            {/* Image Upload */}
            <AvatarInput
              userAvatar={userAvatar}
              setUserAvatar={setUserAvatar}
              inputAlt="Team Icon"
            />

            <PerfSelect
              control={control}
              placeholder="Rating Schedule"
              data={[
                { label: "Every Week", value: "Week" },
                { label: "Every 2 Week", value: "Two_Weeks" },
                { label: "Every Month", value: "Month" },
              ]}
              normalStyle
              name="rate_per"
              error={errors.rate_per && (errors.rate_per.message as ReactNode)}
            />

            <Input.Wrapper
              id="name"
              withAsterisk
              // label="Name"
              error={errors.name && (errors.name.message as ReactNode)}
            >
              <Input
                placeholder="Name"
                sx={{
                  ".mantine-Input-input	": {
                    border: 0,
                    padding: 0,
                    borderBottom: 1,
                    borderStyle: "solid",
                    borderRadius: 0,
                    minHeight: 20,
                  },
                }}
                className="border-b"
                {...register("name")}
                id="name"
              />
            </Input.Wrapper>

            {user?.user_type === "Admin" && sports ? (
              <PerfSelect
                control={control}
                placeholder="Sport"
                normalStyle
                data={sports?.results?.map((sport, idx) => {
                  return {
                    label: sport.name,
                    value: JSON.stringify(sport.id ? sport.id : idx),
                  };
                })}
                name="sport"
                required
              />
            ) : (
              <Select
                placeholder={"This Club Has no sports"}
                disabled
                sx={{
                  ".mantine-Input-input": {
                    border: 0,
                    padding: 0,
                    borderBottom: 1,
                    borderStyle: "solid",
                    borderRadius: 0,
                  },
                  ".mantine-Select-dropdown": {
                    minWidth: 100,
                  },
                  ".mantine-Select-label": {
                    fontSize: 10,
                  },
                }}
                data={["No Sports"]}
              />
            )}

            <PerfSelect
              normalStyle
              control={control}
              placeholder="Gender"
              data={[
                { label: "Males", value: "M" },
                { label: "Females", value: "F" },
                { label: "Both", value: "B" },
              ]}
              name="gender"
              error={errors.gender && (errors.gender.message as ReactNode)}
            />

            <PerfSelect
              normalStyle
              control={control}
              placeholder="Attend Per"
              data={[
                { label: "DAY", value: "DAY" },
                { label: "SESSION", value: "SESSION" },
              ]}
              name="attend_per"
              error={
                errors.attend_per && (errors.attend_per.message as ReactNode)
              }
            />

            <Input.Wrapper
              id="players_count"
              withAsterisk
              // label="Name"
              error={
                errors.players_count &&
                (errors.players_count.message as ReactNode)
              }
            >
              <Input
                placeholder="Max Players Number"
                type="number"
                sx={{
                  ".mantine-Input-input	": {
                    border: 0,
                    padding: 0,
                    borderBottom: 1,
                    borderStyle: "solid",
                    borderRadius: 0,
                    minHeight: 20,
                  },
                }}
                className="border-b"
                {...register("players_count")}
                id="players_count"
              />
            </Input.Wrapper>

            <Input.Wrapper
              id="from_age"
              withAsterisk
              // label="Name"
              error={errors.from_age && (errors.from_age.message as ReactNode)}
            >
              <Input
                placeholder="From Age"
                type="number"
                sx={{
                  ".mantine-Input-input	": {
                    border: 0,
                    padding: 0,
                    borderBottom: 1,
                    borderStyle: "solid",
                    borderRadius: 0,
                    minHeight: 20,
                  },
                }}
                className="border-b"
                {...register("from_age")}
                id="from_age"
              />
            </Input.Wrapper>

            <Input.Wrapper
              id="toAge"
              withAsterisk
              // label="Name"
              error={errors.to_age && (errors.to_age.message as ReactNode)}
            >
              <Input
                placeholder="To Age"
                type="number"
                sx={{
                  ".mantine-Input-input	": {
                    border: 0,
                    padding: 0,
                    borderBottom: 1,
                    borderStyle: "solid",
                    borderRadius: 0,
                    minHeight: 20,
                  },
                }}
                className="border-b"
                {...register("to_age")}
                id="to_age"
              />
            </Input.Wrapper>

            <SubmitButton isLoading={loading} text="Add Team" />
          </form>
        </Modal>

        <Group position="center" className="h-full">
          <div
            onClick={() => setOpened(true)}
            className="team-card h-full group hover:bg-white cursor-pointer  relative w-full xs:w-72 bg-slate-300 p-8 rounded-xl flex flex-col justify-center items-center gap-4"
          >
            <AppIcons
              className="text-perfGray2 w-16 h-16 group-hover:text-perfBlue"
              icon="PlusIcon:outline"
            />
            <span className="text-perfGray2 text-xl group-hover:text-perfBlue">
              Add Team
            </span>
          </div>
        </Group>
      </>
    </div>
  );
};

export default AddTeamCardForm;

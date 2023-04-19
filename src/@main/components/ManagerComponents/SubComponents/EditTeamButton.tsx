import { useState, ReactNode } from "react";
import { Modal, Button, Group, Input } from "@mantine/core";
import AppIcons from "../../../core/AppIcons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Resizer from "react-image-file-resizer";
import cn from "classnames";
import SubmitButton from "../../SubmitButton";
import PerfSelect from "../../Select";
import { axiosInstance } from "~/app/configs/dataService";
import { showNotification } from "@mantine/notifications";
import { Team } from "~/app/store/types/supervisor-types";
import { useUserQuery } from "~/app/store/user/userApi";
import { useSuperTeamsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminTeamsQuery } from "~/app/store/clubManager/clubManagerApi";
import AppUtils from "~/@main/utils/AppUtils";
import AvatarInput from "../../shared/AvatarInput";

type Props = {
  teamData: Team;
  sport_id: string;
};

const EditButton = ({ teamData, sport_id }: Props) => {
  const [opened, setOpened] = useState(false);
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: user } = useUserQuery({});
  const { refetch: superRefetch } = useSuperTeamsQuery(
    {},
    { skip: !user?.club }
  );
  const { refetch: adminRefetch } = useAdminTeamsQuery(
    { club_id: user?.club, sport_id: +sport_id },
    { skip: !user?.club }
  );

  const schema = yup.object().shape({
    icon: yup.mixed(),
    rate_per: yup.string().required("please chose the rating schedule"),
    name: yup.string().required("please add the team name"),
    players_count: yup.number(),
    from_age: yup.number(),
    to_age: yup.number(),
    gender: yup.string(),
  });

  const resetFields = () => {
    reset({
      icon: "",
      rate_per: teamData.rate_per,
      name: teamData.name,
      players_count: teamData.players_count,
      from_age: teamData.from_age,
      to_age: teamData.to_age,
      gender: teamData.gender,
    });
  };

  const {
    register,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      icon: "",
      rate_per: teamData.rate_per,
      name: teamData.name,
      players_count: teamData.players_count,
      from_age: teamData.from_age,
      to_age: teamData.to_age,
      gender: teamData.gender,
    },
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
      axiosInstance
        .patch(
          user?.user_type === "Supervisor"
            ? `supervisor/teams/${teamData.id}/update/`
            : `club-manager/teams/${teamData.id}/update/`,
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
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Successfully edited team"
          );
        })
        .catch((err) => {
          setLoading(false);
          AppUtils.showNotificationFun("Error", "Sorry", "Can't edit team now");
        });
    } catch (err) {
      console.log(err);
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
            setOpened(false);
          }}
          title="Edit Team"
        >
          <form className="flex flex-col gap-4" onSubmit={onSubmitFunction}>
            <AvatarInput
              userAvatar={userAvatar}
              setUserAvatar={setUserAvatar}
              inputAlt="Team Icon"
              currentImage={teamData.icon_url}
            />

            <PerfSelect
              control={control}
              placeholder="Rating Schedule"
              data={[
                { label: "Every Week", value: "Week" },
                { label: "Every 2 Week", value: "Two_Weeks" },
                { label: "Every Month", value: "Month" },
              ]}
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

            <PerfSelect
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

            <SubmitButton isLoading={loading} text="Save" />
          </form>
        </Modal>

        <Group position="center" className="h-full">
          <div onClick={() => setOpened(true)}>
            <AppIcons
              className="w-4 h-4 text-perfGray3 transform hover:scale-150 hover:text-perfBlue cursor-pointer "
              icon={"PencilSquareIcon:outline"}
            />
          </div>
        </Group>
      </>
    </div>
  );
};

export default EditButton;

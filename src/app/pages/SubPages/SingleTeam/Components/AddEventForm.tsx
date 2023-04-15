import { useState, ReactNode, useEffect } from "react";
import { Modal, Group, Input } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "~/@main/components/SubmitButton";
import { DatePicker } from "@mantine/dates";
import { useParams } from "react-router-dom";
import { useSuperClubQuery } from "~/app/store/supervisor/supervisorMainApi";
import AppUtils from "~/@main/utils/AppUtils";
import { axiosInstance } from "~/app/configs/dataService";
import { useUserQuery } from "~/app/store/user/userApi";
import { useAdminClubQuery } from "~/app/store/clubManager/clubManagerApi";
import { ParentClub } from "~/app/store/types/parent-types";
import AvatarInput from "~/@main/components/shared/AvatarInput";

type Props = {
  refetch: any;
  teamID?: string | null;
  mediaPage?: boolean;
  children: ReactNode;
};

const AddEventForm = ({ refetch, teamID, children }: Props) => {
  const [opened, setOpened] = useState(false);
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clubData, setclubData] = useState<ParentClub>();
  const { team_id: selectedTeam } = useParams();
  const team_id = selectedTeam || teamID;
  const { data: superClubData } = useSuperClubQuery({});
  const { data: adminClubData } = useAdminClubQuery({});
  const { data: user } = useUserQuery({});

  useEffect(() => {
    if (superClubData) setclubData(superClubData);
    if (adminClubData) setclubData(adminClubData);
  }, [superClubData, adminClubData]);

  const schema = yup.object().shape({
    eventName: yup.string().required("please add the Event name"),
    eventDate: yup.date().required("Please add the event date"),
    location: yup.string().required("please add the Event Location"),
  });

  const {
    register,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction = async (e: any) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      if (team_id) {
        formData.append("team", team_id);
      }

      formData.append("club", JSON.stringify(clubData?.id));

      if (userAvatar) {
        const image = await AppUtils.resizeImage(userAvatar);
        formData.append("icon", image as string);
      }

      const endpoint =
        user?.user_type === "Supervisor"
          ? "supervisor/add-event/"
          : "club-manager/teams/events/add-event/";

      await axiosInstance.post(endpoint, formData);

      AppUtils.showNotificationFun("Success", "Done", "Event Created");
      reset({
        eventName: "",
        location: "",
      });
      refetch();
      setOpened(false);
    } catch (error) {
      AppUtils.showNotificationFun("Error", "Sorry", "please try again");
      reset({
        eventName: "",
        location: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <>
        <Modal
          opened={opened}
          onClose={() => {
            setUserAvatar(null);
            setOpened(false);
          }}
          title={`Add Event`}
        >
          <form className="flex flex-col gap-4" onSubmit={onSubmitFunction}>
            {/* Image Upload */}
            <AvatarInput
              userAvatar={userAvatar}
              setUserAvatar={setUserAvatar}
            />

            <Input.Wrapper
              id="eventName"
              withAsterisk
              error={
                errors.eventName && (errors.eventName.message as ReactNode)
              }
            >
              <Input
                placeholder="Event Name"
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
                name="name"
              />
            </Input.Wrapper>

            <Controller
              {...register("date")}
              control={control}
              render={({ field }) => {
                return (
                  <DatePicker
                    name="date"
                    inputFormat="YYYY-MM-DD"
                    sx={{
                      ".mantine-DatePicker-input": {
                        border: 0,
                        padding: 0,
                        borderBottom: 1,
                        borderStyle: "solid",
                        borderRadius: 0,
                        minHeight: 20,
                      },
                    }}
                    onChange={field.onChange}
                    error={
                      errors.eventDate &&
                      (errors.eventDate.message as ReactNode)
                    }
                    placeholder="Pick the event date"
                  />
                );
              }}
            />

            <Input.Wrapper
              id="eventLocation"
              withAsterisk
              error={errors.location && (errors.location.message as ReactNode)}
            >
              <Input
                placeholder="Event Location"
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
                {...register("location")}
                id="location"
              />
            </Input.Wrapper>

            <SubmitButton isLoading={isLoading} text="Add Event" />
          </form>
        </Modal>

        <Group
          position="left"
          onClick={() => {
            if ([null, "0", undefined].includes(teamID)) {
              AppUtils.showNotificationFun(
                "Error",
                "Wrog",
                "Please Select Team first"
              );
            } else {
              setOpened(true);
            }
          }}
        >
          {children}
        </Group>
      </>
    </div>
  );
};

export default AddEventForm;

import { useState, ReactNode, useEffect } from "react";
import { Modal, Button, Group, Input } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Resizer from "react-image-file-resizer";
import cn from "classnames";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import AppIcons from "../../../../../@main/core/AppIcons";
import { DatePicker } from "@mantine/dates";
import AppUtils from "~/@main/utils/AppUtils";
import { axiosInstance } from "~/app/configs/dataService";
import { showNotification } from "@mantine/notifications";
import { useParams } from "react-router-dom";
import { useSuperClubQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminClubQuery } from "~/app/store/clubManager/clubManagerApi";
import { ParentClub, TeamEvent } from "~/app/store/types/parent-types";
import { useUserQuery } from "~/app/store/user/userApi";
import AvatarInput from "~/@main/components/shared/AvatarInput";

type Props = {
  event: TeamEvent;
  refetch: any;
};

const EditEventForm = ({ event, refetch }: Props) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [clubData, setclubData] = useState<ParentClub>();
  const { team_id } = useParams();
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
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit Form Function
  const onSubmitFunction = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const paramData = {
      team: team_id,
      club: clubData?.id,
    };
    console.log(paramData);
    const formData = new FormData(e.currentTarget);
    formData.append("team", team_id || "0");
    formData.append("club", JSON.stringify(clubData?.id));
    if (userAvatar) {
      const image = await AppUtils.resizeImage(userAvatar);
      formData.append("icon", image as string);
    }

    axiosInstance
      .patch(
        user?.user_type === "Supervisor"
          ? `supervisor/events/${event.id}/update/`
          : `club-manager/teams/events/${event.id}/update/`,
        formData
      )
      .then(() => {
        setLoading(false);
        refetch();
        setOpened(false);
        AppUtils.showNotificationFun(
          "Success",
          "Done",
          "Event edited successfully"
        );
        reset({
          eventName: "",
          location: "",
        });
      })
      .catch((err) => {
        setLoading(false);
        reset({
          eventName: "",
          location: "",
        });
        AppUtils.showNotificationFun("Error", "Sorry", "please try again");
      });
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
          title={`Edit Event`}
        >
          <form className="flex flex-col gap-4" onSubmit={onSubmitFunction}>
            {/* Image Upload */}
            <AvatarInput
              currentImage={event.icon}
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
                defaultValue={event.name}
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
                // {...register("name")}
                id="name"
                name="name"
              />
            </Input.Wrapper>

            <Controller
              {...register("eventDate")}
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
                    defaultValue={new Date(event.date)}
                    error={
                      errors.eventDate &&
                      (errors.eventDate.message as ReactNode)
                    }
                    placeholder={"Add Event Date"}
                  />
                );
              }}
            />

            <Input.Wrapper
              id="location"
              withAsterisk
              error={errors.location && (errors.location.message as ReactNode)}
            >
              <Input
                defaultValue={event.location}
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

            <SubmitButton isLoading={loading} text="Edit Event" />
          </form>
        </Modal>

        <Group position="center">
          <button
            className="transform hover:scale-125"
            onClick={() => setOpened(true)}
          >
            <AppIcons
              className="w-4 h-4 text-perfGray3 hover:text-blue-300"
              icon={"PencilSquareIcon:outline"}
            />
          </button>
        </Group>
      </>
    </div>
  );
};

export default EditEventForm;

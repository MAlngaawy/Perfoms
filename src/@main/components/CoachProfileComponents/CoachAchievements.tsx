import React, { useState, ReactNode, useEffect } from "react";
import { Modal, Group, Input } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Details } from "~/app/store/types/parent-types";
import {
  useAddUserAchievementsMutation,
  useDeleteAchievementsMutation,
  useGetCoachAchievementsQuery,
  useGetUserAchievementsQuery,
  useUpdateProfileMutation,
  useUserQuery,
} from "~/app/store/user/userApi";
import NoReport from "~/app/pages/reports/components/NoReport";
import { UserAchievements } from "~/app/store/types/user-types";
import { useParams } from "react-router-dom";
import AppUtils from "~/@main/utils/AppUtils";
import DeleteButton from "../ManagerComponents/SubComponents/DeleteButton";
import { DatePicker } from "@mantine/dates";
import AppIcons from "~/@main/core/AppIcons";

type Props = {
  data: Details | undefined;
  editMode?: boolean;
};

const CoachAchievements = ({ data, editMode }: Props) => {
  // const { data: user } = useUserQuery(null);
  const { coach_id } = useParams();
  const { data: user } = useUserQuery({});
  const [achievements, setAchievements] = useState<UserAchievements>();
  const { data: userAchievements } = useGetUserAchievementsQuery({});
  const [deleteAchievements] = useDeleteAchievementsMutation();
  const { data: coachAchievements } = useGetCoachAchievementsQuery(
    { coach_id: coach_id },
    { skip: !coach_id }
  );

  useEffect(() => {
    if (user?.user_type === "Parent") {
      setAchievements(coachAchievements);
    } else {
      setAchievements(userAchievements);
    }
  }, [userAchievements, coachAchievements]);

  return (
    <div className="bg-white flex flex-col gap-4 h-full rounded-lg md:rounded-2xl p-4 pt-10">
      <div className="title">
        <h2 className="text-lg text-perfLightBlack font-medium mb-6">
          Achievements
        </h2>
        {achievements?.results.length === 0 && (
          <h2 className="my-4">
            No <span className="text-perfBlue"> Achievements </span> Added Yet!
          </h2>
        )}
      </div>
      <div className="prize flex flex-col xs:flex-row md:flex-col gap-4 justify-center items-center">
        {achievements?.results.map((item) => (
          <div
            key={item.id}
            className="flex gap-2 justify-center relative flex-row items-start"
          >
            {editMode && (
              <div className="absolute right-0 top-0">
                <DeleteButton
                  type=" Medal"
                  name={item.place + " " + item.type}
                  deleteFun={() => {
                    deleteAchievements({ id: item.id })
                      .then((res) => {
                        AppUtils.showNotificationFun(
                          "Success",
                          "Done",
                          "Successfully Deleted Achievement"
                        );
                      })
                      .catch((err) => {
                        AppUtils.showNotificationFun(
                          "Error",
                          "Sorry",
                          "Can't Add Achievement Now"
                        );
                      });
                  }}
                />
              </div>
            )}
            <div className="icon">
              <img
                src="/assets/images/medal.png"
                className="w-10"
                alt="medal"
              />
            </div>
            <div className="details break-words w-4/6 md:w-24 pr-5">
              <h2 className="type text-xs font-medium text-perfLightBlack">
                {item.type}
              </h2>
              <p className="text-xs text-perfGray3">
                {item.date}, {item.location}
              </p>
            </div>
          </div>
        ))}
        {editMode && <AddButton />}
      </div>
    </div>
  );
};

export default CoachAchievements;

// Add Achevment Form

function AddButton() {
  const [opened, setOpened] = useState(false);
  const [addAchievements, { isLoading }] = useAddUserAchievementsMutation();

  // Form Schema
  const schema = yup.object().shape({
    type: yup.string().required(),
    place: yup.number(),
    date: yup.string(),
    location: yup.string().required(),
  });

  // use Form Config
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit Form Function
  const onSubmitFunction = (data: any) => {
    setOpened(false);

    const newData = {
      ...data,
      date: AppUtils.formatDate(new Date(data.date)),
    };

    addAchievements(newData)
      .then((res) => {
        AppUtils.showNotificationFun(
          "Success",
          "Done",
          "Successfully Added Achievement"
        );
      })
      .catch((err) => {
        AppUtils.showNotificationFun(
          "Error",
          "Sorry",
          "Can't Add Achievement Now"
        );
      });
    reset({ type: "", place: "", date: "", location: "" });
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          reset({ type: "", place: "", date: "", location: "" });
          setOpened(false);
        }}
      >
        <form
          className="flex flex-col gap-4 "
          onSubmit={handleSubmit(onSubmitFunction)}
        >
          <Input.Wrapper
            error={errors.type && (errors.type.message as ReactNode)}
          >
            <Input placeholder="Medal Type" {...register("type")} />
          </Input.Wrapper>

          <Input.Wrapper error={errors.place && "Please add your player place"}>
            <Input placeholder="place" {...register("place")} />
          </Input.Wrapper>

          <Controller
            {...register("date")}
            render={({ field }) => (
              <DatePicker
                inputFormat="YYYY-MM-DD"
                {...field}
                placeholder="Pick date"
              />
            )}
            control={control}
          />

          <Input.Wrapper
            error={errors.location && (errors.location.message as ReactNode)}
          >
            <Input placeholder="Loaction" {...register("location")} />
          </Input.Wrapper>

          <button type="submit" className="bg-perfBlue text-white p-2">
            Save
          </button>
        </form>
      </Modal>

      <Group position="center">
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="text-sm xl:text-base p-2 transform hover:scale-105 duration-100 bg-white border border-perfGray3 rounded-lg text-perfGray3"
        >
          + Add Achievements
        </button>
      </Group>
    </>
  );
}

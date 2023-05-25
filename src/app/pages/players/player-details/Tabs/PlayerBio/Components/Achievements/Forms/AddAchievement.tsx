import React, { useState, ReactNode, useEffect } from "react";
import { Modal, Group, Input, Select } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AppUtils from "~/@main/utils/AppUtils";
import { useAddPlayerAchievementsMutation } from "~/app/store/user/userApi";
import { useParams } from "react-router-dom";
import AppIcons from "~/@main/core/AppIcons";
import { DatePicker } from "@mantine/dates";

type Props = {};

const AddAchievement = (props: Props) => {
  const { id } = useParams();
  const [opened, setOpened] = useState(false);
  const [addAchievements, { isLoading }] = useAddPlayerAchievementsMutation();

  // Form Schema
  const schema = yup.object().shape({
    type: yup.string().required(),
    place: yup.string().oneOf(["1th", "2th", "3th", "4th"], "Invalid place"),
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

    addAchievements({ player_id: id, ...newData })
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
        title={`Add Achievements`}
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

          <Controller
            {...register("place")}
            render={({ field }) => (
              <Select
                placeholder="Place"
                data={["1th", "2th", "3th", "4th"]}
                {...field}
              />
            )}
            control={control}
          />

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
        <button onClick={() => setOpened(true)} className="">
          <AppIcons
            icon="PlusCircleIcon:outline"
            className="text-perfGray3 w-8 h-8 transform hover:scale-105 duration-100 "
          />
        </button>
      </Group>
    </>
  );
};

export default AddAchievement;

import { yupResolver } from "@hookform/resolvers/yup";
import { Group, Input, Modal } from "@mantine/core";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SubmitButton from "~/@main/components/SubmitButton";
import AppUtils from "~/@main/utils/AppUtils";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import {
  useAddPlayerEducationMutation,
  useAddPlayerLeagueMutation,
  useAddUserEducationMutation,
} from "~/app/store/user/userApi";
import AppIcons from "~/@main/core/AppIcons";
import { DatePicker } from "@mantine/dates";

type Props = {};

const AddLeagueForm = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const [isLoading] = useState(false);
  const [addPlayerLeague] = useAddPlayerLeagueMutation();
  const { id } = useParams();

  console.log("player_id", id);
  // Form Schema
  const schema = yup.object().shape({
    start_date: yup.string().required(),
    end_date: yup.string().required(),
    title: yup.string().required(),
    location: yup.string(),
  });

  // use Form Config
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction = async (data: any, e: any) => {
    e.preventDefault();
    setOpened(false);
    const newData = {
      title: data.title,
      location: data.location,
      start_date: AppUtils.formatDate(new Date(data.start_date)),
      end_date: AppUtils.formatDate(new Date(data.end_date)),
    };

    addPlayerLeague({ player_id: id, ...newData })
      .then(() => {
        AppUtils.showNotificationFun(
          "Success",
          "Done",
          "Successfully added Tournament"
        );
      })
      .catch(() => {
        AppUtils.showNotificationFun(
          "Error",
          "Sorry",
          "Can't add Tournament now"
        );
      });

    reset({ start_date: "", end_date: "", title: "" });
  };

  return (
    <>
      {" "}
      <Modal
        title={`Add tournaments`}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <form
          className="flex flex-col gap-4 "
          onSubmit={handleSubmit(onSubmitFunction)}
        >
          {/*Degree Input  */}
          <Input.Wrapper
            error={errors.degree && "tournaments Name is required "}
          >
            <Input placeholder="name" {...register("title")} />
          </Input.Wrapper>

          {/*Degree Input  */}
          <Input.Wrapper
            error={errors.location && "tournaments Location is required "}
          >
            <Input placeholder="location" {...register("location")} />
          </Input.Wrapper>

          {/* Start And End Year */}
          <Controller
            {...register("start_date")}
            render={({ field }) => (
              <DatePicker
                inputFormat="YYYY-MM-DD"
                {...field}
                placeholder="Pick Start date"
              />
            )}
            control={control}
          />
          <Controller
            {...register("end_date")}
            render={({ field }) => (
              <DatePicker
                inputFormat="YYYY-MM-DD"
                {...field}
                placeholder="Pick End date"
              />
            )}
            control={control}
          />

          <SubmitButton isLoading={isLoading} text="Save" />
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

export default AddLeagueForm;

import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Group, Input, Radio, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import React, { ReactNode, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import AppUtils from "~/@main/utils/AppUtils";
import cn from "classnames";

type Props = {
  addAchievementsFun: any;
  setOpened: any;
};

const AddAchievementForm = ({ addAchievementsFun, setOpened }: Props) => {
  const { id: player_id } = useParams();
  const [placeValue, setPlaceValue] = useState("");
  const [placeError, setPlaceError] = useState(false);
  // Form Schema
  const schema = yup.object().shape({
    type: yup.string().required(),
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
    if (!placeValue) return setPlaceError(true);
    const newData = {
      ...data,
      place: placeValue,
      date: AppUtils.formatDate(new Date(data.date || new Date())),
    };

    // cahnge the request body format if the player_id is excest to know if it used in the player profile
    const addAchievementsPromise = player_id
      ? addAchievementsFun({ player_id, ...newData })
      : addAchievementsFun(newData);

    addAchievementsPromise
      .then((res: any) => {
        console.log(res);
        if (res.status !== 200) {
          setOpened(false);
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Successfully Added Achievement"
          );
        } else {
          AppUtils.showNotificationFun(
            "Error",
            "Sorry",
            "Can't Add Achievement Now"
          );
        }
      })
      .catch(() => {
        AppUtils.showNotificationFun(
          "Error",
          "Sorry",
          "Can't Add Achievement Now"
        );
      });
    reset({ type: "", place: "", date: "", location: "" });
  };

  return (
    <form
      className="flex flex-col gap-4 "
      onSubmit={handleSubmit(onSubmitFunction)}
    >
      <div className="flex flex-wrap justify-center items-center gap-5">
        <Input.Wrapper
          error={errors.type && (errors.type.message as ReactNode)}
        >
          <Input placeholder="Title Of Achievements" {...register("type")} />
        </Input.Wrapper>

        <Input.Wrapper
          error={errors.location && (errors.location.message as ReactNode)}
        >
          <Input placeholder="Loaction" {...register("location")} />
        </Input.Wrapper>
        <Controller
          {...register("date")}
          render={({ field }) => (
            <DatePicker
              inputFormat="YYYY-MM-DD"
              {...field}
              placeholder="Date"
            />
          )}
          control={control}
        />
      </div>

      {/* Start Radio Group */}

      <Radio.Group
        value={placeValue}
        onChange={(e) => {
          setPlaceValue(e);
        }}
        error={placeError && "Please select you place"}
        sx={{
          ".mantine-Group-root": {
            justifyContent: "center",
          },
        }}
        name="Place"
        label="Choose Your Place"
        withAsterisk
      >
        <Group mt="xs">
          <RadioInput
            name="1th"
            value="1th"
            icon="/assets/images/1st.png"
            placeValue={placeValue}
          />
          <RadioInput
            name="2th"
            value="2th"
            icon="/assets/images/2nd.png"
            placeValue={placeValue}
          />
          <RadioInput
            name="3th"
            value="3th"
            icon="/assets/images/3th.png"
            placeValue={placeValue}
          />
          <RadioInput
            name="4th"
            value="4th"
            icon="/assets/images/3th.png"
            placeValue={placeValue}
          />
        </Group>
      </Radio.Group>

      {/* End Radio Group */}

      <button type="submit" className="bg-perfBlue text-white p-2">
        Save
      </button>
    </form>
  );
};

type RadioInputProps = {
  placeValue: string;
  name: string;
  value: string;
  icon: string;
};

const RadioInput = ({ placeValue, name, value, icon }: RadioInputProps) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(placeValue === value);
  }, [placeValue, value]);

  return (
    <Radio
      value={value}
      sx={{
        ".mantine-Radio-body": {
          display: "flex",
          flexDirection: "column-reverse",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        },
        ".mantine-Radio-inner": {
          alignSelf: "center",
        },
      }}
      label={
        <div
          className={cn("flex flex-col justify-center items-center", {
            "opacity-50": !selected,
          })}
        >
          <span className="text-blueGray">{name}</span>
          <Avatar
            src={icon}
            sx={{
              ".mantine-1trwvlz": {
                objectFit: "contain",
              },
            }}
            size={80}
            alt="medal"
          />
        </div>
      }
    />
  );
};

export default AddAchievementForm;

//"/assets/images/1st.png"

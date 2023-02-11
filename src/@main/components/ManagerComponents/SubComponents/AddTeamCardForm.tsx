import { useState, ReactNode, useEffect } from "react";
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
import { useGeneralTeamsQuery, useUserQuery } from "~/app/store/user/userApi";
import { Sports } from "~/app/store/types/clubManager-types";
import {
  useAdminSportsQuery,
  useAdminTeamsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import { useSuperTeamsQuery } from "~/app/store/supervisor/supervisorMainApi";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {
  // refetch: any;
};

const AddTeamCardForm = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const [playerImage, setPlayerImage] = useState<string | unknown>("");
  const [playerImagePreview, setPlayerImagePreview] = useState("null");
  const [loading, setLoading] = useState<boolean>(false);
  const [sports, setSports] = useState<Sports | undefined>();
  const { data: user } = useUserQuery({});
  const { refetch: superRefetch } = useSuperTeamsQuery({});
  const { refetch: adminRefetch } = useAdminTeamsQuery({});
  const { data: AdminSports } = useAdminSportsQuery({});
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
  });

  const resetFields = () => {
    setPlayerImage(null);
    reset({
      icon: "",
      rate_per: "",
      name: "",
      players_count: "",
      from_age: "",
      to_age: "",
      gender: "",
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
  const onSubmitFunction = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    if (playerImage) {
      formData.set("icon", playerImage as string);
    }
    try {
      const theSport = formData.get("sport");
      if (!theSport && user?.user_type === "Admin") {
        AppUtils.showNotificationFun(
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
          setPlayerImage(null);
          showNotification({
            title: "Done",
            color: "green",
            message: "Team Added",
          });
          RefetchGeneralTeams();
        })
        .catch(() => {
          setLoading(false);
          showNotification({
            title: "Wrong",
            color: "red",
            message: "Something went wrong, try again later",
          });
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

  // function to access file uploaded then convert to base64 then add it to the data state
  const uploadImage = async (e: any) => {
    try {
      const file = e.target.files[0];
      const image = await AppUtils.resizeImage(file);
      setPlayerImage(image);
    } catch (err) {
      console.log(err);
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
          title="Add Team"
        >
          <form className="flex flex-col gap-4" onSubmit={onSubmitFunction}>
            {/* Image Upload */}
            <div className=" relative my-2 bg-gray-300 overflow-hidden flex justify-center  items-center  mx-auto w-28  h-28 rounded-lg ">
              <Button
                {...register("icon")}
                className="w-full h-full hover:bg-perfGray3"
                component="label"
              >
                <img
                  className={cn("", {
                    hidden: playerImage,
                  })}
                  src="/assets/images/Vector.png"
                  alt="upload icon"
                />
                <img
                  className={cn(
                    " absolute rounded-lg w-full -h-full max-w-full max-h-full object-cover left-0 top-0",
                    {
                      hidden: !playerImage,
                    }
                  )}
                  src={playerImagePreview && playerImagePreview}
                  alt="upload icon"
                />
                <Input
                  hidden
                  accept="image/*"
                  {...register("icon")}
                  name="icon"
                  multiple
                  type="file"
                  // error={errors.image && (errors.image.message as ReactNode)}
                  onChange={(e: any) => {
                    setPlayerImagePreview(
                      URL.createObjectURL(e.target.files[0])
                    );
                    uploadImage(e);
                  }}
                />
              </Button>
              {/* {errors.image && (
                <p className="text-red text-xs text-left">File is required!</p>
              )} */}
            </div>

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

            {user?.user_type === "Admin" && sports && (
              <PerfSelect
                control={control}
                placeholder="Sport"
                data={sports?.results?.map((sport, idx) => {
                  return {
                    label: sport.name,
                    value: JSON.stringify(sport.id ? sport.id : idx),
                  };
                })}
                name="sport"
                required
              />
            )}

            <PerfSelect
              control={control}
              placeholder="Gender"
              data={[
                { label: "Males", value: "M" },
                { label: "Females", value: "F" },
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

import { useState, ReactNode } from "react";
import { Modal, Button, Group, Input, Avatar } from "@mantine/core";
import AppIcons from "../../../../../@main/core/AppIcons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Resizer from "react-image-file-resizer";
import cn from "classnames";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import { Metric } from "~/app/store/types/supervisor-types";
import { axiosInstance } from "~/app/configs/dataService";
import { useParams } from "react-router-dom";
import { useUserQuery } from "~/app/store/user/userApi";
import { useSuperMetricsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminMetricsQuery } from "~/app/store/clubManager/clubManagerApi";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {
  metricData: Metric;
};

const EditMetric = ({ metricData }: Props) => {
  const [opened, setOpened] = useState(false);
  const [playerImage, setPlayerImage] = useState<string | unknown>("");
  const [playerImagePreview, setPlayerImagePreview] = useState("null");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean | string>(false);
  const { kpi_id } = useParams();
  const { data: user } = useUserQuery({});
  const { refetch: superRefetchMetrics } = useSuperMetricsQuery(
    { kpi_id },
    { skip: !kpi_id }
  );
  const { refetch: adminRefetchMetrics } = useAdminMetricsQuery(
    { kpi_id },
    { skip: !kpi_id }
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({});

  // Submit Form Function
  const onSubmitFunction = (e: any) => {
    console.log(typeof e.currentTarget);

    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("kpi", JSON.stringify(kpi_id));
    setError(false);

    try {
      setIsLoading(true);
      axiosInstance
        .patch(
          user?.user_type === "Admin"
            ? `club-manager/kpis/metrics/${metricData.id}/update/`
            : `supervisor/metrics/${metricData.id}/update/`,
          formData
        )
        .then((res) => {
          setIsLoading(false);
          setOpened(false);
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Metric Added Successfly"
          );
          adminRefetchMetrics();
          superRefetchMetrics();
        })
        .catch((err) => {
          AppUtils.showNotificationFun(
            "Error",
            "Sorry",
            "Can't add metric Now"
          );
          setIsLoading(false);
          setError(err.response.data.message);
        });
    } catch (err) {}
  };

  // Image Functions
  // Resize the image size
  const resizeFile = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        100,
        100,
        "JPEG",
        100,
        0,
        (uri: any) => {
          resolve(uri);
        },
        "base64"
      );
    });

  // function to access file uploaded then convert to base64 then add it to the data state
  const uploadImage = async (e: any) => {
    try {
      const file = e.target.files[0];
      const image = await resizeFile(file);
      console.log(image);
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
            setOpened(false);
          }}
          title={`Edit (${metricData.name}) Metric `}
        >
          <form className="flex flex-col gap-4" onSubmit={onSubmitFunction}>
            {/* Image Upload */}
            <div className=" relative my-2 bg-gray-300 overflow-hidden flex justify-center  items-center  mx-auto w-28  h-28 rounded-lg ">
              <Button
                {...register("image")}
                className="w-full h-full hover:bg-perfGray3"
                component="label"
              >
                <Avatar
                  className={cn(
                    " absolute rounded-lg w-full h-full object-cover left-0 top-0"
                  )}
                  src={
                    playerImage
                      ? playerImagePreview
                      : metricData.icon_url || metricData.icon
                  }
                  alt="upload icon"
                />
                <Input
                  hidden
                  accept="image/*"
                  {...register("image")}
                  name="icon"
                  multiple
                  type="file"
                  // error={errors.image && (errors.image.message as ReactNode)}
                  onChange={(e: any) => {
                    console.log(e.target.files[0]);
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

            <Input.Wrapper
              id="name"
              withAsterisk
              // label="Name"
              error={errors.name && (errors.name.message as ReactNode)}
            >
              <Input
                defaultValue={metricData.name}
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
            <SubmitButton isLoading={isLoading} text="Edit Metric" />
          </form>
        </Modal>

        <Group position="center">
          <button
            className="transform hover:scale-150"
            onClick={() => setOpened(true)}
          >
            <AppIcons
              className="w-4 h-4 text-perfGray3"
              icon="PencilSquareIcon:outline"
            />
          </button>
        </Group>
      </>
    </div>
  );
};

export default EditMetric;

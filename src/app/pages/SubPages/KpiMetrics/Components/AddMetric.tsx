import { useState, ReactNode } from "react";
import { Modal, Button, Group, Input } from "@mantine/core";
import AppIcons from "../../../../../@main/core/AppIcons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Resizer from "react-image-file-resizer";
import cn from "classnames";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import { axiosInstance } from "~/app/configs/dataService";
import { useParams } from "react-router-dom";
import { useUserQuery } from "~/app/store/user/userApi";
import { useSuperMetricsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminMetricsQuery } from "~/app/store/clubManager/clubManagerApi";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {};

const schema = yup.object().shape({
  image: yup.mixed(),
  name: yup.string().required("please add the metric name"),
});
const AddMetric = (props: Props) => {
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

  const resetFields = () => {
    setPlayerImage(null);
    reset({
      image: "",
      name: "",
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit Form Function
  const onSubmitFunction = (data: any) => {
    console.log({ ...data, icon: playerImage });
    setOpened(false);
    resetFields();
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

  const addMetricFun = (e: any) => {
    console.log(typeof e.currentTarget);

    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // formData.append("kpi", JSON.stringify(kpi_id));
    if (playerImage) {
      formData.set("icon", playerImage as string);
    }

    setError(false);

    try {
      setIsLoading(true);
      axiosInstance
        .post(
          user?.user_type === "Admin"
            ? `club-manager/kpis/metrics/${kpi_id}/add-metric/`
            : `supervisor/kpis/metrics/${kpi_id}/add-metric/`,
          formData
        )
        .then((res) => {
          setIsLoading(false);
          setOpened(false);
          setPlayerImage(null);
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Metric Added Successfully"
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

  return (
    <div>
      <>
        <Modal
          opened={opened}
          onClose={() => {
            resetFields();
            setOpened(false);
          }}
          title={`Add Metric `}
        >
          <form className="flex flex-col gap-4" onSubmit={addMetricFun}>
            {/* Image Upload */}
            <div className=" relative group my-2 bg-gray-300 overflow-hidden hover:bg-gray-300 flex justify-center  items-center  mx-auto w-28  h-28 rounded-lg ">
              <Button className="w-full h-full" component="label">
                <AppIcons
                  className="w-10 h-10 text-perfGray1 group-hover:text-white  "
                  icon="PhotoIcon:outline"
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
                  type="file"
                  name="icon"
                  onChange={(e: any) => {
                    setPlayerImagePreview(
                      URL.createObjectURL(e.target.files[0])
                    );
                    uploadImage(e);
                  }}
                />
              </Button>
            </div>

            <Input.Wrapper
              id="name"
              withAsterisk
              // label="Name"
              error={error}
            >
              <Input
                placeholder="Name"
                name="name"
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
              />
            </Input.Wrapper>
            <SubmitButton isLoading={isLoading} text="Add Metric" />
          </form>
        </Modal>

        <Group position="center" className="h-full">
          <div
            onClick={() => setOpened(true)}
            className="h-full group hover:bg-white cursor-pointer  relative w-full bg-slate-300 p-12 rounded-xl flex flex-col justify-center items-center gap-4"
          >
            <AppIcons
              className="text-perfGray2 w-16 h-16 group-hover:text-perfBlue"
              icon="PlusIcon:outline"
            />
            <span className="text-perfGray2 text-xl group-hover:text-perfBlue">
              Add Metric
            </span>
          </div>
        </Group>
      </>
    </div>
  );
};

export default AddMetric;

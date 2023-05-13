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
import AvatarInput from "~/@main/components/shared/AvatarInput";

type Props = {};

const schema = yup.object().shape({
  image: yup.mixed(),
  name: yup.string().required("please add the metric name"),
});
const AddMetric = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
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

  const addMetricFun = async (e: any) => {
    console.log(typeof e.currentTarget);

    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (userAvatar) {
      const image = await AppUtils.resizeImage(userAvatar);
      formData.append("icon", image as string);
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
            setUserAvatar(null);
            setOpened(false);
          }}
          title={`Add Metric `}
        >
          <form className="flex flex-col gap-4" onSubmit={addMetricFun}>
            {/* Image Upload */}
            <AvatarInput
              userAvatar={userAvatar}
              setUserAvatar={setUserAvatar}
            />

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
            className="h-full group hover:bg-white cursor-pointer  relative w-full bg-slate-300 p-4 xs:p-12 rounded-xl flex flex-col justify-center items-center gap-4"
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

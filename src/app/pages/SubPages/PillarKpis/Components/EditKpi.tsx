import { useState, ReactNode } from "react";
import { Modal, Button, Group, Input, Avatar } from "@mantine/core";
import AppIcons from "../../../../../@main/core/AppIcons";
import { useForm } from "react-hook-form";
import Resizer from "react-image-file-resizer";
import cn from "classnames";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import { kpi } from "~/app/store/types/supervisor-types";
import { axiosInstance } from "~/app/configs/dataService";
import { useUserQuery } from "~/app/store/user/userApi";
import { useSuperKpisQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminKpisQuery } from "~/app/store/clubManager/clubManagerApi";
import { useParams } from "react-router-dom";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {
  kpiData: kpi;
};

const EditKpi = ({ kpiData }: Props) => {
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: user } = useUserQuery({});
  const [playerImage, setPlayerImage] = useState<string | unknown>(
    kpiData.icon
  );
  const [playerImagePreview, setPlayerImagePreview] =
    useState<string | undefined>();
  const { pillar_id } = useParams();

  const { refetch: superRefetchKpis } = useSuperKpisQuery(
    {
      pillar_id,
    },
    {
      skip: !pillar_id,
    }
  );
  const { refetch: adminRefetchKpis } = useAdminKpisQuery(
    {
      pillar_id,
    },
    {
      skip: !pillar_id,
    }
  );

  const {
    register,
    formState: { errors },
    reset,
  } = useForm({});

  // Submit Form Function
  const onSubmitFunction = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log({
      icon: formData.get("icon"),
      name: formData.get("name"),
    });

    try {
      setIsLoading(true);
      axiosInstance
        .patch(
          user?.user_type === "Supervisor"
            ? `supervisor/kpis/${kpiData.id}/update/`
            : `club-manager/sports/kpis/${kpiData.id}/update/`,
          formData
        )
        .then((res) => {
          setIsLoading(false);
          setOpened(false);
          setPlayerImage(null);
          if (user?.user_type === "Supervisor") {
            superRefetchKpis();
          } else {
            adminRefetchKpis();
          }
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Kpi Edited Successfly"
          );
        })
        .catch((err) => {
          console.log(err);
          AppUtils.showNotificationFun("Error", "Wrong", "Can't Edit the Kpi");
          setIsLoading(false);
          setOpened(false);
        });
    } catch (err) {
      console.log(err);
      AppUtils.showNotificationFun("Error", "Wrong", "Can't Edit the Kpi");
      setIsLoading(false);
      setOpened(false);
    }
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
          title={`Edit ${kpiData.name} Kpi `}
        >
          <form className="flex flex-col gap-4" onSubmit={onSubmitFunction}>
            {/* Image Upload */}
            <div className=" relative my-2 bg-gray-300 overflow-hidden flex justify-center  items-center  mx-auto w-28  h-28 rounded-lg ">
              <Button
                {...register("image")}
                className="w-full h-full hover:bg-perfGray3"
                component="label"
              >
                <img
                  className={cn(
                    " absolute rounded-lg w-full -h-full max-w-full max-h-full object-cover left-0 top-0"
                  )}
                  src={playerImage ? playerImagePreview : kpiData.icon_url}
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

            <Input.Wrapper
              id="name"
              withAsterisk
              // label="Name"
              error={errors.name && (errors.name.message as ReactNode)}
            >
              <Input
                defaultValue={kpiData.name}
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
            <SubmitButton isLoading={isLoading} text="Edit Kpi" />
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

export default EditKpi;

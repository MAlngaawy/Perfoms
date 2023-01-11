import { useState, ReactNode } from "react";
import { Modal, Button, Group, Input } from "@mantine/core";
import AppIcons from "../../../../../@main/core/AppIcons";
import { useForm } from "react-hook-form";
import Resizer from "react-image-file-resizer";
import cn from "classnames";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import { axiosInstance } from "../../../../configs/dataService";
import { useUserQuery } from "~/app/store/user/userApi";
import { useParams } from "react-router-dom";
import { useAdminKpisQuery } from "~/app/store/clubManager/clubManagerApi";
import { useSuperKpisQuery } from "~/app/store/supervisor/supervisorMainApi";
import { showNotification } from "@mantine/notifications";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {};

const AddKpi = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const [playerImage, setPlayerImage] = useState<string | unknown>("");
  const [playerImagePreview, setPlayerImagePreview] = useState("null");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean | string>(false);
  const { data: user } = useUserQuery({});
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

  const resetFields = () => {
    setPlayerImage(null);
    reset({
      image: "",
      name: "",
    });
  };

  const { reset } = useForm({});

  // function to access file uploaded then convert to base64 then add it to the data state
  const uploadImage = async (e: any) => {
    try {
      const file = e.target.files[0];
      const image = await AppUtils.resizeImage(file);
      console.log(image);
      setPlayerImage(image);
    } catch (err) {
      console.log(err);
    }
  };

  const addKpiFun = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(false);
    try {
      setIsLoading(true);
      axiosInstance
        .post(
          user?.user_type === "Supervisor"
            ? `supervisor/${pillar_id}/kpis/add-kpi/`
            : `club-manager/sports/${pillar_id}/add-kpi/`,
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
          showNotification({
            message: "Successfully Added Kpi",
            color: "green",
            title: "Done",
            styles: {
              root: {
                backgroundColor: "#27AE60",
                borderColor: "#27AE60",
                "&::before": { backgroundColor: "#fff" },
              },

              title: { color: "#fff" },
              description: { color: "#fff" },
              closeButton: {
                color: "#fff",
              },
            },
          });
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.response.data.message);
          showNotification({
            message: err.response.data.message,
            color: "red",
            title: "Wrong",
            styles: {
              root: {
                backgroundColor: "#EB5757",
                borderColor: "#EB5757",
                "&::before": { backgroundColor: "#fff" },
              },

              title: { color: "#fff" },
              description: { color: "#fff" },
              closeButton: {
                color: "#fff",
              },
            },
          });
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
          title={`Add Kpi`}
        >
          <form
            className="flex flex-col gap-4"
            // onSubmit={handleSubmit(onSubmitFunction)}
            onSubmit={addKpiFun}
          >
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
            <SubmitButton isLoading={isLoading} text="Add Kpi" />
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
              Add Kpi
            </span>
          </div>
        </Group>
      </>
    </div>
  );
};

export default AddKpi;

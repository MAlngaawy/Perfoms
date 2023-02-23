import { useState, ReactNode } from "react";
import { Modal, Button, Group, Input } from "@mantine/core";
import AppIcons from "../../../../../@main/core/AppIcons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Resizer from "react-image-file-resizer";
import cn from "classnames";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import { axiosInstance } from "../../../../configs/dataService";
import { useGeneralPillarsQuery, useUserQuery } from "~/app/store/user/userApi";
import { useParams } from "react-router-dom";
import { useAdminPillarsQuery } from "~/app/store/clubManager/clubManagerApi";
import { useSuperPillarsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { showNotification } from "@mantine/notifications";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {};

const AddPillar = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const [playerImage, setPlayerImage] = useState<string | unknown>("");
  const [playerImagePreview, setPlayerImagePreview] = useState("null");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean | string>(false);
  const { data: user } = useUserQuery({});
  const { sport_id } = useParams();
  const { refetch: refetchAdminPillars } = useAdminPillarsQuery(
    { sport_id: sport_id },
    { skip: !sport_id }
  );
  const { refetch: refetchSuperPillars } = useSuperPillarsQuery(
    { sport_id: sport_id },
    { skip: !sport_id }
  );

  const { refetch: RefetchGeneralPillars } = useGeneralPillarsQuery({});

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
      setPlayerImage(image);
    } catch (err) {
      console.log(err);
    }
  };

  const addPillarFun = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (playerImage) {
      formData.set("icon", playerImage as string);
    }
    if (sport_id) formData.append("sport", sport_id);
    setError(false);
    try {
      setIsLoading(true);
      axiosInstance
        .post(
          user?.user_type === "Supervisor"
            ? "supervisor/sports/add-pillar/"
            : "club-manager/sports/add-pillar/",
          formData
        )
        .then((res) => {
          setIsLoading(false);
          setOpened(false);
          setPlayerImage(null);
          if (user?.user_type === "Supervisor") {
            refetchSuperPillars();
          } else {
            refetchAdminPillars();
          }
          showNotification({
            message: "Successfully Added Pillar",
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
          RefetchGeneralPillars();
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
          title={`Add Pillar`}
        >
          <form
            className="flex flex-col gap-4"
            // onSubmit={handleSubmit(onSubmitFunction)}
            onSubmit={addPillarFun}
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
                  accept={"image/png,image/jpeg,image/jpg"}
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
            <SubmitButton isLoading={isLoading} text="Add Pillar" />
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
              Add Pillar
            </span>
          </div>
        </Group>
      </>
    </div>
  );
};

export default AddPillar;

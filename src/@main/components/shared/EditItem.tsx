import { useState } from "react";
import { Modal, Button, Group, Input, Avatar } from "@mantine/core";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { axiosInstance } from "~/app/configs/dataService";
import { useUserQuery } from "~/app/store/user/userApi";
import AppUtils from "~/@main/utils/AppUtils";
import SubmitButton from "../SubmitButton";
import AppIcons from "~/@main/core/AppIcons";

type Props = {
  data: {
    name: string;
    icon: string;
    icon_url: string;
  };
  apiUrl: string;
  refetchFunction: any;
};

const EditItem = ({ data, apiUrl, refetchFunction }: Props) => {
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playerImagePreview, setPlayerImagePreview] =
    useState<string | null>(null);

  const onSubmitFunction = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // if there is no image added .. remove empty icon field
    console.log(formData.get("icon"));
    if (!playerImagePreview) formData.delete("icon");
    console.log(formData.get("icon"));
    console.log(formData.get("name"));

    setIsLoading(true);
    axiosInstance
      .patch(apiUrl, formData)
      .then((res) => {
        setIsLoading(false);
        setOpened(false);
        refetchFunction();
        AppUtils.showNotificationFun("Success", "Done", " Successfly Updated");
      })
      .catch((err) => {
        setIsLoading(false);
        AppUtils.showNotificationFun("Error", "Sorry", "Can't Update Now");
      });
    setOpened(false);
    setPlayerImagePreview(null);
  };

  return (
    <div>
      <>
        <Modal
          opened={opened}
          onClose={() => {
            setOpened(false);
          }}
          title={`Edit ${data.name}`}
        >
          <form className="flex flex-col gap-4" onSubmit={onSubmitFunction}>
            {/* Image Upload */}
            <div className=" relative my-2 bg-gray-300 overflow-hidden flex justify-center  items-center  mx-auto w-28  h-28 rounded-lg ">
              <Button
                className="w-full h-full hover:bg-perfGray3"
                component="label"
              >
                <Avatar
                  className={cn(
                    " absolute rounded-lg w-full h-full object-cover left-0 top-0"
                  )}
                  src={
                    playerImagePreview
                      ? playerImagePreview
                      : data.icon_url || data.icon
                  }
                  alt="upload icon"
                />
                <Input
                  hidden
                  accept="image/*"
                  name="icon"
                  multiple
                  type="file"
                  onChange={(e: any) => {
                    setPlayerImagePreview(
                      URL.createObjectURL(e.target.files[0])
                    );
                  }}
                />
              </Button>
            </div>

            <Input.Wrapper id="name" withAsterisk>
              <Input
                defaultValue={data.name}
                name={"name"}
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
                id="name"
              />
            </Input.Wrapper>
            <SubmitButton isLoading={isLoading} text="Edit" />
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

export default EditItem;

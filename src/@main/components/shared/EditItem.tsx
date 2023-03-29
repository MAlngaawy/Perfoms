import { useState } from "react";
import { Modal, Button, Group, Input, Avatar } from "@mantine/core";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { axiosInstance } from "~/app/configs/dataService";
import { useUserQuery } from "~/app/store/user/userApi";
import AppUtils from "~/@main/utils/AppUtils";
import SubmitButton from "../SubmitButton";
import AppIcons from "~/@main/core/AppIcons";
import AvatarInput from "./AvatarInput";

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
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitFunction = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (userAvatar) {
      const image = await AppUtils.resizeImage(userAvatar);
      formData.append("icon", image as string);
    } else {
      formData.delete("icon");
    }

    setIsLoading(true);
    axiosInstance
      .patch(apiUrl, formData)
      .then((res) => {
        setIsLoading(false);
        setOpened(false);
        refetchFunction();
        AppUtils.showNotificationFun(
          "Success",
          "Done",
          " Successfully Updated"
        );
      })
      .catch((err) => {
        setIsLoading(false);
        AppUtils.showNotificationFun("Error", "Sorry", "Can't Update Now");
      });
    setOpened(false);
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
            <AvatarInput
              userAvatar={userAvatar}
              setUserAvatar={setUserAvatar}
              inputAlt="Icon"
              currentImage={data.icon || data.icon_url}
            />

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

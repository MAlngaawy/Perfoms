import { Avatar, Group, Input, Modal } from "@mantine/core";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AvatarInput from "~/@main/components/shared/AvatarInput";
import SubmitButton from "~/@main/components/SubmitButton";
import AppIcons from "~/@main/core/AppIcons";
import AppUtils from "~/@main/utils/AppUtils";
import { axiosInstance } from "~/app/configs/dataService";
import { useGetPlayerEventsQuery } from "~/app/store/user/userApi";

type Props = {};

const AddAlbum = (props: Props) => {
  const { id } = useParams();
  const [opened, setOpened] = useState(false);
  const { refetch } = useGetPlayerEventsQuery({ player_id: id }, { skip: !id });
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitFun = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    //@ts-ignore
    formData.append("player", +id);
    if (userAvatar) {
      const image = await AppUtils.resizeImage(userAvatar);
      formData.append("icon", image as string);
    }
    axiosInstance
      .post("user-generals/add-player-event/", formData)
      .then((res) => {
        setIsLoading(false);
        setOpened(false);
        setUserAvatar(null);
        refetch();
        AppUtils.showNotificationFun(
          "Success",
          "Done",
          "Album Added Successfully"
        );
      })
      .catch((err) => {
        setIsLoading(false);
        setUserAvatar(null);
        AppUtils.showNotificationFun("Error", "Sorry", "Try again later");
      });
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setIsLoading(false);
          setOpened(false);
        }}
        title={`Add Album`}
      >
        <form onSubmit={submitFun}>
          <AvatarInput userAvatar={userAvatar} setUserAvatar={setUserAvatar} />
          <Input
            className="my-4"
            placeholder="Album Name"
            name="name"
            required
            type={"text"}
          />
          <SubmitButton isLoading={isLoading} text="Add Album" />
        </form>
      </Modal>

      <Group position="left">
        <button
          className=" font-bold bg-gray-300 text-perfGray3 w-60 h-40 flex flex-col gap-2 justify-center items-center rounded-lg transform transition-all hover:scale-105"
          onClick={() => setOpened(true)}
        >
          <AppIcons icon="PlusIcon:outline" className="w-10 h-10" />{" "}
          <div className="text-xl">Add Album </div>
        </button>
      </Group>
    </>
  );
};

export default AddAlbum;

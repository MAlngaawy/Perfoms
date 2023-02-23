import { useForm } from "react-hook-form";
import { Input } from "@mantine/core";
import { User } from "~/app/store/types/user-types";
import { useEffect, useRef, useState } from "react";
import { showNotification } from "@mantine/notifications";
import SubmitButton from "~/@main/components/SubmitButton";
import { axiosInstance } from "~/app/configs/dataService";
import AppUtils from "~/@main/utils/AppUtils";
import AvatarInput from "~/@main/components/shared/AvatarInput";

type Props = {
  user: User | undefined;
  setOpened: any;
  refetch: any;
};

const EditForm = ({ user, setOpened, refetch }: Props) => {
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [isError, setIsErrror] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, control } = useForm({
    defaultValues: { ...user, avatar: undefined },
  });

  const onSubmitFn = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (userAvatar) {
      const image = await AppUtils.resizeImage(userAvatar);
      formData.append("avatar", image as string);
    }
    setIsLoading(true);
    try {
      axiosInstance
        .patch("user-generals/update-profile/", formData)
        .then((res) => {
          setIsLoading(false);
          setOpened(false);
          console.log(res);
          refetch();
        });
    } catch (err) {
      setIsErrror(true);
    }
  };

  useEffect(() => {
    if (isError)
      //@ts-ignore
      showNotification({ title: "Update Error", message: error?.data.message });
  }, [isError]);

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmitFn}>
      <AvatarInput
        currentImage={user?.avatar}
        userAvatar={userAvatar}
        setUserAvatar={setUserAvatar}
        inputAlt="User Photo"
      />

      {/* Image Upload Input */}
      <Input.Wrapper id="firstName" label="First name" className="w-full">
        <Input id="firstName" {...register("first_name")} />
      </Input.Wrapper>
      <Input.Wrapper id="lastName" label="Last name" className="w-full">
        <Input id="lastName" {...register("last_name")} />
      </Input.Wrapper>

      <SubmitButton isLoading={isLoading} text="Save" />
    </form>
  );
};

export default EditForm;

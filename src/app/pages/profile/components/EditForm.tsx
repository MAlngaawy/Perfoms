import { useForm } from "react-hook-form";
import { Input } from "@mantine/core";
import { User } from "~/app/store/types/user-types";
import { useEffect, useRef, useState } from "react";
import { showNotification } from "@mantine/notifications";
import SubmitButton from "~/@main/components/SubmitButton";
import { axiosInstance } from "~/app/configs/dataService";
import AppUtils from "~/@main/utils/AppUtils";
import AvatarInput from "~/@main/components/shared/AvatarInput";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {
  setOpened: any;
};

const EditForm = ({ setOpened }: Props) => {
  const { data: user, refetch } = useUserQuery({});
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [isError, setIsErrror] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [noImage, setNoImage] = useState<boolean>(user?.avatar ? false : true);

  const deleteImage = () => {
    setNoImage(true);
    setUserAvatar(null);
  };

  useEffect(() => {
    if (userAvatar) {
      setNoImage(false);
    }
  }, [userAvatar]);

  const { register, handleSubmit, control } = useForm({
    defaultValues: { ...user, avatar: undefined },
  });

  const onSubmitFn = async (e: any) => {
    e.preventDefault();
    console.log("onSubmitFn CLICKED");

    const formData = new FormData(e.currentTarget);
    if (userAvatar) {
      const image = await AppUtils.resizeImage(userAvatar);
      formData.append("avatar", image as string);
    }
    if (noImage) {
      formData.append("avatar", "");
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
        currentImage={noImage === true ? "" : user?.avatar}
        userAvatar={userAvatar}
        setUserAvatar={setUserAvatar}
        inputAlt="User Photo"
      />
      {noImage === false && (
        <p
          onClick={() => deleteImage()}
          className="text-blue-500 text-xs my-2 cursor-pointer w-full text-center"
        >
          Delete My photo
        </p>
      )}

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

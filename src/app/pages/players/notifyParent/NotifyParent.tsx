import { useSendNotificationsMutation } from "~/app/store/coach/coachApi";
import { Controller, useForm } from "react-hook-form";
import { Alert, Input, Select, Textarea } from "@mantine/core";
import SubmitButton from "~/@main/components/SubmitButton";
import {
  useGetParentInfoQuery,
  useGetPlayerInfoQuery,
} from "~/app/store/coach/coachApi";
import { useParams } from "react-router-dom";
import { showNotification, updateNotification } from "@mantine/notifications";

const NotifyParent = ({ parentName, playerName }: any) => {
  const params = useParams();

  const { data: player } = useGetPlayerInfoQuery(
    { player_id: params.player_id },
    { skip: !params.player_id }
  );

  const { data: parent } = useGetParentInfoQuery(
    { player_id: params.player_id },
    { skip: !params.player_id }
  );

  const [notifyParent, { isLoading, isError, isSuccess }] =
    useSendNotificationsMutation();
  const { register, handleSubmit, control, reset } = useForm();

  const resetFields = () => {
    reset({
      message: "",
      notification_type: "",
      title: "",
    });
  };

  const send = (data: any) => {
    console.log(data);
    const sendData = {
      notification_type: data.notification_type,
      parent_id: (parent && parent.id) || 0,
      title: data.title,
      message: data.message,
      player_id: (player && player.id) || 0,
    };
    notifyParent(sendData)
      .then((res) => {
        resetFields();
        showNotification({
          message: "Your Message sent",
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
        resetFields();
        showNotification({
          message: "Something went wrong",
          color: "red",
          title: "Sorry ",
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
  };

  return (
    <div className="flex justify-center items-center">
      <div className="form bg-white border my-10 border-perfGray4 p-10 rounded-xl m-6">
        {isError && (
          <Alert color={"red"}>Somethis went wrong please try again</Alert>
        )}
        <h2 className="my-4">
          You Now Notifing mr:
          <span className=" font-semibold">
            {" "}
            {parent?.first_name}
          </span> <br /> about the player:{" "}
          <span className=" font-semibold"> {player?.name}</span>
        </h2>
        <form onSubmit={handleSubmit(send)} className="flex flex-col gap-6">
          {/* <Input.Wrapper {...register("text")} > */}
          <Controller
            name="notification_type"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Report Type"
                required
                {...field}
                data={[
                  { label: "Report", value: "Report" },
                  { label: "Certificate", value: "Certificate" },
                  { label: "Complement", value: "Complement" },
                  { label: "Permission", value: "Permission" },
                ]}
              />
            )}
          />

          <Input.Wrapper id="title">
            <Input
              placeholder="Title"
              {...register("title")}
              id="title"
              required
              type={"text"}
            />
          </Input.Wrapper>

          <Textarea placeholder="Message" {...register("message")} required />
          {/* </Input.Wrapper> */}
          <SubmitButton isLoading={isLoading} text="Notify" />
        </form>
      </div>
    </div>
  );
};

export default NotifyParent;

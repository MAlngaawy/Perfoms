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
        showNotification({
          title: "Done",
          //@ts-ignore
          message: `your message has been sent`,
          color: "green",
        });
        reset({ notification_type: "", title: "", message: "" });
      })
      .catch((err) => {
        showNotification({
          title: "Wrong",
          //@ts-ignore
          message: { err },
          color: "red",
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
      {/* <div className="p-4 m-1 md:m-3 h-96 w-full flex gap-12 flex-col justify-between md:w-1/2 bg-white rounded-3xl">
        <div className="flex flex-row justify-start md:justify-between items-start pb-10">
          <div className="flex flex-col gap-3">
            <p className="text-sm">
              This will be sent to{" "}
              <span className="text-perfBlue">
                {parentDummyData.parentName}
              </span>
            </p>
            <p>About:</p>
            <Info
              label="Player"
              value={parentDummyData.playersDetails[0].name}
            />
          </div>
          <Dropdown
            selected={selected}
            setSelected={setSelected}
            values={["notification type", "random type"]}
            className="bg-black text-white text-sm font-medium hidden md:block w-44"
          />
        </div>
        <div className="pt-10">
          <NewMessage />
        </div>
      </div>
      <div className="none hidden md:block p-4 m-1">
        <h1 className="text-sm text-perfGray">previous notification</h1>
        {dummyDates.map((date, index) => {
          return (
            <Notification
              key={index}
              parent={parentDummyData.parentName}
              date={date}
            />
          );
        })}
      </div> */}
    </div>
  );
};

// const Notification = ({ parent, date }: { parent: string; date: string }) => {
//   return (
//     <div className="p-3 bg-white rounded-2xl flex flex-row items-center justify-between my-3 text-sm gap-5 border border-yellow">
//       <div>
//         <p>
//           About: <span className="font-medium text-perfBlue">{parent}</span>
//         </p>
//         <p>
//           <AppIcons className="w-5 inline" icon="CalendarDaysIcon:outline" />
//           {"  "}
//           {date}
//         </p>
//       </div>
//       <button className="border border-yellow text-white bg-orange px-8 py-1 rounded-full">
//         Report
//       </button>
//     </div>
//   );
// };

export default NotifyParent;

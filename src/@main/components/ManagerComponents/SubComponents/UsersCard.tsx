import DeleteButton from "./DeleteButton";
import { Avatar, Grid } from "@mantine/core";
import AddUserForm from "./AddUser";
import { PlayerCoach } from "~/app/store/types/parent-types";
import { showNotification } from "@mantine/notifications";
import {
  useAdminDeleteCoachMutation,
  useAdminDeletePlayerMutation,
  useAdminDeleteSupervisorMutation,
} from "~/app/store/clubManager/clubManagerApi";

type Props = {
  type: "Player" | "Coach" | "Supervisor";
  data: PlayerCoach[] | undefined;
};

const UsersCard = ({ type, data }: Props) => {
  const [deletePlayer] = useAdminDeletePlayerMutation();
  const [deleteCoach] = useAdminDeleteCoachMutation();
  const [deleteSupervisor] = useAdminDeleteSupervisorMutation();

  const deleteUser = (userId: string) => {
    if (type === "Player") {
      deletePlayer({ player_id: userId })
        .then((res) => {
          showNotification({
            message: "Successfly Deleted",
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
          showNotification({
            message: err.message,
            color: "ref",
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
    } else if (type === "Coach") {
      deleteCoach({ coach_id: userId })
        .then((res) => {
          showNotification({
            message: "Successfly Deleted",
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
          showNotification({
            message: err.message,
            color: "ref",
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
    } else if (type === "Supervisor") {
      deleteSupervisor({ supervisor_id: userId })
        .then((res) => {
          showNotification({
            message: "Successfly Deleted",
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
          showNotification({
            message: err.message,
            color: "ref",
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
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 pt-0 ">
      <div className="header flex justify-between items-center py-4">
        <h2 className="sm:text-lg text-perfGray1"> {type}s in the system </h2>
        <div className="flex gap-6">
          <AddUserForm type={type} />
        </div>
      </div>
      <Grid className="overflow-scroll  max-h-60" gutter={"sm"}>
        {data &&
          data.map((user) => {
            return (
              <Grid.Col span={12} xs={6} sm={4}>
                <div className="flex justify-between rounded-3xl items-center p-1  hover:bg-pagesBg transition-all">
                  <div className="coach-data flex gap-2 cursor-pointer items-center">
                    <Avatar
                      src={user.avatar || user.icon}
                      size="sm"
                      radius={"xl"}
                    />
                    <h3 className="text-base text-perfGray2">
                      {(user.first_name &&
                        user.first_name + " " + user.last_name) ||
                        user.name}
                    </h3>
                  </div>
                  <DeleteButton
                    deleteFun={() => deleteUser(JSON.stringify(user.id))}
                    type={type}
                    name={user.first_name || user.name}
                  />
                </div>
              </Grid.Col>
            );
          })}
      </Grid>
    </div>
  );
};

export default UsersCard;

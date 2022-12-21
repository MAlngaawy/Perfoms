import DeleteButton from "./DeleteButton";
import { Avatar, Grid } from "@mantine/core";
import AddUserForm from "./AddUser";
import { PlayerCoach } from "~/app/store/types/parent-types";
import { SuperVisorPlayer } from "~/app/store/types/supervisor-types";

type Props = {
  type: "Player" | "Coach" | "Supervisor";
  data: PlayerCoach[] | undefined;
};

const UsersCard = ({ type, data }: Props) => {
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
                    deleteFun={() => console.log("Delete")}
                    type={type}
                    name={user.first_name}
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

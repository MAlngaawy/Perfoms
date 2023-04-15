import DeleteButton from "./DeleteButton";
import { Avatar, Grid, TextInput } from "@mantine/core";
import AddPlayerForm from "./CreatePlayerForm";
import { PlayerCoach } from "~/app/store/types/parent-types";
import { showNotification } from "@mantine/notifications";
import {
  useAdminDeleteCoachMutation,
  useAdminDeletePlayerMutation,
  useAdminDeleteSupervisorMutation,
} from "~/app/store/clubManager/clubManagerApi";
import __ from "lodash";
import { useEffect, useState } from "react";
import AppIcons from "~/@main/core/AppIcons";
import AppUtils from "~/@main/utils/AppUtils";
import { useNavigate } from "react-router-dom";

type Props = {
  type: "Player" | "Coach" | "Supervisor";
  data: any;
};

const UsersCard = ({ type, data }: Props) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [deletePlayer] = useAdminDeletePlayerMutation();
  const [deleteCoach] = useAdminDeleteCoachMutation();
  const [deleteSupervisor] = useAdminDeleteSupervisorMutation();
  const [newData, setNewData] = useState<any>(data);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchKeyword.length > 0) {
      let test;
      if (type === "Player") {
        test = __.filter(data, (user) =>
          user.name?.toLowerCase().includes(searchKeyword.toLocaleLowerCase())
        );
      } else {
        test = __.filter(data, (user) => {
          let name = user.first_name + user.last_name;
          return name
            ?.toLowerCase()
            .includes(searchKeyword.toLocaleLowerCase());
        });
      }
      setNewData(test);
    } else {
      setNewData(data);
    }
  }, [searchKeyword, data]);

  const deleteUser = (userId: string) => {
    if (type === "Player") {
      deletePlayer({ player_id: userId })
        .then((res) => {
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Successfully Deleted"
          );
        })
        .catch((err) => {
          AppUtils.showNotificationFun("Error", "Wrong", "err.message");
        });
    } else if (type === "Coach") {
      deleteCoach({ coach_id: userId })
        .then((res) => {
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Successfully Deleted"
          );
        })
        .catch((err) => {
          AppUtils.showNotificationFun("Error", "Wrong", "err.message");
        });
    } else if (type === "Supervisor") {
      deleteSupervisor({ supervisor_id: userId })
        .then((res) => {
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Successfully Deleted"
          );
        })
        .catch((err) => {
          AppUtils.showNotificationFun("Error", "Wrong", "err.message");
        });
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 pt-0 ">
      <div className="header flex flex-col sm:flex-row justify-between items-start py-4">
        <h2 className="text-sm sm:text-lg text-perfGray1 mb-2 sm:mb-0">
          {type === "Coach" ? "Coaches" : type + "s"} in the system
        </h2>
        <div className="flex gap-6 justify-center items-center">
          {type === "Player" && <AddPlayerForm />}
          <TextInput
            onChange={(e) => setSearchKeyword(e.target.value)}
            value={searchKeyword}
            icon={
              <AppIcons
                className="w-5 h-5"
                icon="MagnifyingGlassIcon:outline"
              />
            }
            placeholder="Search"
          />
        </div>
      </div>
      <div className="h-60  overflow-y-scroll">
        <Grid className="w-full" gutter={"sm"}>
          {newData &&
            newData.length > 0 &&
            newData.map((user: any, index: number) => {
              return (
                <Grid.Col
                  key={index}
                  className="w-fit h-fit"
                  span={12}
                  xs={6}
                  sm={4}
                >
                  <div className="flex justify-between rounded-3xl items-center p-1  hover:bg-pagesBg transition-all">
                    <div
                      onClick={() =>
                        type === "Player" && navigate(`/players/${user.id}`)
                      }
                      style={{
                        cursor: type === "Player" ? "pointer" : "auto",
                      }}
                      className="coach-data flex gap-2 items-center"
                    >
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
    </div>
  );
};

export default UsersCard;

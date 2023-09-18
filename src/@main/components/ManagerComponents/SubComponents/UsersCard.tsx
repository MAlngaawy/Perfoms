import DeleteButton from "./DeleteButton";
import {
  Avatar,
  Grid,
  Loader,
  LoadingOverlay,
  Select,
  SelectItem,
  TextInput,
} from "@mantine/core";
import AddPlayerForm from "./CreatePlayerForm";
import {
  useAdminDeleteCoachMutation,
  useAdminDeleteParentMutation,
  useAdminDeletePlayerMutation,
  useAdminDeleteSubCoachMutation,
  useAdminDeleteSupervisorMutation,
  useAdminSportsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import __ from "lodash";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import AppIcons from "~/@main/core/AppIcons";
import AppUtils from "~/@main/utils/AppUtils";
import { useNavigate } from "react-router-dom";
import CreateUser from "./CreateUser";
import { useUserQuery } from "~/app/store/user/userApi";
import Pagenation from "../../Pagenation/Pagenation";
import AssignParentToPlayerForm from "./AssignParentToPlayerForm";
import { User } from "~/app/store/types/user-types";

type Props = {
  type: "Player" | "Coach" | "Supervisor" | "Attendance Moderator" | "Parent";
  data: any;
  setUserSearch: Dispatch<SetStateAction<string | undefined>>;
  pageCount: number | undefined;
  setPage: Dispatch<SetStateAction<number | undefined>>;
  fetching: boolean;
  sport: string | undefined;
  setSport: Dispatch<SetStateAction<string | undefined>>;
  count: number | undefined;
};

const UsersCard = ({
  type,
  data,
  setUserSearch,
  pageCount,
  setPage,
  fetching,
  sport,
  setSport,
  count,
}: Props) => {
  // const [selectedSport, setSelectedSport] = useState<string | null>();
  const safeSetSport = setSport ?? (() => {});

  const [sports, setSports] = useState<SelectItem[]>([
    {
      label: "All",
      value: "0",
    },
  ]);
  const {
    //@ts-ignore
    data: user,
  } = useUserQuery({});

  const { data: clubSports } = useAdminSportsQuery({ club_id: user?.club });

  useEffect(() => {
    if (clubSports) {
      let newSportSData = [
        {
          label: "All",
          value: "0",
        },
      ];
      for (let sport of clubSports.results) {
        newSportSData.push({
          label: sport.name,
          value: JSON.stringify(sport.id),
        });
      }
      setSports(newSportSData);
    }
  }, [clubSports]);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = inputRef.current?.value;
    setUserSearch(inputValue);
    setPage(undefined);
  };
  return (
    <div className="bg-white rounded-lg p-4 pt-0 ">
      <div className="header flex flex-col sm:flex-row justify-between items-start py-4 gap-4">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-sm sm:text-lg text-perfGray1 mb-2 sm:mb-0">
            {type === "Coach" ? "Coaches" : type + "s"} in the system
            <span className="mx-2 font-bold text-perfBlue">({count})</span>
          </h2>
          {type === "Player" ? (
            <AddPlayerForm />
          ) : (
            <CreateUser userType={type} />
          )}
        </div>
        <div className="  flex flex-wrap xs:flex-nowrap gap-6 justify-center items-center">
          {type !== "Parent" && (
            <Select
              placeholder="Filter By Sport"
              value={sport}
              onChange={(e: string) => {
                if (e && e != "0") {
                  safeSetSport(e);
                  setPage(1);
                } else {
                  safeSetSport("0");
                }
              }}
              data={sports}
            />
          )}

          <form
            onSubmit={handleSubmit}
            className={"flex justify-center items-center gap-2"}
          >
            <TextInput
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  setUserSearch(undefined);
                }
              }}
              ref={inputRef}
              icon={
                <AppIcons
                  className="w-5 h-5 pointer"
                  icon="MagnifyingGlassIcon:outline"
                />
              }
              placeholder="Search"
            />
            <button type="submit" className="p-2 rounded-md bg-perfBlue">
              <AppIcons
                className="w-5 h-5 pointer text-white"
                icon="MagnifyingGlassIcon:outline"
              />
            </button>
          </form>
        </div>
      </div>
      <div className="h-60 overflow-y-scroll">
        <div className="relative">
          <LoadingOverlay visible={fetching} overlayBlur={2} />
          <Grid className="w-full" gutter={"sm"}>
            {data && data.length > 0 ? (
              <FilteredUsers
                newData={data}
                // selectedSport={selectedSport}
                type={type}
              />
            ) : (
              <div className="flex w-full items-center justify-center pt-10">
                <h1 className="bg-pagesBg p-6">No {type} In this Club</h1>
              </div>
            )}
          </Grid>
        </div>
      </div>
      <div className=" overflow-scroll py-2">
        <Pagenation
          pageCount={pageCount}
          sport={sport}
          setPage={setPage}
          searchInputValue={inputRef.current?.value}
        />
      </div>
    </div>
  );
};

type FilteredUsersProps = {
  newData: any;
  // selectedSport: string | null | undefined;
  type: string;
};

const FilteredUsers = ({
  newData,
  // selectedSport,
  type,
}: FilteredUsersProps) => {
  const navigate = useNavigate();
  const [deletePlayer] = useAdminDeletePlayerMutation();
  const [deleteCoach] = useAdminDeleteCoachMutation();
  const [deleteSupervisor] = useAdminDeleteSupervisorMutation();
  const [deleteSubCoach] = useAdminDeleteSubCoachMutation();
  const [deleteParent] = useAdminDeleteParentMutation();

  const deleteUser = (userId: string) => {
    let deletePromise;
    let typeName = type.toLowerCase();
    switch (typeName) {
      case "player":
        deletePromise = deletePlayer({ player_id: userId });
        break;
      case "parent":
        deletePromise = deleteParent({ parent_id: userId });
        break;
      case "coach":
        deletePromise = deleteCoach({ coach_id: userId });
        break;
      case "supervisor":
        deletePromise = deleteSupervisor({ supervisor_id: userId });
        break;
      case "attendance moderator":
        deletePromise = deleteSubCoach({ subCoach_id: userId });
        break;
      default:
        throw new Error("Invalid user type");
    }
    deletePromise
      .then((res) => {
        AppUtils.showNotificationFun("Success", "Done", "Successfully Deleted");
      })
      .catch((err) => {
        AppUtils.showNotificationFun("Error", "Wrong", "err.message");
      });
  };

  return newData.map((user: User) => {
    return (
      <Grid.Col key={user.id} className="w-fit h-fit" span={12} xs={6} sm={4}>
        <div className="flex justify-between rounded-3xl mr-2 items-center p-1  hover:bg-pagesBg transition-all">
          <div
            onClick={() => type === "Player" && navigate(`/players/${user.id}`)}
            style={{
              cursor: type === "Player" ? "pointer" : "auto",
            }}
            className="coach-data flex gap-2 items-center"
          >
            <Avatar src={user.avatar || user.icon} size="sm" radius={"xl"} />
            <h3 className="text-base text-perfGray2">
              {(user.first_name && user.first_name + " " + user.last_name) ||
                user.name}
            </h3>
          </div>
          <div className="flex gap-2 items-center justify-center">
            {type === "Player" && <AssignParentToPlayerForm player={user} />}
            <DeleteButton
              deleteFun={() => deleteUser(JSON.stringify(user.id))}
              type={type}
              name={user.first_name || user.name}
            />
          </div>
        </div>
      </Grid.Col>
    );
  });
};

export default UsersCard;

import DeleteButton from "./DeleteButton";
import {
  Avatar,
  Grid,
  Loader,
  Select,
  SelectItem,
  TextInput,
} from "@mantine/core";
import AddPlayerForm from "./CreatePlayerForm";
import {
  useAdminDeleteCoachMutation,
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
import AddSubCoachForm from "./AddSubCoachForm";
import { useUserQuery } from "~/app/store/user/userApi";
import Pagenation from "../../Pagenation/Pagenation";

type Props = {
  type: "Player" | "Coach" | "Supervisor" | "Attendance Moderator";
  data: any;
  setUserSearch: Dispatch<SetStateAction<string | undefined>>;
  pageCount: number | undefined;
  setPage: Dispatch<SetStateAction<number | undefined>>;
  fetching: boolean;
  sport: string | undefined;
  setSport: Dispatch<SetStateAction<string | undefined>>;
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
}: Props) => {
  // const [selectedSport, setSelectedSport] = useState<string | null>();
  const safeSetSport = setSport ?? (() => {});
  console.log("newData", data);

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
      <div className="header flex flex-col sm:flex-row justify-between items-start py-4">
        <h2 className="text-sm sm:text-lg text-perfGray1 mb-2 sm:mb-0">
          {type === "Coach" ? "Coaches" : type + "s"} in the system
        </h2>
        <div className="  flex flex-wrap xs:flex-nowrap gap-6 justify-center items-center">
          {type === "Player" && <AddPlayerForm />}
          {type === "Attendance Moderator" && <AddSubCoachForm />}

          <Select
            placeholder="Filter By Sport"
            value={sport}
            onChange={(e: string) => {
              if (e && e != "0") {
                safeSetSport(e);
              } else {
                safeSetSport("0");
              }
            }}
            data={sports}
          />

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
        {fetching ? (
          <div className="flex justify-center items-center w-full h-full">
            <Loader />
          </div>
        ) : (
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
        )}
      </div>
      <Pagenation pageCount={pageCount} setPage={setPage} />
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

  const deleteUser = (userId: string) => {
    let deletePromise;
    let typeName = type.toLowerCase();
    switch (typeName) {
      case "player":
        deletePromise = deletePlayer({ player_id: userId });
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

  // const filteredData = newData.filter((user: any) => {
  //   if (!selectedSport || selectedSport === "All") {
  //     return true;
  //   } else {
  //     return user.sport === selectedSport;
  //   }
  // });

  // if (filteredData.length === 0) {
  //   return (
  //     <div className="flex w-full items-center justify-center pt-10">
  //       <h1 className="bg-pagesBg p-6">
  //         {selectedSport} Sport doesn't have any {type}
  //       </h1>
  //     </div>
  //   );
  // }

  return newData.map((user: any) => {
    return (
      <Grid.Col key={user.id} className="w-fit h-fit" span={12} xs={6} sm={4}>
        <div className="flex justify-between rounded-3xl mr-10 items-center p-1  hover:bg-pagesBg transition-all">
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
          <DeleteButton
            deleteFun={() => deleteUser(JSON.stringify(user.id))}
            type={type}
            name={user.first_name || user.name}
          />
        </div>
      </Grid.Col>
    );
  });
};

export default UsersCard;

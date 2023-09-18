import { useEffect, useState } from "react";
import UploadForm from "./Components/UploadForm";
import { Data } from "./types";
import classNames from "classnames";
import { Grid } from "@mantine/core";
import {
  useGetPlayerInfoQuery,
  useUpdatePlayerMutation,
} from "~/app/store/user/userApi";
import { useParams } from "react-router-dom";
import Table from "./Components/Table";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import AppUtils from "~/@main/utils/AppUtils";
import moment from "moment";
import { CoachPlayerInfo } from "~/app/store/types/coach-types";
import AppIcons from "~/@main/core/AppIcons";

type Props = {};

const BodyCompositionAnalysis = "Body composition analysis";
const MuscleFatAnalysis = "Muscle fat analysis";
const ObesityAnalysis = "Obesity analysis";
const SegmentalFatAnalysis = "Segmental fat analysis";
const SegmentalLeanAnalysis = "Segmental lean analysis";

const PlayerDataAnalytics = (props: Props) => {
  const { id: player_id } = useParams();
  const [data, setData] = useState<Data>();
  const [playerInfo, setPlayerInfo] = useState<CoachPlayerInfo | null>(null);
  const { data: playerInfoData } = useGetPlayerInfoQuery(
    { player_id },
    { skip: !player_id }
  );
  const [updatePlayer] = useUpdatePlayerMutation();
  function formatDate(dateString: string): string {
    const [month, day, year] = dateString.split(".");
    const formattedDate = moment(
      `${month}.${day}.${year}`,
      "MM.DD.YYYY"
    ).format("MMM D, YYYY");
    return formattedDate;
  }

  useEffect(() => {
    if (
      playerInfoData?.analytics &&
      Object.keys(playerInfoData.analytics).length !== 0
    ) {
      setPlayerInfo(playerInfoData);
      // The `analytics` field is not an empty JSON object
      const analytics = JSON.parse(JSON.stringify(playerInfoData?.analytics));
      setData(analytics);
    } else {
      // The `analytics` field is an empty JSON object or undefined
      setData(undefined);
    }
  }, [playerInfoData]);

  const deleteReport = () => {
    updatePlayer({
      player_id: player_id,
      body: {
        analytics: null,
      },
    })
      .then(() => {
        setData(undefined);
        AppUtils.showNotificationFun(
          "Success",
          "Done",
          "Player Reports deleted"
        );
      })
      .catch(() => {
        AppUtils.showNotificationFun(
          "Error",
          "Sorry",
          "Can't delete Player Reports Now"
        );
      });
  };

  return (
    <div className="">
      {/* Upload Button */}
      <div
        className={classNames(
          "m-4 flex flex-col gap-4 sm:flex-row items-center",
          {
            "justify-around": data,
            "justify-center": !data,
          }
        )}
      >
        {data ? (
          <div className="flex flex-col sm:flex-row gap-4 w-full items-center sm:items-start">
            <UploadForm hasData={true} setData={setData} />
            <div className="h-full">
              <div className="flex flex-col justify-center items-center gap-3">
                <AppIcons
                  icon="DocumentTextIcon:solid"
                  className="text-perfBlue w-10"
                />
                <h2>{playerInfo?.name} In Body Report</h2>
                <h2 className="text-center text-sm ">
                  This Reports taked at{" "}
                  <span className="text-blue-400">
                    {data.Time && formatDate(data.Time)}
                  </span>
                </h2>
              </div>
            </div>
            <div className="transform scale-150 bg-white p-1 rounded-full">
              <DeleteButton
                deleteFun={deleteReport}
                type="Player"
                name="Report"
              />
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <UploadForm hasData={false} setData={setData} />
          </div>
        )}
      </div>

      {data && (
        <div className="data-show my-4">
          <Grid gutter={50}>
            <Grid.Col span={12}>
              <h2 className="text-sm font-semibold m-4">
                Body composition analysis
              </h2>
              <Table data={data && data[BodyCompositionAnalysis]} />
            </Grid.Col>

            <Grid.Col span={12}>
              <h2 className="text-sm font-semibold m-4">Muscle fat analysis</h2>
              <Table data={data && data[MuscleFatAnalysis]} />
            </Grid.Col>

            <Grid.Col span={12}>
              <h2 className="text-sm font-semibold m-4">Obesity analysis</h2>
              <Table data={data && data[ObesityAnalysis]} />
            </Grid.Col>

            <Grid.Col span={12}>
              <h2 className="text-sm font-semibold m-4">
                Segmental fat analysis
              </h2>
              <Table data={data && data[SegmentalFatAnalysis]} />
            </Grid.Col>

            <Grid.Col span={12}>
              <h2 className="text-sm font-semibold m-4">
                Segmental Lean Analysis
              </h2>
              <Table data={data && data[SegmentalLeanAnalysis]} />
            </Grid.Col>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default PlayerDataAnalytics;

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

type Props = {};

const BodyCompositionAnalysis = "Body composition analysis";
const MuscleFatAnalysis = "Muscle fat analysis";
const ObesityAnalysis = "Obesity analysis";
const SegmentalFatAnalysis = "Segmental fat analysis";
const SegmentalLeanAnalysis = "Segmental lean analysis";

const PlayerDataAnalytics = (props: Props) => {
  const { id: player_id } = useParams();
  const [data, setData] = useState<Data>();
  const { data: playerInfoData } = useGetPlayerInfoQuery(
    { player_id },
    { skip: !player_id }
  );
  const [updatePlayer] = useUpdatePlayerMutation();

  useEffect(() => {
    if (
      playerInfoData?.analytics &&
      Object.keys(playerInfoData.analytics).length !== 0
    ) {
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
        className={classNames("m-4 w-full flex items-center", {
          "justify-around": data,
          "justify-center": !data,
        })}
      >
        {data ? (
          <>
            <UploadForm setData={setData} />
            <h2>
              This Reports taked at{" "}
              <span className="font-bold text-green">
                {data.Time.replaceAll(".", "/")}{" "}
              </span>
            </h2>
            <div className="transform scale-150">
              <DeleteButton
                deleteFun={deleteReport}
                type="Player"
                name="Report"
              />
            </div>
          </>
        ) : (
          <div className="mt-32">
            <UploadForm setData={setData} />
          </div>
        )}
      </div>

      {data && (
        <div className="data-show my-4">
          <Grid gutter={50}>
            <Grid.Col span={12}>
              <h2 className="text-sm font-semibold bg-perfGray p-4 rounded-sm text-white">
                Body composition analysis
              </h2>
              <Table data={data && data[BodyCompositionAnalysis]} />
            </Grid.Col>

            <Grid.Col span={12}>
              <h2 className="text-sm font-semibold bg-perfGray p-4 rounded-sm text-white">
                Muscle fat analysis
              </h2>
              <Table data={data && data[MuscleFatAnalysis]} />
            </Grid.Col>

            <Grid.Col span={12}>
              <h2 className="text-sm font-semibold bg-perfGray p-4 rounded-sm text-white">
                Obesity analysis
              </h2>
              <Table data={data && data[ObesityAnalysis]} />
            </Grid.Col>

            <Grid.Col span={12}>
              <h2 className="text-sm font-semibold bg-perfGray p-4 rounded-sm text-white">
                Segmental fat analysis
              </h2>
              <Table data={data && data[SegmentalFatAnalysis]} />
            </Grid.Col>

            <Grid.Col span={12}>
              <h2 className="text-sm font-semibold bg-perfGray p-4 rounded-sm text-white">
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

import { useContext, useEffect, useState } from "react";
import PlayerInfoCard from "../../../components/PlayerInfoCard";
import ParentInfoCard from "../../../components/ParentInfoCard";
import { Grid } from "@mantine/core";
import { useLocation, useParams } from "react-router-dom";
import { useGetParentInfoQuery } from "~/app/store/coach/coachApi";
import { CoachPlayerInfo, PlayerParent } from "~/app/store/types/coach-types";
import {
  useGetSuperParentInfoQuery,
  useGetSuperPlayerInfoQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import CustomBreadCrumbs from "~/@main/components/BreadCrumbs";
import {
  usePlayerEventsQuery,
  useUserQuery,
  useGetPlayerInfoQuery,
} from "~/app/store/user/userApi";
import {
  useAdminPlayerInfoQuery,
  useAdminPlayerParentInfoQuery,
} from "~/app/store/clubManager/clubManagerApi";
import { EditModeContext } from "../../PlayerDetails";

type Props = {};

const PlayerInfo = (props: Props) => {
  // const [playerData, setPlayerData] = useState<CoachPlayerInfo>();
  const [parentData, setParentData] = useState<PlayerParent>();
  const editMode = useContext(EditModeContext);
  const params = useParams();
  const { data: user } = useUserQuery(null);
  const { data: playerData } = useGetPlayerInfoQuery(
    { player_id: params.id },
    { skip: !params.id }
  );

  const { data: playerEvents } = usePlayerEventsQuery(
    { player_id: params.id },
    { skip: !params.id }
  );

  const { data: coachParent } = useGetParentInfoQuery(
    { player_id: params.id },
    { skip: !params.id || user?.user_type !== "Coach" }
  );
  const { data: superParent } = useGetSuperParentInfoQuery(
    { player_id: params.id },
    { skip: !params.id || user?.user_type !== "Supervisor" }
  );
  const { data: adminParent } = useAdminPlayerParentInfoQuery(
    { player_id: params.id },
    { skip: !params.id || user?.user_type !== "Admin" }
  );

  useEffect(() => {
    if (coachParent) setParentData(coachParent);
    if (superParent) setParentData(superParent);
    if (adminParent) setParentData(adminParent);
  }, [coachParent, superParent, playerEvents, adminParent]);

  return (
    <div className="mb-10">
      <Grid columns={12}>
        <Grid.Col md={6} span={12}>
          <PlayerInfoCard playerData={playerData} />
        </Grid.Col>
        <Grid.Col md={6} span={12}>
          <ParentInfoCard
            first_name={parentData?.first_name}
            last_name={parentData?.last_name}
            avatar={parentData?.avatar}
            phone={parentData?.mobile}
            supscription={parentData?.subscription}
            job={parentData?.job}
            id={parentData?.id}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default PlayerInfo;

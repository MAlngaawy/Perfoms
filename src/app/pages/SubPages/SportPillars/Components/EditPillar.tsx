import { Pillar } from "~/app/store/types/supervisor-types";
import { useAdminPillarsQuery } from "~/app/store/clubManager/clubManagerApi";
import { useSuperPillarsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useUserQuery } from "~/app/store/user/userApi";
import { useParams } from "react-router-dom";
import EditItem from "~/@main/components/shared/EditItem";
import { useState } from "react";
import { useEffect } from "react";

type Props = {
  pillarData: Pillar;
};

const EditPillar = ({ pillarData }: Props) => {
  const { data: user } = useUserQuery({});
  const { sport_id } = useParams();
  const [url, setUrl] = useState<string>("");
  const { refetch: refetchAdminPillars } = useAdminPillarsQuery(
    { sport_id: sport_id },
    { skip: !sport_id }
  );
  const { refetch: refetchSuperPillars } = useSuperPillarsQuery(
    { sport_id: sport_id },
    { skip: !sport_id }
  );

  useEffect(() => {
    if (user?.user_type === "Supervisor") {
      setUrl(`supervisor/sports/pillars/${pillarData.id}/update/`);
    } else {
      setUrl(`club-manager/sports/pillars/${pillarData.id}/update/`);
    }
  }, [user]);

  const refetchFun = () => {
    if (user?.user_type === "Supervisor") {
      refetchSuperPillars();
    } else {
      refetchAdminPillars();
    }
  };

  return (
    <EditItem
      data={pillarData}
      apiUrl={url}
      refetchFunction={() => refetchFun()}
    />
  );
};

export default EditPillar;

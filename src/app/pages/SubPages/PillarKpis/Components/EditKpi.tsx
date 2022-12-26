import { useState, ReactNode, useEffect } from "react";
import { kpi } from "~/app/store/types/supervisor-types";
import { useUserQuery } from "~/app/store/user/userApi";
import { useSuperKpisQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminKpisQuery } from "~/app/store/clubManager/clubManagerApi";
import { useParams } from "react-router-dom";
import EditItem from "~/@main/components/shared/EditItem";

type Props = {
  kpiData: kpi;
};

const EditKpi = ({ kpiData }: Props) => {
  const { data: user } = useUserQuery({});
  const { pillar_id } = useParams();
  const [url, setUrl] = useState<string>("");
  const { refetch: superRefetchKpis } = useSuperKpisQuery(
    {
      pillar_id,
    },
    {
      skip: !pillar_id,
    }
  );
  const { refetch: adminRefetchKpis } = useAdminKpisQuery(
    {
      pillar_id,
    },
    {
      skip: !pillar_id,
    }
  );

  useEffect(() => {
    if (user?.user_type === "Supervisor") {
      setUrl(`supervisor/kpis/${kpiData.id}/update/`);
    } else {
      setUrl(`club-manager/sports/kpis/${kpiData.id}/update/`);
    }
  }, [user]);

  const refetchFun = () => {
    if (user?.user_type === "Supervisor") {
      superRefetchKpis();
    } else {
      adminRefetchKpis();
    }
  };

  return (
    <EditItem
      data={kpiData}
      apiUrl={url}
      refetchFunction={() => refetchFun()}
    />
  );
};

export default EditKpi;

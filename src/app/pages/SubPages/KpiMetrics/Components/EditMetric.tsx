import { useState, useEffect } from "react";
import { Metric } from "~/app/store/types/supervisor-types";
import { useParams } from "react-router-dom";
import { useUserQuery } from "~/app/store/user/userApi";
import { useSuperMetricsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminMetricsQuery } from "~/app/store/clubManager/clubManagerApi";
import EditItem from "~/@main/components/shared/EditItem";

type Props = {
  metricData: Metric;
};

const EditMetric = ({ metricData }: Props) => {
  const { kpi_id } = useParams();
  const { data: user } = useUserQuery({});
  const [url, setUrl] = useState<string>("");
  const { refetch: superRefetchMetrics } = useSuperMetricsQuery(
    { kpi_id },
    { skip: !kpi_id }
  );
  const { refetch: adminRefetchMetrics } = useAdminMetricsQuery(
    { kpi_id },
    { skip: !kpi_id }
  );

  useEffect(() => {
    if (user?.user_type === "Supervisor") {
      setUrl(`supervisor/metrics/${metricData.id}/update/`);
    } else {
      setUrl(`club-manager/kpis/metrics/${metricData.id}/update/`);
    }
  }, [user]);

  const refetchFun = () => {
    if (user?.user_type === "Supervisor") {
      superRefetchMetrics();
    } else {
      adminRefetchMetrics();
    }
  };

  return (
    <EditItem
      data={metricData}
      apiUrl={url}
      refetchFunction={() => refetchFun()}
    />
  );
};

export default EditMetric;

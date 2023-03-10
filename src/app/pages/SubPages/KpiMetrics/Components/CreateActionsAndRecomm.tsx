import { useEffect, useState } from "react";
import { Menu } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import NotesList from "./SubComponents/MetricNotesList";
import { Metric } from "~/app/store/types/supervisor-types";
import {
  useGetMetricActionsQuery,
  useGetMetricRecommendationQuery,
} from "~/app/store/clubManager/clubManagerApi";
import { MetricNotes } from "~/app/store/types/clubManager-types";
import { useUserQuery } from "~/app/store/user/userApi";
import {
  useSuperGetMetricActionsQuery,
  useSuperGetMetricRecommendationQuery,
} from "~/app/store/supervisor/supervisorMainApi";

type Props = {
  metricId: number;
  metric: Metric;
};

const CreateActionsAndRecomm = ({ metricId, metric }: Props) => {
  const { data: user } = useUserQuery({});

  const [metricActions, setMetricActions] = useState<MetricNotes>();
  const [metricRecommendations, setMetricRecommendations] =
    useState<MetricNotes>();

  // Admin Data
  const { data: adminMetricActions } = useGetMetricActionsQuery(
    { metric_id: metricId },
    { skip: !metricId || user?.user_type !== "Admin" }
  );
  const { data: adminMetricRecommendations } = useGetMetricRecommendationQuery(
    { metric_id: metricId },
    { skip: !metricId || user?.user_type !== "Admin" }
  );

  //Supervisor
  const { data: superMetricActions } = useSuperGetMetricActionsQuery(
    { metric_id: metricId },
    { skip: !metricId || user?.user_type !== "Supervisor" }
  );
  const { data: superMetricRecommendations } =
    useSuperGetMetricRecommendationQuery(
      { metric_id: metricId },
      { skip: !metricId || user?.user_type !== "Supervisor" }
    );

  // use Effects to set the data
  useEffect(() => {
    if (adminMetricActions) {
      setMetricActions(adminMetricActions);
    }
  }, [adminMetricActions]);

  useEffect(() => {
    if (adminMetricRecommendations) {
      setMetricRecommendations(adminMetricRecommendations);
    }
  }, [adminMetricRecommendations]);

  useEffect(() => {
    if (superMetricActions) {
      setMetricActions(superMetricActions);
    }
  }, [superMetricActions]);

  useEffect(() => {
    if (superMetricRecommendations) {
      setMetricRecommendations(superMetricRecommendations);
    }
  }, [superMetricRecommendations]);

  const [openedAction, setOpenedAction] = useState(false);
  const [openedRecommendation, setOpenedRecommendation] = useState(false);
  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <button>
            <AppIcons
              icon="PlusIcon:outline"
              className="w-4 h-4 text-perfGray3"
            />
          </button>
        </Menu.Target>

        <NotesList
          metricId={metric.id}
          metricIcon={metric.icon || metric.icon_url}
          metricName={metric.name}
          type="Recommendation"
          data={metricRecommendations?.results}
          opened={openedRecommendation}
          setOpened={setOpenedRecommendation}
        />

        <NotesList
          metricId={metric.id}
          metricIcon={metric.icon || metric.icon_url}
          metricName={metric.name}
          type="Action"
          data={metricActions?.results}
          opened={openedAction}
          setOpened={setOpenedAction}
        />

        <Menu.Dropdown>
          <Menu.Item
            className="w-full h-full text-left"
            onClick={() => setOpenedRecommendation(true)}
          >
            Recommendations
          </Menu.Item>
          <Menu.Item
            className="w-full h-full text-left"
            onClick={() => setOpenedAction(true)}
          >
            Actions
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default CreateActionsAndRecomm;

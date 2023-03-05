import React, { useState } from "react";
import { Menu } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import AddActionModal from "./AddActionModal";
import { Group } from "@mantine/core";
import AddRecomendationModal from "./AddRecommendationModal";
import ActionsList from "./SubComponents/ActionsList";
import { Metric } from "~/app/store/types/supervisor-types";

type Props = {
  metricId: number;
  metric: Metric;
};

const CreateActionsAndRecomm = ({ metricId, metric }: Props) => {
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

        {/* <AddActionModal
          opened={openedAction}
          setOpened={setOpenedAction}
          metricId={metricId}
        /> */}

        <ActionsList
          metricIcon={metric.icon || metric.icon_url}
          metricName={metric.name}
          type="Recommendation"
          data={[
            {
              name: "Test One",
              description: "Loremmmmmmmmm",
              id: 1,
            },
            {
              name: "Test Two",
              description: "Loremmmmmmmmm 22222",
              id: 2,
            },
          ]}
          opened={openedRecommendation}
          setOpened={setOpenedRecommendation}
        />

        <ActionsList
          metricIcon={metric.icon || metric.icon_url}
          metricName={metric.name}
          type="Action"
          data={[
            {
              name: "Test One",
              description: "Loremmmmmmmmm",
              id: 1,
            },
            {
              name: "Test Two",
              description: "Loremmmmmmmmm 22222",
              id: 2,
            },
          ]}
          opened={openedAction}
          setOpened={setOpenedAction}
        />

        {/* <AddRecomendationModal
          opened={openedRecommendation}
          setOpened={setOpenedRecommendation}
          metricId={metricId}
        /> */}

        <Menu.Dropdown>
          <Menu.Item icon="">
            <button
              className="w-full h-full text-left"
              onClick={() => setOpenedRecommendation(true)}
            >
              Recommendations
            </button>
          </Menu.Item>
          <Menu.Item icon="">
            <Group position="center" className="h-full">
              <button
                className="w-full h-full text-left"
                onClick={() => setOpenedAction(true)}
              >
                Actions
              </button>
            </Group>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default CreateActionsAndRecomm;

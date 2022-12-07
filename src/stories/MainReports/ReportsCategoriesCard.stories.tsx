import { Grid } from "@mantine/core";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ReportsCategoriesCard from "../../@main/components/MainReports/ReportsCategoriesCard";

export default {
  title: "Main Reports/ Reports Categories Card",
  component: ReportsCategoriesCard,
} as ComponentMeta<typeof ReportsCategoriesCard>;

const Template: ComponentStory<typeof ReportsCategoriesCard> = (args) => (
  <div className="h-screen min-h-full  bg-pagesBg">
    <div className="flex p-6 gap-6 flex-wrap">
      <ReportsCategoriesCard
        image="/assets/images/players.png"
        type="Players"
      />
      <ReportsCategoriesCard
        image="/assets/images/coaches.png"
        type="Coaches"
      />
      <ReportsCategoriesCard
        image="/assets/images/supervisors.png"
        type="Supervisor"
      />
      <ReportsCategoriesCard image="/assets/images/teams.png" type="Teams" />
      <ReportsCategoriesCard image="/assets/images/sports.png" type="Sports" />
    </div>
  </div>
);

export const Primary = Template.bind({});

// Primary.args = {};

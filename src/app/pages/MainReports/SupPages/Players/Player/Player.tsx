import { useState } from "react";
import { Breadcrumbs, Switch } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { Menu } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import TimeFilter from "~/@main/components/TimeFilter";
import OverAll from "./Component/OverAll";

type Props = {};

const items = [
  { title: "categories", href: "/main-reports" },
  { title: "Search Players", href: "/main-reports/search-players" },
  { title: "Player Name", href: "" },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

const Player = (props: Props) => {
  const [checked, setChecked] = useState(true);
  const [reportType, setReportType] =
    useState<"Performances" | "Attendances">("Performances");

  const { id } = useParams();

  return (
    <div className="conatiner w-11/12 mx-auto">
      <div className="mt-4">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <div className="flex flex-col my-4 xs:flex-row items-center gap-4 justify-end">
        {/* <div className="switch flex ">
          <Switch
            size="xl"
            sx={{
              ".mantine-Switch-track": {
                cursor: "pointer",
              },
              ".mantine-Switch-root": {
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
              },
            }}
            onLabel="Overall"
            offLabel="Detailed"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
        </div> */}
        <div className="flex gap-4 xs:justify-end items-center">
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <button className="flex gap-2 text-xs h-fit sm:text-sm justify-center items-center text-white bg-perfBlue py-2 px-2 xs:px-4 rounded-3xl">
                <span>{reportType}</span>
                <AppIcons
                  className="w-3 h-3"
                  icon="ChevronDownIcon:outline"
                />{" "}
              </button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={() => setReportType("Performances")}>
                Performances
              </Menu.Item>
              <Menu.Item onClick={() => setReportType("Attendances")}>
                Attendances
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <TimeFilter />
        </div>
      </div>
      <div className="my-6">
        {checked ? (
          <div>
            {" "}
            <OverAll reportType={reportType} />{" "}
          </div>
        ) : (
          <div>{/* <Detailed /> */}</div>
        )}
      </div>
    </div>
  );
};

export default Player;

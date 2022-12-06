import { useState, useEffect } from "react";
import { Breadcrumbs } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import Slider from "./Slider";
import { useEventFilesQuery } from "~/app/store/parent/parentApi";
import { useSuprtEventFilesQuery } from "~/app/store/supervisor/supervisorMainApi";
import { EventFiles } from "~/app/store/types/parent-types";
import { useCoachTeamEventFilesQuery } from "~/app/store/coach/coachApi";

const MediaEvent = () => {
  const { id } = useParams();
  const [files, setFiles] = useState<EventFiles>();

  const { data: parenteventFiles, isLoading } = useEventFilesQuery(
    { eventId: id ? +id : 0 },
    { skip: !id }
  );

  const { data: superEventFiles } = useSuprtEventFilesQuery(
    { event_id: id ? +id : 0 },
    { skip: !id }
  );

  const { data: coachEventFiles } = useCoachTeamEventFilesQuery(
    { event_id: id ? +id : 0 },
    { skip: !id }
  );

  useEffect(() => {
    if (parenteventFiles) setFiles(parenteventFiles);
    if (superEventFiles) setFiles(superEventFiles);
    if (coachEventFiles) setFiles(coachEventFiles);
  });

  const items = [
    { title: "Teams", href: "/media-teams" },
    { title: "Events", href: "/media-teams/media" },
    { title: "Event Media", href: "" },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return (
    <div className="container w-11/12 mx-auto">
      <div className="p-2 sm:p-6 sm:pb-0">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <div className="p-4 sm:p-20">
        <Slider isLoading={isLoading} images={files?.results || []} />
      </div>
    </div>
  );
};

export default MediaEvent;

import { useState, useEffect } from "react";
import { Breadcrumbs } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import Slider from "./Slider";
import { useEventFilesQuery } from "~/app/store/parent/parentApi";
import { useSuprtEventFilesQuery } from "~/app/store/supervisor/supervisorMainApi";
import { EventFiles } from "~/app/store/types/parent-types";
import { useCoachTeamEventFilesQuery } from "~/app/store/coach/coachApi";
import AppIcons from "~/@main/core/AppIcons";
import UploadForm from "./UploadForm";
import { useUserQuery } from "~/app/store/user/userApi";
import { useAdminEventFilesQuery } from "~/app/store/clubManager/clubManagerApi";

const MediaEvent = () => {
  const { id } = useParams();
  const [files, setFiles] = useState<EventFiles>();

  const { data: user } = useUserQuery(null);

  const { data: parenteventFiles, isLoading } = useEventFilesQuery(
    { eventId: id ? +id : 0 },
    { skip: !id }
  );

  const { data: superEventFiles, refetch } = useSuprtEventFilesQuery(
    { event_id: id ? +id : 0 },
    { skip: !id }
  );

  const { data: coachEventFiles } = useCoachTeamEventFilesQuery(
    { event_id: id ? +id : 0 },
    { skip: !id }
  );

  const { data: adminEventFiles } = useAdminEventFilesQuery(
    { event_id: id ? +id : 0 },
    { skip: !id }
  );

  useEffect(() => {
    console.log("Effect");

    if (parenteventFiles) setFiles(parenteventFiles);
    if (superEventFiles) setFiles(superEventFiles);
    if (coachEventFiles) setFiles(coachEventFiles);
    if (adminEventFiles) setFiles(adminEventFiles);
  }, [parenteventFiles, superEventFiles, coachEventFiles, adminEventFiles]);

  const items = [
    { title: "Events", href: "/media" },
    { title: "Event Media", href: "" },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return (
    <div className="container relative w-11/12 mx-auto">
      <div className="p-2 sm:mt-6 ">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <div className="p-4 sm:pt-20">
        <Slider
          isLoading={isLoading}
          video_url={files?.video_url}
          images={files?.event_files || []}
        />
      </div>
      {user?.user_type === "Supervisor" && <UploadForm refetch={refetch} />}
    </div>
  );
};

export default MediaEvent;

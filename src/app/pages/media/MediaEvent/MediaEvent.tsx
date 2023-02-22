import { Breadcrumbs } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import Slider from "./Slider";
import { useGetEventFilesQuery, useUserQuery } from "~/app/store/user/userApi";
import UploadMedia from "../../players/player-details/Tabs/PlayerMedia/AlbumMedia/Forms/UploadMedia";

const MediaEvent = () => {
  const { id } = useParams();
  const { data: user } = useUserQuery(null);

  const {
    data: files,
    isLoading,
    refetch,
  } = useGetEventFilesQuery({ event_id: id }, { skip: !id });

  const items = [
    { title: "Events", href: "/media" },
    { title: files?.name || "Event Media", href: "" },
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
          eventId={id}
          isLoading={isLoading}
          // video_url={files?.video_url}
          images={files?.event_files || []}
        />
      </div>
      {user?.user_type !== "Parent" && (
        <UploadMedia videoUrl={files?.video_url} refetch={() => refetch()} />
      )}
    </div>
  );
};

export default MediaEvent;

import { Breadcrumbs } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import Slider from "~/app/pages/media/MediaEvent/Slider";
import { useGetEventFilesQuery } from "~/app/store/user/userApi";
import UploadMedia from "./Forms/UploadMedia";

type Props = {};

const AlbumMedia = (props: Props) => {
  const { album_id, player_id } = useParams();

  const {
    data: eventMedia,
    isLoading,
    refetch,
  } = useGetEventFilesQuery({ event_id: album_id }, { skip: !album_id });

  const items = [
    { title: "Player Profile", href: `/players/${player_id}` },
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
      <div className="p-4">
        <Slider
          isLoading={isLoading}
          video_url={eventMedia?.video_url}
          images={eventMedia?.event_files || []}
        />
      </div>
      <UploadMedia videoUrl={eventMedia?.video_url} refetch={() => refetch()} />
    </div>
  );
};

export default AlbumMedia;

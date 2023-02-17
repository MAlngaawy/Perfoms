import { Breadcrumbs } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import Slider from "~/app/pages/media/MediaEvent/Slider";

type Props = {
  player_id: number;
};

const AlbumMedia = ({ player_id }: Props) => {
  const items = [
    { title: "Player Profile", href: `/players/${player_id}` },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));
  const { album_id } = useParams();
  return (
    <div className="container relative w-11/12 mx-auto">
      <div className="p-2 sm:mt-6 ">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <div className="p-4">
        <Slider
          isLoading={false}
          video_url={"https://www.youtube.com/watch?v=CsvCbR6F52I"}
          images={[
            {
              id: 1,
              file: "https://i.ytimg.com/vi/ltYC-p9AChg/sddefault.jpg",
            },
            {
              id: 2,
              file: "https://www.kigalitoday.com/IMG/jpg/abakinnyi_bitabira_imikino_ya_para-taekwondo_ni_abafite_ubumuga_bw_amaboko_kuo_bakinisha_amaguru.jpg",
            },
          ]}
        />
      </div>
      {/* {user?.user_type !== "Parent" && (
        <UploadForm
          videoUrl={files?.video_url}
          refetch={() => {
            if (user?.user_type === "Supervisor") {
              superRefetch();
            } else if (user?.user_type === "Admin") {
              adminRefetch();
            } else if (user?.user_type === "Coach") {
              coachRefetch();
            }
          }}
        />
      )} */}
    </div>
  );
};

export default AlbumMedia;

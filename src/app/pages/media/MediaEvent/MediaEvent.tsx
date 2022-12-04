import React, { useState, useEffect } from "react";
import { Breadcrumbs, Card, Image, SimpleGrid } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import { Carousel, useAnimationOffsetEffect } from "@mantine/carousel";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button } from "~/@main/components/Button";
import Slider from "./Slider";
import {
  Modal,
  FileButton,
  Button as MantineButton,
  Group,
  Text,
  List,
} from "@mantine/core";
import { useUserQuery } from "~/app/store/user/userApi";
import {
  useEventFilesQuery,
  useTeamEventQuery,
} from "~/app/store/parent/parentApi";
import {
  selectedPlayerTeamFn,
  selectPlayerTeam,
} from "~/app/store/parent/parentSlice";
import { useSelector } from "react-redux";
import TeamFilter from "~/@main/components/TeamFilter";
import useWindowSize from "../../../../@main/hooks/useWindowSize";

const TRANSITION_DURATION = 200;

const MediaEvent = () => {
  const { id } = useParams();
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);

  const { data: event } = useTeamEventQuery(
    { eventId: id ? +id : 0, teamId: selectedPlayerTeam?.id },
    { skip: !id || !selectedPlayerTeam }
  );

  const windowSize = useWindowSize();

  const { data: eventFiles, isLoading } = useEventFilesQuery(
    { eventId: id ? +id : 0 },
    { skip: !id }
  );

  const [embla, setEmbla] = useState<any>(null);
  const [opened, setOpened] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [videoID, setVideoID] = useState("");
  const [size, setSize] = useState(window.innerWidth);

  const location = useLocation();

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  const { data: user } = useUserQuery(null);

  const handleSaveClick = () => {
    setOpened(false);
    console.log(files);
    console.log(youtubeLink);
    setFiles([]);
    setYoutubeLink("");
  };

  const handleYoutubeLinkInput = () => {
    if (youtubeLink.indexOf("=") !== -1) {
      if (youtubeLink.indexOf("&") !== -1) {
        setVideoID(
          youtubeLink.slice(
            youtubeLink.indexOf("=") + 1,
            youtubeLink.indexOf("&")
          )
        );
      } else {
        setVideoID(youtubeLink.slice(youtubeLink.indexOf("=") + 1));
      }
    }
  };

  useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth);
    }
    console.log(size);

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    handleYoutubeLinkInput();
  }, [youtubeLink]);

  // const slides = eventFiles?.results.map((file, index) => (
  //   <Carousel.Slide className="bg-white" key={index}>
  //     <Image src={file.file} />
  //   </Carousel.Slide>
  // ));

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
        <Slider isLoading={isLoading} images={eventFiles?.results || []} />
        {/* <div className="flex flex-col">
          <div className="flex flex-col gap-1 text-perfGray2 text-sm font-medium">
            <p className="text-lg md:text-2xl pb-1 text-black">
              {event?.name || "Event Name"}
            </p>
            <p>
              <AppIcons className="w-5 inline" icon="CalendarIcon:outline" />{" "}
              {event?.date || "Event Date"}
            </p>
            <p>
              <AppIcons className="w-5 inline" icon="MapIcon:outline" />{" "}
              {event?.club.name || "Club Name"} Club
            </p>
          </div>
          {user?.user_type !== "Parent" && (
            <Button
              label={window.innerWidth > 567 ? "Add Media" : "Media"}
              onClick={() => setOpened(true)}
              style="primary"
              className="h-20 shadow-xl w-20 xs:h-8 xs:w-32 mx-0 mt-0 rounded-full xs:border self-end xs:self-start xs:border-perfBlue xs:text-perfBlue xs:bg-transparent xs:hover:shadow-lg"
              icon="plus icon"
            />
          )}
        </div> */}
      </div>
    </div>
    // <>
    //   <div className="h-full flex justify-center items-center mt-32">
    //     {eventFiles && eventFiles.results.length > 0 ? (
    //       <Carousel
    //         slideSize="70%"
    //         // align="start"
    //         slideGap="lg"
    //         controlsOffset="xs"
    //         controlSize={19}
    //         loop
    //         // dragFree
    //         withIndicators
    //         sx={{ maxWidth: 700 }}
    //         mx="auto"
    //         height={300}
    //       >
    //         {eventFiles?.results.map((file) => (
    //           <Carousel.Slide key={file.id}>
    //             <SlideImage link={file.file} />
    //           </Carousel.Slide>
    //         ))}
    //       </Carousel>
    //     ) : (
    //       <Carousel
    //         sx={{
    //           maxWidth: 700,
    //         }}
    //         slideSize="70%"
    //         // align="start"
    //         slideGap="lg"
    //         controlSize={30}
    //         // loop
    //         // dragFree
    //         withIndicators
    //         height={300}
    //       >
    //         <Carousel.Slide>
    //           <SlideImage link="https://and1.com.au/wp-content/uploads/2021/08/kids-sports.jpeg" />
    //         </Carousel.Slide>
    //         <Carousel.Slide>
    //           <SlideImage link="https://www.signupgenius.com/cms/images/sports/team-building-activities-soccer-article-600x400.jpg" />
    //         </Carousel.Slide>
    //         <Carousel.Slide>
    //           <SlideImage link="https://studiousguy.com/wp-content/uploads/2022/03/Team-Building-Games-for-Kids.jpg" />
    //         </Carousel.Slide>
    //       </Carousel>
    //     )}
    //   </div>
    // </>
    // <div>
    //   <TeamFilter />
    // </div>
    // <>
    //   <Carousel
    //     controlsOffset="xl"
    //     controlSize={36}
    //     className="mx-auto mt-10"
    //     sx={{ width: "50%", minWidth: 300 }}
    //     withIndicators
    //     loop
    //     getEmblaApi={setEmbla}
    //   >
    //     <Carousel.Slide className="bg-white">
    //       <iframe
    //         className="w-full h-full mx-auto pb-4 bg-black"
    //         // src={sliderVideo}
    //         frameBorder="0"
    //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //         allowFullScreen
    //         title="Embedded youtube"
    //       />
    //     </Carousel.Slide>
    //     {/* {slides} */}
    //   </Carousel>
    //   <div className="flex flex-col xs:flex-row gap-16 xs:gap-0 justify-between min-w-[300px] w-1/2 mx-auto pt-3 items-start">
    //     <div className="flex flex-col gap-1 text-perfGray2 text-sm font-medium">
    //       <p className="text-lg md:text-2xl pb-1 text-black">
    //         {location.state.header}
    //       </p>
    //       <p>
    //         <AppIcons className="w-5 inline" icon="CalendarIcon:outline" />{" "}
    //         {location.state.date}
    //       </p>
    //       <p>
    //         <AppIcons className="w-5 inline" icon="MapIcon:outline" />{" "}
    //         {location.state.place}
    //       </p>
    //     </div>
    //     {user?.user_type !== "Parent" && (
    //       <Button
    //         label={window.innerWidth > 567 ? "Add Media" : "Media"}
    //         onClick={() => setOpened(true)}
    //         style="primary"
    //         className="h-20 shadow-xl w-20 xs:h-8 xs:w-32 mx-0 mt-0 rounded-full xs:border self-end xs:self-start xs:border-perfBlue xs:text-perfBlue xs:bg-transparent xs:hover:shadow-lg"
    //         icon="plus icon"
    //       />
    //     )}
    //     <Modal
    //       sx={{
    //         ".mantine-Modal-modal": {
    //           height: "100%",
    //           display: "flex",
    //           flexDirection: "column",
    //           justifyContent: "center",
    //           alignItems: "stretch",
    //           padding: "0 50px",
    //         },
    //       }}
    //       withCloseButton={false}
    //       radius="xl"
    //       padding="xl"
    //       opened={opened}
    //       onClose={() => setOpened(false)}
    //     >
    //       {videoID && (
    //         <iframe
    //           className="w-52 h-32 mx-auto"
    //           src={`https://www.youtube.com/embed/${videoID}`}
    //           frameBorder="0"
    //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //           allowFullScreen
    //           title="Embedded youtube"
    //         />
    //       )}
    //       <input
    //         value={youtubeLink}
    //         onChange={(e) => setYoutubeLink(e.target.value)}
    //         className="w-full h-12 my-5 text-center rounded-lg border border-perfBlue text-perfBlue focus:border-2 placeholder:content-['yye'] placeholder:text-center placeholder:text-perfBlue placeholder:font-medium placeholder:text-sm pl-3"
    //         placeholder={`${
    //           isFocused ? "www.youtube.com" : "Add Youtube link here.."
    //         }`}
    //         onFocus={() => setIsFocused(true)}
    //         onBlur={() => setIsFocused(false)}
    //       />
    //       <Group position="center">
    //         <FileButton
    //           onChange={setFiles}
    //           accept="image/png,image/jpeg"
    //           multiple
    //         >
    //           {(props) => (
    //             <MantineButton
    //               className="w-full h-12 rounded-lg border border-perfBlue text-perfBlue hover:shadow-lg hover:bg-white"
    //               {...props}
    //             >
    //               Upload image
    //             </MantineButton>
    //           )}
    //         </FileButton>
    //       </Group>
    //       {files.length > 0 && <Text size="sm" mt="sm"></Text>}

    //       <List size="sm" mt={5} withPadding>
    //         {files.map((file, index) => (
    //           <List.Item key={index}>
    //             {file.name}{" "}
    //             <AppIcons
    //               className="w-4 font-medium text-green inline"
    //               icon="CheckIcon:outline"
    //             />
    //           </List.Item>
    //         ))}
    //       </List>

    //       <Button
    //         label="Save"
    //         style="primary"
    //         onClick={handleSaveClick}
    //         className="w-full h-12 rounded-lg my-5"
    //       />
    //     </Modal>
    //   </div>
    // </>
  );
};

export default MediaEvent;

const SlideImage = ({ link }: { link: string }) => {
  return (
    <img
      className="w-full h-4/5 object-cover rounded-md"
      src={link}
      alt="event image"
    />
  );
};

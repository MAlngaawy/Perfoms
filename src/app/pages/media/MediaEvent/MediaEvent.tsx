import React, { useState, useEffect } from "react";
import { Card, Image, SimpleGrid } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import { Carousel, useAnimationOffsetEffect } from "@mantine/carousel";
import { useLocation } from "react-router-dom";
import { Button } from "~/@main/components/Button";
import {
  Modal,
  FileButton,
  Button as MantineButton,
  Group,
  Text,
  List,
} from "@mantine/core";
import authRoles from "~/app/auth/authRoles";

// dummy data
const user_type = "Supervisor";
const sliderVideo = "https://www.youtube.com/embed/1nJOku-FPV8";

const TRANSITION_DURATION = 200;

const MediaEvent = ({ images }: { images: string[] }) => {
  const [embla, setEmbla] = useState<any>(null);
  const [opened, setOpened] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [videoID, setVideoID] = useState("");

  const location = useLocation();

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  const handleSaveClick = () => {
    setOpened(false);
    console.log(files);
    console.log(youtubeLink);
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
    handleYoutubeLinkInput();
  }, [youtubeLink]);

  const slides = images.map((url, index) => (
    <Carousel.Slide className="bg-white" key={index}>
      <Image src={url} />
    </Carousel.Slide>
  ));

  return (
    <>
      <Carousel
        controlsOffset="xl"
        controlSize={36}
        className="mx-auto mt-10"
        sx={{ width: "50%", minWidth: 300 }}
        withIndicators
        loop
        getEmblaApi={setEmbla}
      >
        <Carousel.Slide className="bg-white">
          <iframe
            className="w-full h-full mx-auto pb-4 bg-black"
            src={sliderVideo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </Carousel.Slide>
        {slides}
      </Carousel>
      <div className="hidden xs:flex flex-row justify-between xs:w-1/2 mx-auto pt-3 items-start">
        <div className="flex flex-col gap-1 text-perfGray2 text-sm font-medium">
          <p className="text-lg md:text-2xl pb-1 text-black">
            {location.state.header}
          </p>
          <p>
            <AppIcons className="w-5 inline" icon="CalendarIcon:outline" />{" "}
            {location.state.date}
          </p>
          <p>
            <AppIcons className="w-5 inline" icon="MapIcon:outline" />{" "}
            {location.state.place}
          </p>
        </div>
        {authRoles.Admin.includes(user_type) ? (
          <Button
            label="Add Event"
            onClick={() => setOpened(true)}
            style="bordered"
            className="w-32 mx-0 mt-0 h-8 rounded-full"
            icon="plus icon"
          />
        ) : null}
        <Modal
          sx={{
            ".mantine-Modal-modal": {
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "stretch",
              padding: "0 50px",
            },
          }}
          withCloseButton={false}
          radius="xl"
          padding="xl"
          opened={opened}
          onClose={() => setOpened(false)}
        >
          {videoID && (
            <iframe
              className="w-52 h-32 mx-auto"
              src={`https://www.youtube.com/embed/${videoID}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          )}
          <input
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            className="w-full h-12 my-5 text-center rounded-lg border border-perfBlue text-perfBlue focus:border-2 placeholder:content-['yye'] placeholder:text-center placeholder:text-perfBlue placeholder:font-medium placeholder:text-sm pl-3"
            placeholder={`${
              isFocused ? "www.youtube.com" : "Add Youtube link here.."
            }`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Group position="center">
            <FileButton
              onChange={setFiles}
              accept="image/png,image/jpeg"
              multiple
            >
              {(props) => (
                <MantineButton
                  className="w-full h-12 rounded-lg border border-perfBlue text-perfBlue hover:shadow-lg hover:bg-white"
                  {...props}
                >
                  Upload image
                </MantineButton>
              )}
            </FileButton>
          </Group>
          {files.length > 0 && <Text size="sm" mt="sm"></Text>}

          <List size="sm" mt={5} withPadding>
            {files.map((file, index) => (
              <List.Item key={index}>
                {file.name}{" "}
                <AppIcons
                  className="w-4 font-medium text-green inline"
                  icon="CheckIcon:outline"
                />
              </List.Item>
            ))}
          </List>

          <Button
            label="Save"
            style="primary"
            onClick={handleSaveClick}
            className="w-full h-12 rounded-lg my-5"
          />
        </Modal>
      </div>
    </>
  );
};

export default MediaEvent;

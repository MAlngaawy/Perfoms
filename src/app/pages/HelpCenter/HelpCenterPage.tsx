import {
  Checkbox,
  Grid,
  Menu,
  Input,
  Textarea,
  LoadingOverlay,
} from "@mantine/core";

import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useChatMutation } from "~/app/store/chatAi/chatAiApi";
import { useMediaQuery } from "@mantine/hooks";

export type Players = {
  name: string;
  icon_url: string;
};
const HelpCenterPage = () => {
  const [value, setValue] = useState<string[]>([]);
  const [chat, setChat] = useState("");
  const [visible, setVisible] = useState(false);
  const [height, setheight] = useState(100);
  const refContent = useRef<any>();
  // const refContent = useRef()
  const [useChat, { data, isSuccess, isLoading, error, isError }] =
    useChatMutation();
  const matches = useMediaQuery("(min-width: 994px)");

  useEffect(() => {
    if (!!isLoading) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (matches) {
      let height2 = refContent?.current?.clientHeight;

      height2 ? setheight(+height2) : setheight(100);
    } else {
      setheight(100);
    }
  }, [data?.content]);

  const PopularQuestions = [
    {
      id: 1,
      title: "Scoring engine",
      description: `Defining Sentence Defining Sentence Defining 
 Sentence Defining Sentence Defining Sentence.`,
    },
    {
      id: 2,
      title: "Scoring engine",
      description: `Defining Sentence Defining Sentence Defining 
 Sentence Defining Sentence Defining Sentence.`,
    },
    {
      id: 3,
      title: "Scoring engine",
      description: `Defining Sentence Defining Sentence Defining 
 Sentence Defining Sentence Defining Sentence.`,
    },
    {
      id: 4,
      title: "Scoring engine",
      description: `Defining Sentence Defining Sentence Defining 
 Sentence Defining Sentence Defining Sentence.`,
    },
  ];

  const dataFilter = [
    { value: "Football", label: "Football" },
    { value: "Basketball", label: "Basketball" },
    { value: "Volleyball", label: "Volleyball" },
    { value: "Handball", label: "Handball" },
    { value: "Swimming", label: "Swimming" },
  ];

  const resultsData = [
    {
      id: 1,
      title: "How to Detect Progress ?",
      router: ["Home", "report", "Daily Actions"],
      link: "/help-center/501121353",
      description: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .`,
    },
    {
      id: 2,
      title: "How to Detect Progress ?",
      router: ["Home", "report", "Daily Actions"],
      link: "/help-center/5232901253",
      description: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .`,
    },
    {
      id: 3,
      title: "How to Detect Progress ?",
      router: ["Home", "report", "Daily Actions"],
      link: "/help-center/502621533",
      description: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .`,
    },
    {
      id: 4,
      title: "How to Detect Progress ?",
      router: ["Home", "report", "Daily Actions"],
      link: "/help-center/13213",
      description: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .`,
    },
  ];

  return (
    <div className="Help-Center grid gap-10 p-5 mb-20">
      <h2 className="text-perfGray3 text-sm ">Help Center</h2>

      <Grid
        columns={12}
        grow
        gutter={"xl"}
        className=" p-4 relative bg-white rounded-[10px] md:divide-x divide-[#BDBDBD] "
      >
        {/* progress bar in top */}{" "}
        <LoadingOverlay visible={visible} overlayBlur={2} />
        <Grid.Col span={12} md={6} className="relative grid gap-3">
          <h2 className="text-xl text-perfGray1 font-medium">
            Ask Performs Anything
          </h2>
          <div className="relative  flex items-stretch">
            <Textarea
              value={chat}
              className="flex-1"
              disabled={isLoading}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  useChat({ message: chat });
                }
              }}
              styles={{ input: { minHeight: `${height}px !important` } }}
              placeholder="Your Question"
              minRows={4}
              autosize
              onChange={(e) => setChat(e.currentTarget.value as string)}
              label={
                <button
                  type="submit"
                  disabled={isLoading}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      useChat({ message: chat });
                    }
                  }}
                  onClick={() => {
                    useChat({ message: chat });
                  }}
                  className=" !z-[50000000000] shadow min-w-[80px]  bg-white text-perfGray1 p-2 px-3 rounded-md flex justify-between items-center"
                >
                  {isLoading ? (
                    "loading..."
                  ) : (
                    <>
                      {" "}
                      ask{" "}
                      <PaperAirplaneIcon className="text-perfGray1 w-5 h-5 -rotate-45 " />
                    </>
                  )}
                </button>
              }
              classNames={{
                input: `bg-[#7B91B0]  !text-white  !h-[${height}px] rounded-[10px]`,
                wrapper: "!min-h-full",
                description: " !text-white",
                root: "relative",
                label:
                  "absolute bottom-4  right-4 !z-[50000000] min-w-[80px]  ",
              }}
            />
          </div>
        </Grid.Col>
        <Grid.Col span={12} md={6} className="relative ">
          {data?.content ? (
            <p
              className="h-full w-full whitespace-pre-wrap bg-white border rounded-[10px] p-5"
              ref={refContent}
            >
              {data?.content}
            </p>
          ) : (
            <div className="h-full w-full bg-white border rounded-[10px] p-5">
              Answer
            </div>
          )}
        </Grid.Col>
      </Grid>

      <h2 className="text-perfGray1 text-xl ">Popular Questions</h2>
      <Grid columns={12} grow gutter={"xl"} className=" gap-10 ">
        {PopularQuestions.map((ques) => (
          <Grid.Col
            span={12}
            key={ques.id}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            className="relative bg-white rounded-[10px] border border-[#E1E2E9]  p-5 grid gap-4"
          >
            <h4 className="text-perfGray1 text-xl font-medium">{ques.title}</h4>
            <p className="text-perfGray3 text-xl">{ques.description}</p>
          </Grid.Col>
        ))}
      </Grid>

      <div className="p-2 bg-white rounded-[10px] flex gap-3">
        <div className="border border-[#BDBDBD] rounded-[10px] flex flex-1 p-3 divide-x divide-[#BDBDBD] ">
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <button className="flex gap-2 p-1 px-4 ">
                <Bars3BottomLeftIcon className="w-5 h-5" /> Filter
              </button>
            </Menu.Target>

            <Menu.Dropdown>
              <Checkbox.Group value={value} onChange={setValue}>
                <div className="grid gap-2">
                  {dataFilter.map((item) => (
                    <Checkbox value={item.value} label={item.label} />
                  ))}
                </div>
              </Checkbox.Group>
            </Menu.Dropdown>
          </Menu>
          <Input
            icon={<MagnifyingGlassIcon className="w-5 h-5 text-perfGray3 " />}
            placeholder="Search here .."
            classNames={{
              input: "border-0  ",
              wrapper: " w-full flex-1",
              rightSection: "w-1/2",
            }}
            rightSection={
              <div className=" flex gap-4  p-2 justify-end">
                {value.length > 0 &&
                  value.map((item) => (
                    <div className=" bg-[#EBF3FE] flex justify-between gap-2 items-center p-2 h-[32px] rounded-2xl text-perfBlue">
                      {" "}
                      {item}
                      <XCircleIcon
                        className="w-5 h-5 text-perfGray3 "
                        onClick={() =>
                          setValue((prev) => prev.filter((val) => val !== item))
                        }
                      />
                    </div>
                  ))}
              </div>
            }
          />
        </div>
        <button
          type="submit"
          className="text-white w-44 h-full bg-perfBlue shadow rounded-xl "
        >
          Search{" "}
        </button>
      </div>

      <h2 className="text-perfGray3 text-sm  space-x-3">
        results <span className="font-bold text-perfGray1 ">42</span>{" "}
      </h2>
      <div className="grid gap-5  ">
        {resultsData.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-[10px] grid gap-2 "
          >
            <div className="flex justify-between ">
              <h3 className="flex-1 text-2xl text-perfGray1 ">{item.title}</h3>
              <Link to={item.link} className="text-end text-perfBlue">
                more details
              </Link>
            </div>
            <div className="flex gap-3">
              {item.router.map((rout, index) => (
                <span
                  className={`${
                    item.router.length - 1 !== index && item.router.length != 1
                      ? "text-perfGray3"
                      : "text-perfBlue"
                  } flex gap-3`}
                >
                  {" "}
                  {rout}
                  <span>{item.router.length - 1 == index ? "" : "/"}</span>
                </span>
              ))}
            </div>
            <p className="text-perfGray1">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpCenterPage;

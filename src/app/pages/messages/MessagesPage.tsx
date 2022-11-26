import { useState, useEffect } from "react";
import { Grid } from "@mantine/core";
import AllUserMessagesBox from "./Components/AllUserMessagesBox";
import ChatWindow from "./Components/ChatWindow";
import ConnectedUserInfo from "./Components/ConnectedUserInfo";
import classNames from "classnames";

type Props = {};

const connects = [
  {
    image:
      "https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2A.jpg",
    isActive: false,
    name: "John Doue",
    lastMessageText:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, voluptatum? Quos sed officiis assumenda officia modi, magnam odio saepe hic vel quisquam facere aspernatur dolorum ea consequatur eos, quae tenetur.",
    lastMessageTime: "10:30 am",
    unreadMessagesNumber: 0,
    selected: true,
    id: 1,
  },
  {
    image:
      "https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2A.jpg",
    isActive: true,
    name: "John ahmed",
    lastMessageText: "Lorem ipsum.",
    lastMessageTime: "10:30 am",
    unreadMessagesNumber: 5,
    id: 2,
  },
  {
    image:
      "https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2A.jpg",
    isActive: false,
    name: "John Doue",
    lastMessageText:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, voluptatum? Quos sed officiis assumenda officia modi, magnam odio saepe hic vel quisquam facere aspernatur dolorum ea consequatur eos, quae tenetur.",
    lastMessageTime: "10:30 am",
    unreadMessagesNumber: 0,
    id: 3,
  },
  {
    image:
      "https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2A.jpg",
    isActive: false,
    name: "John Doue",
    lastMessageText:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, voluptatum? Quos sed officiis assumenda officia modi, magnam odio saepe hic vel quisquam facere aspernatur dolorum ea consequatur eos, quae tenetur.",
    lastMessageTime: "10:30 am",
    unreadMessagesNumber: 0,
    id: 4,
  },
  {
    image:
      "https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2A.jpg",
    isActive: false,
    name: "John Doue",
    lastMessageText:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, voluptatum? Quos sed officiis assumenda officia modi, magnam odio saepe hic vel quisquam facere aspernatur dolorum ea consequatur eos, quae tenetur.",
    lastMessageTime: "10:30 am",
    unreadMessagesNumber: 0,
    id: 5,
  },
];

const MessagesPage = (props: Props) => {
  const [visibleChatUserID, setVisibleChatUserID] = useState<number>(0);
  const [selectedConnect, setSelectedConnect] =
    useState<{
      image: string;
      isActive: boolean;
      name: string;
      id: number;
    } | null>(null);

  useEffect(() => {
    console.log("Effected");

    for (let connect of connects) {
      if (connect.id === visibleChatUserID) {
        setSelectedConnect(connect);
      }
    }
  }, [selectedConnect, visibleChatUserID]);

  return (
    <div className="p-4">
      <div
        className="sm:hidden text-perfGray3 mb-2 mx-2 cursor-pointer"
        onClick={() => {
          setSelectedConnect(null);
          setVisibleChatUserID(0);
        }}
      >{`< Back`}</div>
      <Grid className="bg-pagesBg items-stretch">
        <Grid.Col
          span={12}
          sm={5}
          md={3}
          className={classNames("", {
            "hidden sm:grid": selectedConnect,
          })}
        >
          <AllUserMessagesBox
            visibleChatUserID={visibleChatUserID}
            setVisibleChatUserID={setVisibleChatUserID}
            connects={connects}
          />
        </Grid.Col>
        <Grid.Col
          span={12}
          sm={7}
          md={7}
          className={classNames("", {
            "hidden sm:grid": !selectedConnect,
          })}
        >
          <ChatWindow
            notSelected={selectedConnect ? false : true}
            image={selectedConnect ? selectedConnect.image : "NA"}
            isActive={selectedConnect ? selectedConnect.isActive : false}
            name={selectedConnect ? selectedConnect.name : "NA"}
            connectId={visibleChatUserID}
          />
        </Grid.Col>
        <Grid.Col className="hidden md:block" span={2}>
          <ConnectedUserInfo
            image={selectedConnect ? selectedConnect.image : "NA"}
            name={selectedConnect ? selectedConnect.name : "No Name"}
            id={selectedConnect ? selectedConnect.id : 0}
            education={"NA"}
            sport={"Sport Name"}
            teams={["team One", "team two"]}
            notSelected={selectedConnect ? false : true}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default MessagesPage;

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
      "https://media.istockphoto.com/id/1162804750/photo/headshot-of-a-male-football-coach.jpg?s=612x612&w=0&k=20&c=f9pal_RaBurFRG3Er9ZaEdkhfeGAK3HHSKE_Q27vjko=",
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
      "https://previews.123rf.com/images/blueskyimage/blueskyimage1311/blueskyimage131101911/23810213-sport-trainer-portrait-of-happy-young-coach.jpg",
    isActive: true,
    name: "John ahmed",
    lastMessageText: "Lorem ipsum.",
    lastMessageTime: "10:30 am",
    unreadMessagesNumber: 5,
    id: 2,
  },
  {
    image:
      "https://www.aurelienterrade.fr/wp-content/uploads/2016/10/ATE_2812_1600PX.jpg",
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
      "https://images.squarespace-cdn.com/content/v1/51ef4493e4b0561c90fa76d6/1552662204584-T7V059IOXKML3FJP91RM/20180416_SLP0248-Edit.jpg?format=1000w",
    isActive: true,
    name: "Sala Farok",
    lastMessageText:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, voluptatum? Quos sed officiis assumenda officia modi, magnam odio saepe hic vel quisquam facere aspernatur dolorum ea consequatur eos, quae tenetur.",
    lastMessageTime: "10:30 am",
    unreadMessagesNumber: 0,
    id: 4,
  },
  {
    image:
      "https://static.clubs.nfl.com/image/private/t_person_squared_mobile/f_auto/v1627765284/bills/f7ij9msrexvzdt9yingn.jpg",
    isActive: false,
    name: "Ali Mohammed",
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

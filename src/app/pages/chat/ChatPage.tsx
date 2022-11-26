import React, { useEffect } from "react";
import {
  ZIMKitManager,
  Common,
  Chat,
  ConversationList,
} from "@zegocloud/zimkit-react";
import "@zegocloud/zimkit-react/index.css";
import { useChatTokenQuery } from "~/app/store/core/coreApi";
import { players } from "../home/HomePage";
import { useUserQuery } from "~/app/store/user/userApi";
const appConfig = {
  appID: 989463489, // AppID - type: number
  serverSecret: "", // ServerSecret - type: 32 byte length string
};
const ChatPage = () => {
  const { data, isSuccess } = useChatTokenQuery(null);
  const { data: user } = useUserQuery(null);
  useEffect(() => {
    if (isSuccess && user) {
      const initChat = async () => {
        const zimKit = new ZIMKitManager();
        await zimKit.init(appConfig.appID);
        await zimKit.connectUser(
          {
            userID: user.id.toString(),
            userName: user.first_name,
            userAvatarUrl: user.avatar,
          },
          data.data
        );
      };
      initChat();
    }
  }, [isSuccess, user]);
  return <Common></Common>;
};

export default ChatPage;

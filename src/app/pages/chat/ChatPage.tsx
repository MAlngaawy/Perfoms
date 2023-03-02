import React, { useEffect } from "react";
import {
  ZIMKitManager,
  Common,
  Chat,
  ConversationList,
} from "@zegocloud/zimkit-react";
import "@zegocloud/zimkit-react/index.css";
import { useChatTokenQuery } from "~/app/store/core/coreApi";
import { useUserQuery } from "~/app/store/user/userApi";
import CommingSoonLayout from "~/@main/components/CommingSoonLayout/CommingSoonLayout";
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
  return (
    <div className="p-4 relative h-screen overflow-hidden">
      <CommingSoonLayout />
      <Common></Common>
    </div>
  );
};

export default ChatPage;

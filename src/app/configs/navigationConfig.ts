import { NavigationConfigTypes } from "~/@main/types/Config-Types";

const navigationConfig: NavigationConfigTypes[] = [
  {
    id: "home-page",
    title: "Home",
    translate: "HOME",
    type: "item",
    icon: "HomeIcon:outline",
    url: "home",
  },
  // {
  //   id: "notifications-page",
  //   title: "Notifications",
  //   translate: "NOTIFICATIONS",
  //   type: "item",
  //   icon: "BellIcon:outline",
  //   url: "notifications",
  // },
  // {
  //   id: "messages-page",
  //   title: "Messages",
  //   translate: "MESSAGES",
  //   type: "item",
  //   icon: "EnvelopeIcon:outline",
  //   url: "messages",
  // },
  {
    id: "coaches-page",
    title: "Coaches",
    translate: "COACHES",
    type: "item",
    icon: "UserIcon:outline",
    url: "coaches",
  },
  {
    id: "chat-page",
    title: "Chat",
    translate: "CHAT",
    type: "item",
    icon: "EnvelopeIcon:outline",
    url: "chat",
  },
  {
    id: "reports-page",
    title: "Reports",
    translate: "REPORTS",
    type: "item",
    icon: "NewspaperIcon:outline",
    url: "reports",
  },
  {
    id: "media-page",
    title: "Media",
    translate: "MEDIA",
    type: "item",
    icon: "BookmarkIcon:outline",
    url: "media",
  },
  {
    id: "subscriptions-page",
    title: "Subscriptions",
    translate: "SUBSCRIPTIONS",
    type: "item",
    icon: "BanknotesIcon:outline",
    url: "subscriptions",
  },
  {
    id: "players",
    title: "Players",
    translate: "PLAYERS",
    type: "item",
    icon: "UserCircleIcon:outline",
    url: "players",
  },
];

export default navigationConfig;

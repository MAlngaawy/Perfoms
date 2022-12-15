import { BaseGetAllType } from "./base-types";
import { Details, Player } from "./parent-types";
import { Team } from "~/app/store/types/coach-types";
export type LoginUserBody = {
  mobile: string;
  password: string;
};

export type SignupRes = {
  data: {
    id: number;
  };
};

export type LoginResponse = {
  access: string;
  refresh: string;
};

export type ProfileResponse = {
  data: User;
};

export type User = {
  id: number;
  country: string;
  last_login: string;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  is_active: boolean;
  user_type: string;
  mobile: string;
  bio: string;
  details?: Details;
  avatar: string;
  city: string;
  job: string;
  dob: string;
  club: number;
  full_name?: string;
  teams?: Partial<Team>[];
};

export type UpdateProfile = Partial<User>;

export type UserSignup = {
  id?: number;
  user_type: string;
  first_name: string;
  last_name: string;
  country: string;
  club: number;
  mobile: string;
  password: string;
  city: string;
  teams: number[];
};

// =====

export type CardProps = {
  header?: string;
  firstText?: string;
  secondText?: string;
  detailedText?: string;
  powerType?: string;
  scores?: Scores[];
  playerData?: Player;
  playerSummary?: PerformanceCardProps[];
  bg?: string;
  color?: string;
  player_id: number | string | undefined;
};

export type Scores = {
  name: string;
  score: string;
};

export type InfoProps = {
  label: string;
  value?: string | number | undefined;
};

export type PlayerData = {
  name: string;
  icon_url?: string;
  dob?: string;
  weight?: string | number;
  height?: string | number;
  sport?: GeneralInfo;
  gender?: "M" | "F";
  coaches?: PersonData[];
  team?: GeneralInfo;
  phoneNumber?: string | number;
};

export type GeneralInfo = {
  name?: string;
  description?: string;
  coaches?: PersonData[];
};

export type PerformanceCardProps = {
  number: number;
  name: string;
  bgColor: string;
  textColor: string;
  children?: any;
  icon?: string;
};

export type PersonData = {
  first_name: string;
  last_name: string;
  avatar: string;
};

export type PlayerButtonProps = {
  img: string;
  name: string;
  onClick: () => void;
  active: boolean;
};

export type SecondNavProps = {
  players: PlayerData[];
  selectedplayer: any;
  setSelectedPlayer: any;
};

export type NotificationsType = {
  count: number;
  next: string;
  previous: string;
  results: [
    {
      id: number;
      sender: User;
      receiver: User;
      message: string;
      created_at: Date;
      notification_type: "Report" | "Certificate" | "Complement" | "Permission";
      player: number;
    }
  ];
};

export type Notifications = BaseGetAllType & {
  results: {
    message: string;
    notification_type: "Report" | "Certificate" | "Complement" | "Permission";
    created_at: Date;
    player: number;
    sender: {
      id: number;
      full_name: string;
      avatar: string;
    };
  }[];
};

export type ProfileType = {
  count: number;
  next: string;
  previous: string;
  results: User[];
};

export type SendOtp = {
  id: number;
};

export type OTPVerify = {
  id: number | null;
  otp: string;
};

export type UserDeviceId = {
  device_id: string;
  registration_token: string;
  device_type: string;
};

export type ChangePassword = {
  old_password: string;
  new_password: string;
};

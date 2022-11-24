import { Player } from "./parent-types";
export type LoginUserBody = {
  mobile: string;
  password: string;
};

export type SignupRes = {
  data: {
    access: string;
    refresh: string;
  };
};

export type LoginResponse = {
  message: string;
  data: {
    access: string;
    refresh: string;
    user_data: User;
  };
  players: any[];
  error: boolean;
};

export type ProfileResponse = {
  message: string;
  data: User;
  error: boolean;
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
  bio: string;
  details: object;
  avatar: string;
  city: string;
  job: string;
  dob: string;
  club: number;
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
  type:
    | "action"
    | "recommendation"
    | "power"
    | "playerInfo"
    | "performanceSummary"
    | "teamInfo"
    | "calendar"
    | "upcomingEvents";
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
};

export type Scores = {
  name: string;
  score: string;
};

export type InfoProps = {
  label: string;
  value?: string;
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
  number: number | string;
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

export type ProfileType = {
  count: number;
  next: string;
  previous: string;
  results: User[];
};

export type SendOtp = {
  mobile: string;
};

export type OTPVerify = {
  mobile: string;
  otp: string;
  token?: string;
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

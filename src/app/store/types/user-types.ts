import { BaseGetAllType } from "./base-types";
import { Details, Player } from "./parent-types";
import { Team } from "~/app/store/types/coach-types";
import { Data } from "~/app/pages/players/player-details/Tabs/PlayerDataAnalytics/types";
export type LoginUserBody = {
  mobile: string;
  password: string;
};

export type SignupRes = {
  data: {
    id: number;
    mobile: string;
  };
};

export type LoginResponse = {
  access: string;
  refresh: string;
};

export type ProfileResponse = {
  data: User;
};

export type playerEvents = BaseGetAllType & {
  results: { id: number; name: string }[];
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
  center?: boolean;
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
  data?: any;
  powerType?: string;
  player_id?: number;
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

export type updatePlayerAnalyticsData = Data;

export type SecondNavProps = {
  players: PlayerData[];
  selectedplayer: any;
  setSelectedPlayer: any;
};

export type NotificationsType = {
  count: number;
  next: string;
  previous: string;
  unread_count: number;
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
  // id: number;
  mobile: string;
};

export type OTPVerify = {
  // id: number | null;
  mobile: string | null;
  otp: string;
};

export type ChangePhone = {
  mobile: string;
  password: string;
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

export type AddExperince = {
  date_from: string;
  date_to: string;
  title: string;
  to_present: boolean;
  place: string;
  description: string;
};

export type Experince = {
  id: number;
  date_from: string;
  date_to: string;
  title: string;
  to_present: boolean;
  place: string;
  description: string;
};

export type UserExperinces = BaseGetAllType & {
  results: Experince[];
};

export type AddCourse = {
  name: string;
};

export type Course = {
  id: number;
  name: string;
};

export type Courses = BaseGetAllType & {
  results: Course[];
};

export type AddQualification = {
  name: string;
};

export type Qualification = {
  id: number;
  name: string;
};

export type Qualifications = BaseGetAllType & {
  results: Qualification[];
};

export type AddEducation = {
  player_id?: number | undefined;
  year: number;
  degree: string;
  universty: string;
};

export type Education = {
  id: number;
  year: number;
  degree: string;
  universty: string;
};

export type Educations = BaseGetAllType & {
  results: Education[];
};

export type AddAchievements = {
  type: string;
  place: number;
  location: string;
  date: string;
};

export type Achievement = {
  id: number;
  type: string;
  date: string;
  location: string;
  place: number;
};

export type UserAchievements = BaseGetAllType & {
  results: Achievement[];
};

export type ResetPassword = {
  mobile: string | null;
  new_password: string;
  new_password_confirm: string;
};

export type ClubTeams = BaseGetAllType & {
  results: {
    id: number;
    name: string;
  }[];
};

export type PlayerLeague = {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  location: string;
};

export type PlayerLeagues = BaseGetAllType & {
  results: PlayerLeague[];
};

export type AddPlayerLeague = {
  title: string;
  start_date: string;
  end_date: string;
};

export type PlayerEvent = {
  id: number;
  name: string;
  icon: string;
  icon_url: string;
  video_url: string;
};

export type PlayerEvents = BaseGetAllType & {
  results: PlayerEvent[];
};

export type AddPlayerEvent = {
  name: string;
  icon: string;
  player: number;
};

export type AddEventVideo = {
  video: string;
};

export type EventVideos = BaseGetAllType & {
  event_videos: {
    video: string;
    id: number;
  }[];
  id: number;
};

export type MyClub = {
  id: number;
  name: string;
  icon: string;
  icon_url: string;
};

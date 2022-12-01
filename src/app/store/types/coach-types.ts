import { Attendance } from "./attendance-types";
import { BaseGetAllType } from "./base-types";
import { TeamPlayer } from "./clubManager-types";
import { RatePer } from "./supervisor-types";

export enum NotificationType {
  Report = "Report",
  Certificate = "Certificate",
  Complement = "Complement",
  Permission = "Permission",
}

export type CoachForParent = {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type TeamKpiMetric = {
  id: number;
  metric: {
    id: number;
    name: string;
  };
  player_kpi: {
    id: number;
    kpi: {
      id: number;
      icon: string;
      name: string;
    };
    player: {
      id: number;
      icon: string;
      name: string;
    };
  };
  score: number;
  max_score: number;
};

export type Coach = {
  id: number;
  country: string;
  last_login: Date;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  mobile: string;
  is_active: true;
  user_type: string;
  bio: string;
  details: object;
  avatar: string;
  city: string;
  verified: true;
  club: number;
};

export type AllCoachesType = BaseGetAllType & {
  data: Coach[];
};

export type GeneratePdfDocs = {
  players: number[];
  doc_type: "Report" | "Certificate";
  doc_about: "Performance" | "Attendance" | "Matches";
};

// export type Team = {
//   id: number;
//   players: string;
//   events: string;
//   attendances: string;
//   coaches: string;
//   players_kpi_metrics: string;
//   created_at: Date;
//   updated_at: Date;
//   order: number;
//   name: string;
//   description: string;
//   icon: string;
//   icon_url: string;
//   score: number;
//   max_score: number;
//   coverage: number;
//   from_age: number;
//   to_age: number;
//   pillar: number;
//   sport: number;
// };

export type Team = {
  id: number;
  coaches: CoachForParent[];
  sport: string;
  name: string;
  description: string;
  icon: string;
  icon_url: string;
  rate_per: RatePer;
  players_count: number;
  from_age: number;
  to_age: number;
  gender: string;
};

export type GetMyTeams = BaseGetAllType & {
  data: Team[];
};

export type SendBulkNotifications = {
  notification_type: NotificationType;
  players: number[];
  title: string;
  message: string;
};

export type UpdatePlayerPKM = {
  id: number;
  score: number;
};

export type PlayerParent = {
  id: number;
  avatar: number;
  first_name: string;
  last_name: string;
  subscription: string;
  job: string;
  mobile: string;
  parent_players: TeamPlayer[];
};

export type PlayerAttendance = BaseGetAllType & {
  results: {
    id: number;
    day: string;
    status: "ATTENDED" | "ABSENT" | "UPCOMING";
    player: {
      id: number;
      name: string;
      icon: string;
    };
  }[];
};

export type CoachPlayerInfo = {
  id: number;
  name: string;
  dob: string;
  weight: number;
  height: number;
  icon: string;
  icon_url: string;
  sport: string;
};

export type CoachTeamInfo = {
  id: number;
  coaches: CoachForParent[];
  sport: string;
  name: string;
  description: string;
  icon: string;
  icon_url: string;
  rate_per: RatePer;
  players_count: number;
  from_age: number;
  to_age: number;
};

export type CoachTeamPerformance = BaseGetAllType & {
  results: TeamKpiMetric[];
};

export type UpdateAttendance = {
  status: string;
};

export type UpdatePlaerKpiMetric = {
  score: number;
  max_score: number;
};

import { string } from "yup";
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

export type GenerateCertification = {
  player: number;
  club: number;
  team: number;
  type: "Performance" | "Congratulations" | "Encouragement" | "Other";
};

export type TeamKpiMetric = {
  icon: string;
  id: number;
  name: string;
  player_metric: {
    id: number;
    last_score: number;
    metric: string;
    kpi: string;
  }[];
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

export type TeamStatistics = {
  id: number;
  name: string;
  icon: string;
  icon_url: string;
  statistics: {
    strength: number;
    moderate: number;
    weakness: number;
  };
};

export type TeamKpiStatistics = {
  id: number;
  name: string;
  icon: string;
  icon_url: string;
  statistics: {
    strength: number;
    moderate: number;
    weakness: number;
  };
};

export type TeamKpiPlayerStatistics = {
  id: number;
  name: string;
  icon: string;
  icon_url: string;
  kpi: {
    id: number;
    name: string;
    icon: string;
    icon_url: string;
    statistics: {
      strength: number;
      moderate: number;
      weakness: number;
    };
  };
};

export type TeamPlayerAttendStatistics = {
  id: number;
  name: string;
  icon: string;
  icon_url: string;
  player_attendance: {
    absent: number;
    attends: number;
    upcoming: number;
  };
};

export type PlayerMonthsAttendancesStatistics = {
  name: string;
  statistics: {
    attends: number;
    absent: number;
    upcoming: number;
  };
}[];

export type TeamPlayersAttendStatistics = BaseGetAllType & {
  results: TeamPlayerAttendStatistics[];
};

export type TeamKpiPlayersStatistics = BaseGetAllType & {
  results: TeamKpiPlayerStatistics[];
};

export type TeamKpisStatistics = BaseGetAllType & {
  results: TeamKpiStatistics[];
};

export type TeamsStatistics = BaseGetAllType & {
  results: TeamStatistics[];
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

export type TeamAttendanceDays = BaseGetAllType & {
  results: { day: string }[];
};

export type TeamPerformanceMetrics = BaseGetAllType & {
  results: [
    {
      id: number;
      name: string;
      kpi_metric: {
        id: number;
        name: string;
      }[];
    }
  ];
};

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
  results: Team[];
};

export type SendBulkNotifications = {
  notification_type: NotificationType;
  players: number[];
  title: string;
  message: string;
};

export type sendNotifications = {
  notification_type: NotificationType;
  parent_id: number;
  title: string;
  message: string;
  player_id: number;
};

export type UpdatePlayerPKM = {
  id: number;
  team_id: number;
  score: number;
  max_score: number;
};

export type PlayerParent = {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  subscription: string;
  job: string;
  mobile: string;
  parent_players: TeamPlayer[];
};

export type AllTeamsPlayers = BaseGetAllType & {
  results: TeamPlayer[];
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

export type CoachAttendance = {
  icon: string;
  id: number;
  name: string;
  player_attendance: {
    id: number;
    day: string;
    status: "ATTENDED" | "ABSENT" | "UPCOMING";
  }[];
};

export type CoachTeamAttendance = BaseGetAllType & {
  results: CoachAttendance[];
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
  parent_name: string;
  phone?: string;
  profile?: string;
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
  gender: string;
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

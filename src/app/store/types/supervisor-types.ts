import { PlayerCoach, Player } from "./parent-types";
import { BaseGetAllType } from "./base-types";

// Reused
export type Metric = {
  id: number;
  name: string;
  icon: string;
  kpi?: number;
};

export type kpi = {
  id: number;
  name: string;
  icon: string;
};

export type RatePer = "Week" | "Two_Weeks" | "Month";

export type AddAction = {
  id: number;
  name: string;
  description?: string;
  // metric_id: string;
};

export type AddEvent = {
  name: string;
  icon: string;
  date: string;
  teams: number;
  club: number;
};

export type AddRecommendation = {
  id: number;
  name: string;
  description?: string;
  // metric_id: string;
};

export type TeamCoach = {
  team_id: number;
  coach_id: number;
};

export type TeamPlayer = {
  team_id: number;
  player_id: number;
};

export type Team = {
  id: number;
  icon: string;
  name: string;
  from_age: number;
  to_age: number;
  rate_per: RatePer;
  players_count: number;
  pillar?: number;
  sport?: string;
};

export type coaches = BaseGetAllType & {
  results: PlayerCoach[];
};

export type CreateMetric = Metric;

// Event type has been created

export type Kpis = BaseGetAllType & {
  results: kpi[];
};

export type Metrics = BaseGetAllType & {
  results: Metric[];
};

export type SuperVisorSport = {
  id: number;
  name: string;
  icon: string;
};

export type SuperVisorTeam = {
  sport: SuperVisorSport;
  name: string;
  description: string;
  icon: string;
  icon_url: string;
  players_count: number;
  from_age: number;
  to_age: number;
};

export type SuperVisorPlayers = BaseGetAllType & {
  results: { id: number; name: string; icon: string }[];
};

export type SuperVisorTeams = BaseGetAllType & {
  results: SuperVisorTeam[];
};

export type SuperVisorTeamInfo = {
  id: number;
  coaches: Partial<PlayerCoach>[];
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

export type SuperVisorAttendance = BaseGetAllType & {
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

export type SuperVisorTeamCoaches = BaseGetAllType & {
  results: PlayerCoach;
};

export type SuperVisorTeamPlayers = BaseGetAllType & {
  result: Partial<Player>[];
};
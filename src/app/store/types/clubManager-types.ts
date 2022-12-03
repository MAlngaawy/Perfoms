import { BaseGetAllType } from "./base-types";
import { Metric, Team } from "./supervisor-types";
import { Event } from "./events-types";
import { PlayerCoach } from "./parent-types";

export type ClubManagerSport = {
  icon: string;
  icon_url: string;
  name: string;
  club: number;
};

export type CoachRequest = {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  country: string;
  city: string;
  mobile: string; // Required. Phone number with country code.
};

export type CoachesRequests = BaseGetAllType & {
  results: CoachRequest[];
};

export type AddMetric = Metric;

export type AddAction = {
  id: number;
  name: string;
  description: string;
};

export type AddRecommendation = {
  id: number;
  name: string;
  description: string;
};

export type Metrics = BaseGetAllType & {
  results: Metric[];
};

export type Sports = BaseGetAllType & {
  results: ClubManagerSport[];
};

export type Pillars = BaseGetAllType & {
  results: {
    id: number;
    name: string;
    icon: string;
  }[];
};

export type Teams = BaseGetAllType & {
  results: Team[];
};

export type AddTeamsCalendar = {
  days: string[];
  teams: number;
};

export type AddTeamsCoach = {
  team_id: number;
  coach_id: number;
};

export type AddTeamsPlayer = {
  team_id: number;
  player_id: number;
};

export type AddEvent = {
  name: string;
  icon: string;
  date: string;
  team: number;
  club: number;
};

export type UpdateEvent = Event;

export type TeamPlayer = {
  id: number;
  icon: string;
  icon_url: string;
  name: string;
  dob: string;
  weight: number;
  height: number;
};

export type plaerParent = PlayerCoach;

export type TeamPlayers = BaseGetAllType & {
  results: TeamPlayer[];
};

export type AddCoachUser = {
  mobile: string; // Required. Phone number with country code.
  password: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type SupervisorsUers = BaseGetAllType & {
  results: PlayerCoach[];
};

export type AddSupervisorUser = {
  mobile: string; // Required. Phone number with country code.
  password: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

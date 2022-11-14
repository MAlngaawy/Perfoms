import { Coach, Team } from "./coach-types";
import { BaseGetAllType } from "./base-types";
import { User } from "./user-types";
import { Event } from "./events-types";
import { Attendance } from "./attendance-types";

export type AddPlayerType = {
  name: string;
  dob?: string;
  sport: number;
  team: number;
  weight: number;
  height: number;
  phone: string;
  icon?: string;
  kpis?: {}; // Added this optional key to fix tye typescript error in the chart component
};

export type Sport = {
  id: number;
  created_at: Date;
  updated_at: Date;
  order: number;
  name: string;
  description: string;
  icon: string;
  icon_url: string;
  score: number;
  max_score: number;
  coverage: number;
  club: number;
};

export type Kpi = {
  coverage: number;
  id: number;
  kpi__icon_url: string;
  kpi__max_score: number;
  kpi__name: string;
  kpi_id: number;
  score: number;
};

export type Player = {
  id: 0;
  attendances: Attendance[];
  parent: User;
  sport: Sport;
  team: Team;
  events: Partial<Event>[];
  kpis: { data: Kpi[]; total_count: number };
  created_at: Date;
  updated_at: Date;
  order: number;
  name: string;
  description: string;
  icon: string;
  icon_url: string;
  score: number;
  max_score: number;
  coverage: number;
  gender: string;
  weight: number;
  height: number;
  dob: string;
  phone: string;
};

export type PlayerCoach = {
  id: number;
  teams: { id: number; name: string }[];
  avatar: string;
  first_name: string;
  last_name: string;
  details: {} & { education: string };
  job: string;
};

export type AllPlayers = BaseGetAllType & {
  data: Player[];
};

export type AllPlayerCoaches = BaseGetAllType & {
  data: PlayerCoach[];
};

export type AllParents = BaseGetAllType & {
  data: User[];
};

export type Club = {
  id: number;
  sports: string;
  teams: string;
  created_at: Date;
  updated_at: Date;
  order: number;
  name: string;
  description: string;
  icon: string;
  icon_url: string;
  score: number;
  max_score: number;
  coverage: number;
};

export type AllClubs = BaseGetAllType & {
  data: Club[];
};

export type DocumentTypes = {
  id: number;
  coach: Coach;
  pdf_file: string;
  created_at: "2022-11-05T13:11:46.674Z";
  doc_about: "Performance" | "Attendance" | "Matches";
  doc_type: "Report" | "Certificate";
  player: number;
};

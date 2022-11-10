import { Coach, Team } from "./coach-types";
import { BaseGetAllType } from "./base-types";
import { User } from "./user-types";

export type AddPlayerType = {
  name: string;
  dob: string;
  sport: number;
  team: number;
  weight: number;
  height: number;
  phone: string;
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

export type Player = {
  id: 0;
  attendances: string;
  parent: User;
  sport: Sport;
  team: Team;
  events: string;
  kpis: string;
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

export type AllPlayers = BaseGetAllType & {
  data: Player[];
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

import { BaseGetAllType } from "./base-types";

export enum NotificationType {
  Report = "Report",
  Certificate = "Certificate",
  Complement = "Complement",
  Permission = "Permission",
}

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
  results: Coach[];
};

export type GeneratePdfDocs = {
  players: number[];
  doc_type: string;
  doc_about: string;
};

export type Team = {
  id: number;
  players: string;
  events: string;
  attendances: string;
  coaches: string;
  players_kpi_metrics: string;
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
  from_age: number;
  to_age: number;
  pillar: number;
  sport: number;
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

export type UpdatePlayerPKM = {
  id: number;
  score: number;
};

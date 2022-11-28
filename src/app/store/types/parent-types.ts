import { Coach, Team } from "./coach-types";
import { BaseGetAllType } from "./base-types";
import { User } from "./user-types";
import { Event } from "./events-types";
import { Attendance } from "./attendance-types";

export type Subscription = {
  id: number;
  options: {
    id: number;
    title: string;
  }[];
  title: string;
  description: string;
  price: string;
  current_plan: boolean;
};

export type ActiveSubscription = {
  id: number;
  subscription: Subscription;
  payment_method: "Stripe" | "Paymob" | "Not_Defined";
  subscription_type: "Monthly" | "Annual";
  active: boolean;
  paied: boolean;
  paymob_order_id: string;
  user: number;
};

export type AddPlayerType = {
  name: string;
  dob?: string;
  team: number[];
  weight: number;
  height: number;
  phone: string;
  icon: string;
};

export type ParentClub = {
  id: number;
  name: string;
  icon: string;
  icon_url: string;
};

export type ParentClubs = BaseGetAllType & {
  results: ParentClub[];
};

export type PlayerCoach = {
  id: number;
  teams: Partial<Team>[];
  avatar: string;
  first_name: string;
  last_name: string;
  details: {} & { education: string };
  job: string;
  dob: string;
};

export type PlayerCoachTeam = {
  id: number;
  sport: PlayerSport;
  coaches: PlayerCoach[];
  name: string;
  description: string;
  icon: string;
  icon_url: string;
  players_count: number;
  from_age: number;
  to_age: number;
};

export type PlayerCoachTeams = BaseGetAllType & {
  results: PlayerCoachTeam[];
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

export type AllPlayers = BaseGetAllType & {
  results: Player[];
};

export type PlayerMetric = { id: number; name: string };
export type PlayerAction = {
  id: number;
  name: string;
  description: string;
  metric: PlayerMetric;
};

export type PlayerActions = BaseGetAllType & {
  results: PlayerAction[];
};

export type SelectSubscription = {
  subscription: number;
  subscription_type: "Monthly" | "Annual";
};
export type SelectSubscriptionRes = {
  data: string;
  errors: boolean;
  message: string;
};

export type Subscriptions = BaseGetAllType & {
  results: Subscription[];
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

export type PlayerSport = Partial<Sport>;

export type PlayerSports = BaseGetAllType & {
  results: PlayerSport[];
};

export type EventFile = {
  id: number;
  file: string;
};

export type EventFiles = BaseGetAllType & {
  results: EventFile[];
};

export type PlayerAttendance = {
  id: number;
  day: string;
  status: "ATTENDED" | "ABSENT" | "UPCOMING";
};

export type PlayerAttendances = BaseGetAllType & {
  results: PlayerAttendance[];
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

export type PlayerCoaches = BaseGetAllType & {
  results: PlayerCoach[];
};

export type AllParents = BaseGetAllType & {
  results: User[];
};

export type PlayerTeams = BaseGetAllType & {
  results: Team[];
};

export type PlayerRecommendation = {
  id: number;
  name: string;
  description: string;
  metric: PlayerMetric;
};
export type PlayerRecommendations = BaseGetAllType & {
  results: PlayerRecommendation[];
};

export type PlayerDocument = {
  id: number;
  coach: Coach;
  pdf_file: string;
  created_at: Date;
  doc_about: "Performance" | "Attendance" | "Matches";
  doc_type: "Report" | "Certificate";
  player: number;
  team: number;
};

export type PlayerDocuments = BaseGetAllType & {
  results: PlayerDocument[];
};

export type PlayerKpiMetric = {
  id: number;
  kpi: string;
  metric: string;
  level: "z" | "w" | "i" | "s";
  score_avg: string;
};

export type SportTeam = {
  id: number;
  name: string;
  icon: string;
};

export type SportTeams = BaseGetAllType & {
  results: SportTeam[];
};

export type TeamCoaches = BaseGetAllType & {
  results: Partial<PlayerCoach>[];
};

export type TeamEvent = {
  id: number;
  name: string;
  icon: string;
  icon_url: string;
  date: string;
  club: ParentClub;
};
export type TeamEvents = BaseGetAllType & {
  results: TeamEvent[];
};

export type TeamSupervisor = {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  details: {};
  job: string;
};

export type TeamSupervisors = BaseGetAllType & {
  results: TeamSupervisor[];
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

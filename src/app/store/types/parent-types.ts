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
  most_popular: boolean;
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
  icon: any;
};

export type UpdatePlayer = {
  name: string;
  dob: string;
  weight: number;
  height: number;
  icon_url: string;
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
  icon?: string;
  name?: string;
  id: number;
  teams: Partial<Team>[];
  avatar: string;
  first_name: string;
  last_name: string;
  details?: Details;
  job: string;
  dob: string;
  bio?: string;
  user_type?: string;
  sport?: string;
  // Missing data
  // sport: string;
  // type: "Coach" | "Supervisor";
};

export type Details = {
  bio?: string;
  education?: {
    from?: string;
    to?: string;
    degree?: string;
    universty?: string;
  };
  experinces?: {
    from?: string;
    to?: string;
    name?: string;
    description?: string;
  };
  qualifications?: string[];
  courses?: string[];
  achievements?: {
    type?: string;
    year?: string;
    place?: string;
  }[];
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
  id: number;
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

export type EventFiles = {
  id: number;
  name: string;
  event_files: EventFile[];
  video_url: string;
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

export type PlayerKpi = {
  id: number;
  kpi: string;
  score_avg: number;
  old_score_avg: number;
};

export type PlayerKpis = {
  action_count: number;
  intermediate_count: number;
  player_kpi: PlayerKpi[];
  recommendation_count: number;
  weakness_count: number;
  strength_count: number;
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

export type PlayerMetricScores = BaseGetAllType & {
  results: {
    id: number;
    metric: string;
    kpi: string;
    avg_score: number;
  }[];
};

export type TeamEvent = {
  id: number;
  name: string;
  icon: string;
  icon_url: string;
  date: string;
  club: ParentClub;
  location: string;
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

export type PlayerCertificate = {
  created_at: Date;
  id: number;
  player: {
    id?: number;
    name: string;
    icon?: string;
    icon_url?: string;
    parent?: number;
  };
  coach: {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  club: {
    id: number;
    name: string;
    icon: string;
    icon_url: string;
  };
  team: number;
  type: CertificateTypes | string;
};

export type CertificateTypes =
  | "Performance"
  | "Congratulations"
  | "Encouragement"
  | "Other";

export type PlayerCertificates = BaseGetAllType & {
  results: PlayerCertificate[];
};

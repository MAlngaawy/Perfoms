import { BaseGetAllType } from "./base-types";

export type AddAttendance = {
  days: Date[];
  team: number;
};

export type UpdateAttendance = {
  id: number;
  status: string;
};

export type Attendance = {
  id: number;
  player: {
    id: number;
    name: string;
    icon: string;
  };
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
  day: string;
  status: "ATTENDED" | "ABSENT" | "UPCOMING";
  team: number;
};

export type PlayerAttendance = BaseGetAllType & {
  results: Attendance[];
};

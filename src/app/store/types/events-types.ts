import { BaseGetAllType } from "./base-types";

export type Event = {
  id: number;
  files: string;
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
  date: Date;
  team: number;
  club: number;
};

export type AllEvents = BaseGetAllType & {
  results: Event[];
};

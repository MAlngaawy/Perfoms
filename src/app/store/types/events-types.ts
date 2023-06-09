import { BaseGetAllType } from "./base-types";
import { RatePer } from "./supervisor-types";

export type Event = {
  id: number;
  event_files: string[];
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
  ratePer?: RatePer;
  date: Date;
  team: number;
  club: number;
  video_url: string;
  location: string;
};

export type AllEvents = BaseGetAllType & {
  data: Event[];
};

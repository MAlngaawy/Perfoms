import { BaseGetAllType } from "./base-types";

export type AddSport = {
  icon: string;
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

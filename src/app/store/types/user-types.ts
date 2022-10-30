import { type } from "os";

export type LoginUserBody = {
  mobile: string;
  password: string;
};

export type User = {
  id: number;
  country: string;
  last_login: string;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  is_active: boolean;
  user_type: string;
  bio: string;
  details: object;
  avatar: string;
  city: string;
  club: number;
};

export type UserSignup = {
  id?: number;
  user_type: string;
  first_name: string;
  last_name: string;
  country: string;
  club: number;
  mobile: string;
  password: string;
  city: string;
  teams: number[];
};

export type CardProps = {
  type: 'action' | 'recommendation' | 'power' | 'playerInfo' | 'performanceSummary',
  header?: string,
  firstText?: string,
  secondText?: string,
  detailedText?: string,
  powerType?: string,
  scores?: Scores[],
  playerData?: PlayerData,
  playerSummary?: PerformanceCardProps[]
}

export type Scores = {
  name: string,
  score: string
}

export type DropdownProps = {
  label: string,
  listItems: string[]
}

export type InfoProps = {
  label: string,
  value?: string,
}

export type PlayerData = {
  name: string,
  iconURL: string,
  dob: string,
  weight: string | number,
  height: string | number,
  sportName: string
}

export type PerformanceCardProps = {
  number: number | string,
  name: string,
  bgColor: string,
  textColor: string,
  children?: any,
  icon?: string
}
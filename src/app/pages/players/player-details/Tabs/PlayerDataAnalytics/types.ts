export interface BodyCompositionAnalysis {
  Name: string;
  Unit: string;
  value: string;
}
export interface MuscleFatAnalysis {
  Name: string;
  Unit: string;
  value: string;
}
export interface ObesityAnalysis {
  Name: string;
  Unit: string;
  value: string;
}
export interface SegmentalFatAnalysis {
  Name: string;
  Percent: string;
  Value: string;
}
export interface SegmentalLeanAnalysis {
  Name: string;
  Percent: string;
  Unit: string;
  Value: string;
}
export interface Data {
  Age: string;
  "Body composition analysis": BodyCompositionAnalysis[];
  Gender: string;
  Height: string;
  "Muscle fat analysis": MuscleFatAnalysis[];
  "Obesity analysis": ObesityAnalysis[];
  "Segmental fat analysis": SegmentalFatAnalysis[];
  "Segmental lean analysis": SegmentalLeanAnalysis[];
  Time: string;
}

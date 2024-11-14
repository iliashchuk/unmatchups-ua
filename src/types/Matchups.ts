export enum Advantage {
  Counter = "Counter",
  Favoured = "Favoured",
  SlightlyFavoured = "Slightly Favoured",
  Balanced = "Balanced",
  SlightlyLosing = "Slightly Losing",
  Losing = "Losing",
  Nightmare = "Nightmare",
  Unknown = "Unknown",
}

export type MatchupType = {
  opponentName: string;
  winPercentage: number;
  plays: number;
  advantage: Advantage;
};

export type MatchupData = Record<string, MatchupType[]>;

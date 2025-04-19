import { createContext, useContext, useMemo } from "react";
import { PlaysData } from "../types/Plays";
import data from "../data.json";
import { Advantage, MatchupData, MatchupType } from "../types/Matchups";

type Context = {
  playsData: PlaysData;
  matchupsData: MatchupData;
  set: string[];
};

type Props = {
  selectedSet?: string[];
};

const DataContext = createContext<Context>({
  matchupsData: {},
  playsData: {},
  set: [],
});

export const DataContextProvider: React.FC<React.PropsWithChildren<Props>> = ({
  selectedSet,
  children,
}) => {
  const playsData = useMemo(
    () =>
      data.fighterPlays.reduce<PlaysData>((acc, heroPlays) => {
        acc[heroPlays.name] = heroPlays.data.reduce<Record<string, number>>(
          (acc, { x: opponentsName, y: plays }) => {
            if (!selectedSet || selectedSet.includes(opponentsName)) {
              acc[opponentsName] = plays;
            }

            return acc;
          },
          {}
        );

        return acc;
      }, {}),
    [selectedSet]
  );

  const matchupsData = useMemo(
    () =>
      data.name.reduce<MatchupData>((acc, heroMatchup) => {
        acc[heroMatchup.name] = heroMatchup.data.reduce<MatchupType[]>(
          (acc, { x: opponentName, y: winPercentage }) => {
            if (opponentName === heroMatchup.name) {
              return acc;
            }

            const plays = playsData[heroMatchup.name][opponentName];

            let advantage: Advantage = Advantage.Unknown;

            if (plays < 4) {
              advantage = Advantage.Unknown;
            } else if (winPercentage > 75) {
              advantage = Advantage.Counter;
            } else if (winPercentage > 60) {
              advantage = Advantage.Favoured;
            } else if (winPercentage > 55) {
              advantage = Advantage.SlightlyFavoured;
            } else if (winPercentage > 45) {
              advantage = Advantage.Balanced;
            } else if (winPercentage > 40) {
              advantage = Advantage.SlightlyLosing;
            } else if (winPercentage > 25) {
              advantage = Advantage.Losing;
            } else if (winPercentage < 25) {
              advantage = Advantage.Nightmare;
            }

            const matchup = {
              opponentName,
              winPercentage,
              plays,
              advantage,
            };

            if (!selectedSet || selectedSet.includes(matchup.opponentName)) {
              acc.push(matchup);
            }

            return acc;
          },
          []
        );

        return acc;
      }, {}),
    [playsData, selectedSet]
  );

  const set = selectedSet ?? data.fighterPlays.map((hero) => hero.name);

  return (
    <DataContext.Provider
      value={{
        set,
        matchupsData,
        playsData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

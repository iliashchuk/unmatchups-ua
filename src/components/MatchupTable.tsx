import { Advantage, MatchupType } from "../types/Matchups";
import { AdvantageType } from "./AdvantageType";
import { Matchup } from "./Matchup";
import "./MatchupTable.css";

type Props = {
  heroName: string;
  matchups: MatchupType[];
};

export const MatchupTable: React.FC<Props> = ({ matchups }) => {
  const matchupsByAdvantage = groupMatchupByAdvantage(matchups);

  return (
    <div className="table">
      {Object.entries(matchupsByAdvantage).map(([advantage, matchups]) => {
        if (!matchups.length) {
          return null;
        }

        return (
          <div key={advantage} className="matchup-type">
            <AdvantageType
              number={matchups.length}
              advantage={advantage as Advantage}
            />
            <div className="matchups-grid">
              {matchups
                .sort((a, b) => b.winPercentage - a.winPercentage)
                .map((matchup) => (
                  <Matchup key={matchup.opponentName} {...matchup} />
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

function groupMatchupByAdvantage(matchups: MatchupType[]) {
  return matchups.reduce<Record<Advantage, MatchupType[]>>(
    (acc, matchup) => {
      acc[matchup.advantage].push(matchup);

      return acc;
    },
    {
      [Advantage.Counter]: [],
      [Advantage.Favoured]: [],
      [Advantage.SlightlyFavoured]: [],
      [Advantage.Balanced]: [],
      [Advantage.SlightlyLosing]: [],
      [Advantage.Losing]: [],
      [Advantage.Nightmare]: [],
      [Advantage.Unknown]: [],
    }
  );
}

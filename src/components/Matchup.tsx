import "./Matchup.css";
import Play from "../assets/play.svg?react";
import Win from "../assets/Win.svg?react";
import { Advantage } from "../types/Matchups";
import { useNavigate } from "react-router-dom";

type Props = {
  opponentName: string;
  winPercentage: number;
  plays: number;
  advantage: Advantage;
};

const AdvantageIndicator: React.FC<{ advantage: Advantage }> = ({
  advantage,
}) => {
  switch (advantage) {
    case Advantage.Counter:
      return <span className="indicator counter">Counter</span>;
    case Advantage.Favoured:
      return <span className="indicator favoured">Favoured</span>;
    case Advantage.SlightlyFavoured:
      return (
        <span className="indicator slightly-favoured">Slightly Favoured</span>
      );
    case Advantage.Balanced:
      return <span className="indicator balanced">Balanced</span>;
    case Advantage.SlightlyLosing:
      return <span className="indicator slightly-losing">Slightly Losing</span>;
    case Advantage.Losing:
      return <span className="indicator losing">Losing</span>;
    case Advantage.Nightmare:
      return <span className="indicator nightmare">Nightmare</span>;
    default:
      return <span className="indicator unknown">Unknown</span>;
  }
};

const Stats: React.FC<{ plays: number; winPercentage: number }> = ({
  plays,
  winPercentage,
}) => (
  <span className="stats">
    <Play /> {plays} <Win /> {winPercentage}%
  </span>
);

export const Matchup: React.FC<Props> = ({
  opponentName,
  winPercentage,
  advantage,
  plays,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/${opponentName}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="matchup"
      style={{
        backgroundImage: `url(/${opponentName.replace(/ /g, "_")}.webp)`,
        objectFit: "contain",
      }}
    >
      <Stats plays={plays} winPercentage={winPercentage} />
      <strong style={{ marginBottom: 12 }}>{opponentName}</strong>
      <AdvantageIndicator advantage={advantage} />
    </div>
  );
};

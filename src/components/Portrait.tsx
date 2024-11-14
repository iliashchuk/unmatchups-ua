import { useNavigate } from "react-router-dom";
import "./Matchup.css";

export const Portrait: React.FC<{ heroName: string }> = ({ heroName }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(/${heroName.replace(/ /g, "_")}.webp)`,
        objectFit: "contain",
      }}
      className="matchup"
      onClick={() => navigate(`/${heroName}`)}
    >
      <strong>{heroName}</strong>
    </div>
  );
};

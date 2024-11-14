import { useNavigate, useParams } from "react-router-dom";

export const HeroSelect: React.FC<{ heroOptions: string[] }> = ({
  heroOptions,
}) => {
  const { hero } = useParams();
  const navigate = useNavigate();

  return (
    <select
      style={{ marginBottom: 20 }}
      value={hero}
      onChange={(e) => navigate(`/${e.target.value}`)}
    >
      {heroOptions.map((heroName) => (
        <option key={heroName} value={heroName}>
          {heroName}
        </option>
      ))}
    </select>
  );
};

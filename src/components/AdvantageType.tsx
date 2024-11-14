import { Advantage } from "../types/Matchups";
import "./AdvantageType.css";

type Props = {
  advantage: Advantage;
  number: number;
};

export const AdvantageType: React.FC<Props> = ({ advantage, number }) => {
  let typeClassname = "unknown-advantage";

  switch (advantage) {
    case Advantage.Counter:
      typeClassname = "counter-advantage";
      break;
    case Advantage.Favoured:
      typeClassname = "favoured-advantage";
      break;
    case Advantage.SlightlyFavoured:
      typeClassname = "slightly-favoured-advantage";
      break;
    case Advantage.Balanced:
      typeClassname = "balanced-advantage";
      break;
    case Advantage.SlightlyLosing:
      typeClassname = "slightly-losing-advantage";
      break;
    case Advantage.Losing:
      typeClassname = "losing-advantage";
      break;
    case Advantage.Nightmare:
      typeClassname = "nightmare-advantage";
      break;
    default:
      typeClassname = "unknown-advantage";
  }

  return (
    <div className={`advantage-type ${typeClassname}`}>
      {advantage} ({number})
    </div>
  );
};

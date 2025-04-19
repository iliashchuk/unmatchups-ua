import { Portrait } from "./Portrait";
import "./MatchupTable.css";
import { HeroSelect } from "./HeroSelect";
import { useData } from "../context/DataContext";

export const HeroGallery: React.FC = () => {
  const { set } = useData();

  return (
    <>
      <HeroSelect heroOptions={set} />
      <div className="matchups-grid">
        {set.map((heroName) => (
          <Portrait key={heroName} heroName={heroName} />
        ))}
      </div>
    </>
  );
};

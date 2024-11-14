import { Portrait } from "./Portrait";
import "./MatchupTable.css";
import { HeroSelect } from "./HeroSelect";

export const HeroGallery: React.FC<{ heroOptions: string[] }> = ({
  heroOptions,
}) => (
  <>
    <HeroSelect heroOptions={heroOptions} />
    <div className="matchups-grid">
      {heroOptions.map((heroName) => (
        <Portrait key={heroName} heroName={heroName} />
      ))}
    </div>
  </>
);

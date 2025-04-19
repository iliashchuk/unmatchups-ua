import React from "react";
import { MatchupTable } from "./MatchupTable";
import { Navigate, useParams } from "react-router-dom";
import { HeroSelect } from "./HeroSelect";
import { useData } from "../context/DataContext";

export const MatchupViewer: React.FC = () => {
  const { matchupsData, set } = useData();
  const { hero } = useParams();

  if (!hero || !matchupsData[hero]) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <HeroSelect heroOptions={set} />
      {hero && <MatchupTable heroName={hero} matchups={matchupsData[hero]} />}
    </>
  );
};

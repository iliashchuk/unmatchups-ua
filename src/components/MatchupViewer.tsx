import React from "react";
import { MatchupTable } from "./MatchupTable";
import { MatchupData } from "../types/Matchups";
import { Navigate, useParams } from "react-router-dom";
import { HeroSelect } from "./HeroSelect";

type Props = { data: MatchupData; heroOptions: string[] };

export const MatchupViewer: React.FC<Props> = ({ data, heroOptions }) => {
  const { hero } = useParams();

  if (!hero || !data[hero]) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <HeroSelect heroOptions={heroOptions} />
      {hero && <MatchupTable heroName={hero} matchups={data[hero]} />}
    </>
  );
};

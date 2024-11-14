import "./App.css";
import { HeroGallery } from "./components/HeroGallery";
import { MatchupViewer } from "./components/MatchupViewer";
import data from "./data.json";
import { MatchupType, MatchupData, Advantage } from "./types/Matchups";
import { PlaysData } from "./types/Plays";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const heroOptions = [
  "Achilles",
  "Alice",
  "Annie Christmas",
  "Beowulf",
  "Bigfoot",
  "Bloody Mary",
  "Dr. Jill Trent",
  "Dracula",
  "Golden Bat",
  "Houdini",
  "Invisible Man",
  "Jekyll & Hyde",
  "King Arthur",
  "Little Red Riding Hood",
  "Medusa",
  "Nikola Tesla",
  "Oda Nobunaga",
  "Robin Hood",
  "Sherlock Holmes",
  "Sinbad",
  "Sun Wukong",
  "The Genie",
  "Tomoe Gozen",
  "Yennenga",
];

const playData = data.fighterPlays.reduce<PlaysData>((acc, heroPlays) => {
  acc[heroPlays.name] = heroPlays.data.reduce<Record<string, number>>(
    (acc, { x: opponentsName, y: plays }) => {
      if (heroOptions.includes(opponentsName)) {
        acc[opponentsName] = plays;
      }

      return acc;
    },
    {}
  );

  return acc;
}, {});

const matchupData = data.name.reduce<MatchupData>((acc, heroMatchup) => {
  acc[heroMatchup.name] = heroMatchup.data.reduce<MatchupType[]>(
    (acc, { x: opponentName, y: winPercentage }) => {
      if (opponentName === heroMatchup.name) {
        return acc;
      }

      const plays = playData[heroMatchup.name][opponentName];

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

      if (heroOptions.includes(matchup.opponentName)) {
        acc.push(matchup);
      }

      return acc;
    },
    []
  );

  return acc;
}, {});

const router = createBrowserRouter([
  {
    path: "/:hero",
    element: <MatchupViewer data={matchupData} heroOptions={heroOptions} />,
  },
  {
    path: "/",
    element: <HeroGallery heroOptions={heroOptions} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

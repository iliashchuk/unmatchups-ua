import "./App.css";
import { HeroGallery } from "./components/HeroGallery";
import { MatchupViewer } from "./components/MatchupViewer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DataContextProvider } from "./context/DataContext";
import useLocalStorage from "use-local-storage";
import { HomeButton } from "./components/HomeButton";

const uaHeroes = [
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

const springSkirmishHeroes = [
  "Achilles",
  "Ancient Leshen",
  "Annie Christmas",
  "Bigfoot",
  "Black Widow",
  "Bloody Mary",
  "Bruce Lee",
  "Ciri",
  "Daredevil",
  "Dr. Jill Trent",
  "Dracula",
  "Eredin",
  "Geralt of Rivia",
  "Golden Bat",
  "Houdini",
  "InGen",
  "Little Red Riding Hood",
  "Moon Knight",
  "Nikola Tesla",
  "Philippa",
  "Raptors",
  "Robin Hood",
  "Sinbad",
  "Sun Wukong",
  "The Genie",
  "The Wayward Sisters",
  "Titania",
  "Tomoe Gozen",
  "Triss",
  "Yennefer",
  "Yennenga",
];

const ladderHeroes = [
  "Bloody Mary",
  "Bruce Lee",
  "Bullseye",
  "Dr. Sattler",
  "Eredin",
  "Houdini",
  "Philippa",
  "Robin Hood",
  "The Genie",
  "The Wayward Sisters",
  "Tomoe Gozen",
  "Yennenga",
];

type Set = "uaHeroes" | "springSkirmishHeroes" | "ladderHeroes";

const sets: Partial<Record<Set, string[]>> = {
  uaHeroes,
  springSkirmishHeroes,
  ladderHeroes,
};

const setLabelMap: Record<Set, string> = {
  springSkirmishHeroes: "Spring Skirmish",
  uaHeroes: "Localized in UA",
  ladderHeroes: "Current Ladder (4.5)",
};

const router = createBrowserRouter([
  {
    path: "/:hero",
    element: <MatchupViewer />,
  },
  {
    path: "/",
    element: <HeroGallery />,
  },
]);

function App() {
  const [selectedSet, setSet] = useLocalStorage<keyof typeof sets>(
    "set",
    "uaHeroes"
  );

  const set = sets[selectedSet];

  return (
    <DataContextProvider selectedSet={set}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <HomeButton />
        <select
          value={selectedSet}
          onChange={(e) => setSet(e.target.value as keyof typeof sets)}
        >
          {(Object.keys(sets) as (keyof typeof sets)[]).map((setKey) => (
            <option key={setKey} value={setKey}>
              {setLabelMap[setKey]}
            </option>
          ))}
        </select>
      </div>
      <RouterProvider router={router} />
    </DataContextProvider>
  );
}

export default App;

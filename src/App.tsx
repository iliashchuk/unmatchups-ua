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
  "Sinbad",
  "Bruce Lee",
  "Bigfoot",
  "Robin Hood",
  "Raptors",
  "InGen",
  "Dracula",
  "Little Red Riding Hood",
  "Achilles",
  "Yennenga",
  "Bloody Mary",
  "Sun Wukong",
  "Moon Knight",
  "Daredevil",
  "Houdini",
  "The Genie",
  "Black Widow",
  "Nikola Tesla",
  "Golden Bat",
  "Dr. Jill Trent",
  "Annie Christmas",
  "Tomoe Gozen",
  "The Wayward Sisters",
  "Titania",
  "Eredin",
  "Ciri",
  "Geralt of Rivia",
  "Ancient Leshen",
  "Triss",
  "Yennefer",
  "Philippa",
];

type Set = "uaHeroes" | "springSkirmishHeroes";

const sets: Partial<Record<Set, string[]>> = {
  uaHeroes,
  springSkirmishHeroes,
};

const setLabelMap: Record<Set, string> = {
  springSkirmishHeroes: "Spring Skirmish",
  uaHeroes: "Localized in UA",
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

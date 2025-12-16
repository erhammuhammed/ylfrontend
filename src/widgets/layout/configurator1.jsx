import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Switch,
  Typography,
  Chip,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
} from "@/context";
import Checkbox from '@mui/material/Checkbox';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export function Configurator1({ currentPage }) {
  const [controller, dispatch] = useMaterialTailwindController();
   const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } =
    controller;
const currentDate = new Date();
  const sidenavColors = {
    white: "from-gray-100 to-gray-100 border-gray-200",
    dark: "from-black to-black border-gray-200",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };

  // Fetch teams on mount
 
  // Add Player form state
  const [playerName, setPlayerName] = React.useState("");
  const [playerEmail, setPlayerEmail] = React.useState("");
  const [playerPhone, setPlayerPhone] = React.useState("");
  const [playerPosition, setPlayerPosition] = React.useState("");
  const [playerTeam, setPlayerTeam] = React.useState("");
  const [fxhomeTeam, setHomeTeam] = React.useState("");
  const [fxawayTeam, setAwayTeam] = React.useState("");
  const [fxtime, setDate] = React.useState("");
  const [fxfinished, setFinished] = React.useState(false);
  const [fxhomeGoals, setHomeGoals] = React.useState("0");
  const [fxawayGoals, setAwayGoals] = React.useState("0");
  const [teams, setTeams] = React.useState(null)
 
        const connectionString = import.meta.env.VITE_API_URL
  // Default form state
  const [settingTitle, setSettingTitle] = React.useState("");
  const [settingValue, setSettingValue] = React.useState("");

   React.useEffect(() => {
    try {
      const stored = localStorage.getItem('teams');
      console.log('What is stored?', stored);
      if (typeof window !== 'undefined') {
        const storedData = localStorage.getItem('teams');
        if (storedData) {
          setTeams(JSON.parse(stored));
        }
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);


  const closeConfigurator = () => setOpenConfigurator(dispatch, false);

  const submitAddPlayer = async (e) => {
    e.preventDefault();
    const formdata = {
      name: playerName,
      email: playerEmail,
      phone: playerPhone,
      position: playerPosition,
      teamId: playerTeam,
    };
    console.log("Add player:", formdata);
    try {
      const res = await fetch(connectionString+"myapp/player/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const resJson = await res.json();
      if (res.status === 200) {
        setPlayerName("");
        setPlayerEmail("");
        setPlayerPhone("");
        setPlayerPosition("");
        setPlayerTeam("");
        console.log("Player added successfully");
        location.reload()
        
      } else {
        location.reload()
        console.error("Error creating player:", resJson);
      }
    } catch (err) {
        location.reload()
      console.error("Error:", err);
    }
  };

  const submitFixture = async (e) => {
    e.preventDefault();
    try {
        const dateString =  dayjs(fxtime).format('YYYY-MM-DD');
      const formdata = {
        homeTeamId: fxhomeTeam,
        awayTeamId: fxawayTeam,
        time: dateString ,
        finished: fxfinished,
        homeGoals: parseInt(fxhomeGoals) || 0,
        awayGoals: parseInt(fxawayGoals) || 0,
      };
      console.log("Fixture data:", formdata);
      const res = await fetch(connectionString+"myapp/match/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const resJson = await res.json();
      if (res.status === 200) {
        setHomeTeam("");
        setHomeGoals("0");
        setAwayTeam("");
        setAwayGoals("0");
        setFinished(false);
        setDate(null);
        console.log("Fixture added successfully");
        closeConfigurator();
        location.reload()
      } else {
        console.error("Error creating fixture:", resJson);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const submitDefault = (e) => {
    e.preventDefault();
    console.log("Save setting:", { settingTitle, settingValue });
    // TODO: replace with real save logic
    closeConfigurator();
  };

  const isAddPlayer = (currentPage || "").toLowerCase().includes("addplayer");
  const isFixtures = (currentPage || "").toLowerCase().includes("fixtures");    
  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform ${
        openConfigurator ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <Typography variant="h6">{isAddPlayer ? "Add Player" : "Configurator"}</Typography>
          <Typography className="text-sm text-gray-500">{isAddPlayer ? "Create a new player" : isFixtures ? "Add a fixture": "Add new team"}</Typography>
        </div>
        <IconButton color="gray" onClick={closeConfigurator}>
          <XMarkIcon className="h-5 w-5" />
        </IconButton>
      </div>

      <div className="p-4 overflow-auto h-[calc(100%-72px)]">
        {isAddPlayer && !isFixtures? (
          <form onSubmit={submitAddPlayer} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="mt-1 block w-full rounded border px-3 py-2"
                placeholder="Player name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={playerPhone}
                onChange={(e) => setPlayerPhone(e.target.value)}
                className="mt-1 block w-full rounded border px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
               <select 
                value={playerPosition} 
                name="position" 
                onChange={(e) => setPlayerPosition(e.target.value)}
                className="mt-1 block w-full rounded border px-3 py-2"
                required >
                    <option disabled value="">Select...</option>
                    <option value="GK">Goal Keeper</option>
                    <option value="DEF">Defence</option>
                    <option value="MID">Midfielder</option>
                    <option value="ST">Forward</option>
                </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Team</label>
              <select
                value={playerTeam}
                onChange={(e) => setPlayerTeam(e.target.value)}
                className="mt-1 block w-full rounded border px-3 py-2"
                required
              >
                <option value="">Select a team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Add Player</Button>
            </div>
          </form>
        ) : !isAddPlayer && !isFixtures?(
          <form onSubmit={submitDefault} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Add team</label>
              <input
                value={settingTitle}
                onChange={(e) => setSettingTitle(e.target.value)}
                className="mt-1 block w-full rounded border px-3 py-2"
                placeholder="Example: Notifications"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                value={settingValue}
                onChange={(e) => setSettingValue(e.target.value)}
                className="mt-1 block w-full rounded border px-3 py-2"
                placeholder="On / Off / Custom"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save</Button>
            </div>
          </form>
        ):( <form onSubmit={submitFixture} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Home</label>
              <select
                value={fxhomeTeam}
                onChange={(e) => setHomeTeam(e.target.value)}
                className="mt-1 block w-full rounded border px-3 py-2"
                required
              >
                <option value="">Select team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Home team goals</label>
              <input
                value={fxhomeGoals}
                onChange={(e) => setHomeGoals(e.target.value)}
                className="mt-1 block w-full rounded border px-3 py-2"
                placeholder="Home"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Away</label>
              <select
                value={fxawayTeam}
                onChange={(e) => setAwayTeam(e.target.value)}
                className="mt-1 block w-full rounded border px-3 py-2"
                required
              >
                <option value="">Select team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700">Away team goals</label>
              <input
                value={fxawayGoals}
                onChange={(e) => setAwayGoals(e.target.value)}
                className="mt-1 block w-full rounded border px-3 py-2"
                placeholder="Away"
                required
              />
            </div>
            <div>
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Date" onChange={(date) => setDate(date)}/>
                 </LocalizationProvider>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Match finished?</label>
                <Checkbox
                    checked={fxfinished}
                    onChange={(e) => setFinished(e.target.checked)}
                    slotProps={{
                        input: { 'aria-label': 'controlled' },
                    }}
                    />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save</Button>
            </div>
          </form>)}
      </div>
    </div>
  );
}

Configurator1.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator1;

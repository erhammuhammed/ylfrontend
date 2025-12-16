import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
} from "@material-tailwind/react";

import { MdExpandMore } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import React, { useState, useEffect } from 'react';

    

         // Empty dependency array ensures the effect runs only once on mount

export function Fixtures() {
  const [tableData, setTableData] = useState(null);
  const [editOpen, setEditOpen] = useState(0);
  const [matchData, setMatchData] = useState(null);
  const [rowExpanded,setRowExpanded] = useState(false);
  const [expandedRowId,setExpandedRowId] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    const [matchTeams, setMatchTeams] = useState([]);
    const [players, setPlayers] = useState([]);
      const [thisMatchId, setThisMatchId] = React.useState(0);
      const [playerId, setPlayerId] = React.useState(0);
      const [goal, setGoal] = React.useState(false);
      const [assist, setAssist] = React.useState(false);
         const [cleansheet, setCleansheet] = React.useState(false);

        const connectionString = import.meta.env.VITE_API_URL
        const handleEditOpen = (data) => {
          console.log("edit clicekd"+data)
          setRowExpanded(false);
          if(editOpen==data.matchid){
            setEditOpen(0);
          } else {
            
            setEditOpen(data.matchId);
          }
        }
         const TableRow = ({ className,rowData, isExpanded, onClick }) => (
  <> 
  <tr>
    <td></td>
    <td className={className}>
                        <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {rowData.time}
                            </Typography>
                      </td>
                      <td></td>
  </tr>
   <tr  style={{ cursor: 'pointer' }}>
                      <td className={className}>
                        <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {rowData.homeTeam}
                            </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {rowData.home_goals}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {rowData.finished ? "FT" : "HT"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {rowData.away_goals}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {rowData.awayTeam}
                            </Typography>
                      </td>
                      <td>
                        <button onClick={e=>handleEditOpen(rowData)}>
                          <MdEdit />
                        </button>
                      </td>
                      <td>
                        <button onClick={e=>handleRowClick(rowData.matchId)}>
                          <MdExpandMore />
                        </button>
                      </td>
    </tr>
    {<tr>
      {editOpen == rowData.matchId ? (
                         <td className={className}>
                           <form onSubmit={submitScoreUpdate} className="space-y-4">
                             <div>
                               <label className="block text-sm font-medium text-gray-700">Player</label>
                               <select
                                 value={playerId}
                                 onChange={(e) => setPlayerId(e.target.value)}
                                 className="mt-1 block w-full rounded border px-3 py-2"
                                 required
                               >
                                 <option value="">Select player</option>
                                 {players.map((player) => (
                                   <option key={player.id} value={player.id}>
                                     {player.name}
                                   </option>
                                 ))}
                               </select>
                               <FormControlLabel
                                 value="end"
                                 control={<Checkbox onChange={(e) => setGoal(e.target.checked)} checked={goal} />}
                                 label="Goal"
                                 labelPlacement="end"
                               />
                               <FormControlLabel
                                 value="end"
                                 control={<Checkbox onChange={(e) => setAssist(e.target.checked)} checked={assist} />}
                                 label="Assist"
                                 labelPlacement="end"
                               />
                               <FormControlLabel
                                 value="end"
                                 control={<Checkbox checked={cleansheet} onChange={(e) => setCleansheet(e.target.checked)} />}
                                 label="Cleansheet"
                                 labelPlacement="end"
                               />
                               <Button type="submit">Save</Button>
                             </div>
                           </form>
                         </td>) : null}
      </tr>} {expandedRowId==rowData.matchId && matchData!=null? <>{matchData.map((match) => (
                                   <>
                                   <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {match.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {match.goalscored}
                        </Typography>
                      </td>
                                   </>
                                 ))}</>: null}
  </>
);

    

  useEffect( () => {
      try {
                const playerresponse =  fetch(connectionString+'myapp/player/getAll',{
          method: 'GET', // Or 'POST', 'PUT', 'DELETE', etc.
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_AUTH_TOKEN', // Example for an authorization token
            'Custom-Header': 'My-Custom-Value', // Example for a custom header
          }}).then(res => res.json())
            .then(json => { setPlayers(json); localStorage.setItem('players', JSON.stringify(json))});
            } catch (err) {
                console.log("error::"+err);
                setError(err);
            } finally {
                setLoading(false);
            }
        const fetchData = async () => {
            try {
                const response = await fetch(connectionString+'myapp/match/fixture',{
          method: 'GET', // Or 'POST', 'PUT', 'DELETE', etc.
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_AUTH_TOKEN', // Example for an authorization token
            'Custom-Header': 'My-Custom-Value', // Example for a custom header
          }}).then(res => res.json())
            .then(json => setTableData(json));
            } catch (err) {
                console.log("error::"+err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
const handleRowClick = async (rowId) => {
  console.log("row clicekd")
    setEditOpen(0);
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
    setThisMatchId(rowId);
    const response = await fetch(connectionString+'myapp/match/details?matchId='+rowId,{
          method: 'GET', // Or 'POST', 'PUT', 'DELETE', etc.
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_AUTH_TOKEN', // Example for an authorization token
            'Custom-Header': 'My-Custom-Value', // Example for a custom header
          }}).then(res => res.json())
            .then(json => setMatchData(json));
  };
  const submitScoreUpdate = async (e) => {
     e.preventDefault();
        try {
          const formdata = {
            matchId: editOpen,
            playerId: playerId,
            goal: goal ,
            assist: assist,
            cleansheet: cleansheet,
          };
          console.log("Fixture data:", formdata);
          const response = await fetch(connectionString+'myapp/match/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Inform the API the data is JSON
        },
        body: JSON.stringify(formdata), // Convert the form data state to a JSON string
      });
      if(response!=null) {
        console.log("OK");
        location.reload()
      } else {
        console.log("error")
      }
        } catch (err) {
          console.error("Error:", err);
        }
  };
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!loading && tableData!=null)  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Fixtures
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <tbody>
              {tableData.map(({matchId, homeTeam,	awayTeam,	time,	finished,	home_goals,	away_goals}, key) => {
                 const className = `py-3 px-5 ${
                    key === tableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;
                 return (
                    <TableRow
                    className
            key={matchId}
            rowData={{matchId, homeTeam,	awayTeam,	time,	finished,	home_goals,	away_goals}}
            isExpanded={matchId!=null && expandedRowId === matchId}
          />
                  );
              })
              }
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Fixtures;
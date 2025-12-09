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
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import React, { useState, useEffect } from 'react';

    

         // Empty dependency array ensures the effect runs only once on mount

export function Fixtures() {
  const [tableData, setTableData] = useState(null);
  const [rowExpanded,setRowExpanded] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [teams, setTeams] = useState([]);
  useEffect(() => {
    try {
        const teamresponse = fetch("http://192.168.29.45:8088/myapp/teams/getAll",{
          method: 'GET', // Or 'POST', 'PUT', 'DELETE', etc.
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_AUTH_TOKEN', // Example for an authorization token
            'Custom-Header': 'My-Custom-Value', // Example for a custom header
          }}).then(res => res.json()).then(json => {  localStorage.setItem('teams', JSON.stringify(json));});
        const data = response.json();
         console.info("teams", data);
        setTeams(data || []);
      } catch (err) {
        console.error("Error fetching teams:", err);
        setTeams([]);
      }
      try {
                const playerresponse =  fetch('http://192.168.29.45:8088/myapp/player/getAll',{
          method: 'GET', // Or 'POST', 'PUT', 'DELETE', etc.
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_AUTH_TOKEN', // Example for an authorization token
            'Custom-Header': 'My-Custom-Value', // Example for a custom header
          }}).then(res => res.json())
            .then(json => {  localStorage.setItem('players', JSON.stringify(json))});
            } catch (err) {
                console.log("error::"+err);
                setError(err);
            } finally {
                setLoading(false);
            }
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.29.45:8088/myapp/match/fixture',{
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
     const handleClick = () => {
    setRowExpanded(!rowExpanded);
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
              {tableData.map(({ homeTeam,	awayTeam,	time,	finished,	home_goals,	away_goals}, key) => {
                 const className = `py-3 px-5 ${
                    key === tableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;
                 return (
                    <div  onClick={handleClick}>
                       <tr key={homeTeam}>
                      <td className={className}>
                        <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {time}
                            </Typography>
                      </td>
                    </tr>
                      <tr key={homeTeam}>
                      <td className={className}>
                        <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {homeTeam}
                            </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {home_goals}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {finished ? "FT" : "NS"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {away_goals}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {awayTeam}
                            </Typography>
                      </td>
                      <td className={className}>
                        <Button>Update</Button>
                      </td>
                    </tr>
                    {rowExpanded?(<tr key={homeTeam}>
                      <td className={className}>
                        <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {time}
                            </Typography>
                      </td>
                    </tr>):null}
                    </div>
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
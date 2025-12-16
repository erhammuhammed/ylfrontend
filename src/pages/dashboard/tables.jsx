import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import React, { useState, useEffect } from 'react';

    

         // Empty dependency array ensures the effect runs only once on mount

export function LeagueTables() {
  const [tableData, setTableData] = useState(null);
  
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log("log base url"+import.meta.env.BASE_URL)
        const connectionString = 'https://ylbackend.greensky-cbe2d3e4.southindia.azurecontainerapps.io/'
  useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(connectionString+'myapp/leagues/getTable',{
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
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!loading && tableData!=null)  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            League Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Pos","Team", "Played","Points", "W-D-L", "GF", "GA", "GD"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map(({ teamName,	pos,	games,	wins,	draws,	loss,	points,	ga,	gf,	gd }, key) => {
                 const className = `py-3 px-5 ${
                    key === tableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;
                 return (
                    <tr key={teamName}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {pos}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {teamName}
                            </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {games}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {points}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {wins}-{draws}-{loss}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {gf}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {ga}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {gd}
                        </Typography>
                      </td>
                    </tr>
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

export default LeagueTables;

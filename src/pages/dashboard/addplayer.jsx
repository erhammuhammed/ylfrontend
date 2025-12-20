import React, { useState, useEffect } from 'react';
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export function AddPlayer() {
  const [playersData, setPlayersData] = useState(null);
     const connectionString = import.meta.env.VITE_API_URL
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
useEffect(() => {
  try {
      const stored = localStorage.getItem('players');
      console.log('What is stored?', stored);
      if (typeof window !== 'undefined') {
        const storedData = localStorage.getItem('players');
        if (storedData) {
          setPlayersData(JSON.parse(stored));
        }
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
    }, []);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!loading && playersData!=null)  return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
          <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
              <Typography variant="h6" color="white">
                Players
              </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["SI","Name", "Team","Phone", "Position"].map((el) => (
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
                  {playersData.map(({ team,	position,	phone,	name}, key) => {
                     const className = `py-3 px-5 ${
                        key === playersData.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;
                     return (
                        <tr key={team}>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {key+1}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {name}
                                </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {team}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {phone}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {position}
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

export default AddPlayer;
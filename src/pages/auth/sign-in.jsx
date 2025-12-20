import React from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";


export function SignIn() {
  const navigate = useNavigate()
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const connectionString = 'https://ylbackend.greensky-cbe2d3e4.southindia.azurecontainerapps.io/'
   const submitSignIn = async (e) => {
    console.log("Signin dataaaa:")
    e.preventDefault();
    const formdata = {
      username: username,
      password: password
    };
    console.log("Signin data:", formdata);
    try {
      const res = await fetch(connectionString+"myapp/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      if (res.status === 200) {
        console.log("Signed in successfully");
        localStorage.setItem("user","admin")
        navigate('/dashboard/home');
        
      } else {
        console.error("Error creating player:", res);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form onSubmit={submitSignIn} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <input
              onChange={(e) => setUserName(e.target.value)}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Sign In
          </Button>
        </form>

      </div>

  );
}

export default SignIn;

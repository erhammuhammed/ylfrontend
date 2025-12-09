import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserIcon
} from "@heroicons/react/24/solid";
import {  LeagueTables,  AddPlayer, Fixtures  } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "table",
        path: "/home",
        element: <LeagueTables />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "fixtures",
        path: "/fixtures",
        element: <Fixtures />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "Players",
        path: "/addplayer",
        element: <AddPlayer />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <AddPlayer />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;

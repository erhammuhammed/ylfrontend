import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { IoIosFootball } from "react-icons/io";
import { IoShieldSharp,IoShirtSharp } from "react-icons/io5";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: IoIosFootball,
    title: "Leagues",
    value: "1",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: IoShieldSharp,
    title: "Teams",
    value: "6",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: IoShirtSharp,
    title: "Players",
    value: "60",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Goals",
    value: "18",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;

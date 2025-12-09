import { Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { MdAssignmentAdd } from "react-icons/md";

import { MdOutlineAddModerator } from "react-icons/md";

import { RiUserAddFill  } from "react-icons/ri";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator1,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  console.log("currentpage::"+window.location.href)
  const [currentpage, setCurrentPage] = useState('');
  const [configPage, setConfigPage] = useState('');
  const location = useLocation();
  const pagePath = location.pathname;
  const pageName = pagePath.split('/').filter(Boolean).pop() || 'home';
  const { sidenavType } = controller;
  useEffect(() => {
    setCurrentPage(pagePath);
  }, [pagePath]);
  return (
    
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator1 currentPage={configPage} />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => {
            setConfigPage(pageName);
            setOpenConfigurator(dispatch, true);
          }}
        >
          {currentpage.includes("addplayer") ? (
            <RiUserAddFill className="h-5 w-5" />
          ) : currentpage.includes("fixtures")?(  <MdAssignmentAdd className="h-5 w-5" />
          ): (
            <MdOutlineAddModerator className="h-5 w-5" />
          )}
        </IconButton>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;

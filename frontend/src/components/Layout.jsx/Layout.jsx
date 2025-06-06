import React, { useState } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
   <div className="flex h-screen overflow-hidden">
  <SideBar open={sidebarOpen} setOpen={setSidebarOpen} />

  <div className="flex flex-col flex-1 overflow-x-hidden min-h-0">
    <TopBar onToggleSidebar={() => setSidebarOpen(true)} />

    <main className={`flex-1 overflow-auto bg-auto  p-6 min-h-0 md:ml-64` }>
      <Outlet />
    </main>
  </div>
</div>

  );
};

export default Layout;

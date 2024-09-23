import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import ConfirmLogoutModal from "../components/Modal/ConfirmLogoutModal";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const MainRoutes = () => {
  const [showConfirmLogout, setShowConfirmLogout] = useState(false); 

  
  return ( 
    <div className="flex bg-gray-100 min-h-screen max-h-full">
      <Sidebar onLogoutClick={() => setShowConfirmLogout(true)} />
      <div className="flex-1 ml-[20rem]">
        <Navbar />
        <Outlet/>
      </div>

      {showConfirmLogout && (
          <ConfirmLogoutModal
            onCancel={() => setShowConfirmLogout(false)}
          />
      )}
    </div>
  );
}
 
export default MainRoutes;
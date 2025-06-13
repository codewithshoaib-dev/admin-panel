import { FaSignOutAlt, FaBars } from "react-icons/fa";
import toast  from "react-hot-toast";
import useAuthStore from "../../services/useAuthStore";

import { logout } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

 const TopBar = ({ onToggleSidebar }) => {

  const {user} = useAuthStore();

   const navigate = useNavigate()


    
  const confirmLogout = () => {
    toast.custom((t) => (
      <div
        className={`flex items-center gap-4 p-4 rounded-lg shadow-lg bg-neutral-800 border border-neutral-700 text-white ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <div className="flex flex-col">
          <span className="font-semibold">Confirm Logout?</span>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                logout(navigate);
              }}
              className="px-3 py-1 text-sm bg-teal-500 hover:bg-teal-600 rounded"
            >
              Yes
            </button>
            <button
              onClick={() => toast.remove(t.id)}
              className="px-3 py-1 text-sm bg-neutral-600 hover:bg-neutral-500 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-neutral-900 border-b border-neutral-800 md:ml-64">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-xl p-2 rounded-lg bg-neutral-800 text-white"
        >
          <FaBars />
        </button>
        <div className="text-lg font-semibold text-white tracking-tight">Dashboard</div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-md text-white">{user?.username || "Ghost"}</span>
        <button
          onClick={confirmLogout}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
};

export default TopBar
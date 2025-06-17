import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../services/useAuthStore";
import useAuthOnLoad from "../services/useAuthonLoad";
import Loader from "./Loader";

function ProtectedRoute() {
  useAuthOnLoad();
  
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
 

  if (loading) return <Loader />;

  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
}


export default ProtectedRoute;

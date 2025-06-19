import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../services/useAuthStore";
import useAuthOnLoad from "../services/useAuthonLoad";
import Loader from "./Loader";

function AdminRoutes() {
  useAuthOnLoad()

  const { user, loading } = useAuthStore();
 
  if (loading) return <Loader />; 

  if (!user) return <Navigate to="/login"/>;
 

  if (user.role !== 'OWNER' && user.role !== 'ADMIN' && !user.is_superuser)
  return <Navigate to="/unauthorized" />


  return <Outlet />;
}

export default AdminRoutes;

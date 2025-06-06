import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../services/useAuthStore";
import useAuthOnLoad from "../services/useAuthonLoad";
import Loader from "./Loader";

function ProtectedRoute() {
  useAuthOnLoad()
  const { user, loading } = useAuthStore();
 
   
  if (loading) return <Loader />; 

  if (!user) return <Navigate to="/login"/>;
  console.log('wrapper called!')

  return <Outlet />;
}

export default ProtectedRoute;

import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
    const location = useLocation();

        if (loading) {
          return (
            <div className="w-full h-screen flex justify-center items-center">
              <span className="loading loading-ring loading-lg w-64"></span>
            </div>
          );
        }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
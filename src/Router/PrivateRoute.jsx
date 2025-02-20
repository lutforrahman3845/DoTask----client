import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth";
import Loading from "../Component/Loading";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (user) {
    return children;
  }

  return <Navigate to="/signIn"></Navigate>;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;

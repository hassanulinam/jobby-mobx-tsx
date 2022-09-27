import Cookies from "js-cookie";
import { observer } from "mobx-react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props: any) => {
  const accessToken = Cookies.get("jwt_token");
  if (accessToken === undefined) return <Redirect to="/login" />;
  return <Route {...props} />;
};

export default observer(ProtectedRoute);

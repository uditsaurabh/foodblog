import React from "react";
import withAdminRouteGuard from "../../../HOC/withAdminRouteGuard";

const DashboardUser = () => {
  return <div>Dashboard User</div>;
};

export default withAdminRouteGuard(DashboardUser);

import React from "react";
import withAdminRouteGuard from "../../../HOC/withAdminRouteGuard";

const DashboardAdmin = () => {
  return <div>Dashboard Admin</div>;
};

export default withAdminRouteGuard(DashboardAdmin);

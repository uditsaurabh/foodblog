import Link from "next/link";
const withAdminRouteGuard = (WrappedComponents) => () => {
  console.log("the link guard is called");
  console.log(process.browser);
  if (process.browser) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (
      (WrappedComponents.name === "DashboardUser" && user.role === 0) ||
      (WrappedComponents.name === "DashboardAdmin" && user.role === 1)
    ) {
      return <WrappedComponents />;
    } else {
      return <Link href="/">Not Authorized</Link>;
    }
  }
  return null;
};
export default withAdminRouteGuard;

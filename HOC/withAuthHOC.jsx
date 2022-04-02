import React, { useEffect } from "react";

import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
const withAuthHOC = (WrappedComponents) => () => {
  const [{ token }, _] = useCookies();
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push("/");
    }
  });
  if (!token) {
    return <WrappedComponents />;
  } else {
    return <h1>Not ALLOWED</h1>;
  }
};

export default withAuthHOC;

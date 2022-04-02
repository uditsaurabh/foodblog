import { Typography } from "@material-ui/core";
import Link from "next/link";
import React from "react";

const CustomLink = ({ href = "/", linkText }) => {
  return (
    <Link href={href}>
      <Typography variant="h6">{linkText}</Typography>
    </Link>
  );
};

export default CustomLink;

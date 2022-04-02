import { Box, Card, Container, Paper } from "@material-ui/core";
import React from "react";

/* sx={{
    padding: "10px",
    height: "50%",
    width: "40%",
    backgroundColor: "red",
  }}
  */
const ModalForm = React.forwardRef(({ children }, ref) => {
  return (
    <Container>
      <Box
        ref={ref}
        component="form"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <Card variant="outlined">{children}</Card>
      </Box>
    </Container>
  );
});

export default ModalForm;

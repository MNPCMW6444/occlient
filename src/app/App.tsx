import { useState, useEffect, useContext } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { MainserverContext } from "@failean/mainserver-provider";

const App = () => {
  const [status, setStatus] = useState("pending");

  const mainServer = useContext(MainserverContext);

  useEffect(() => {
    const check = async () => {
      if(mainServer) {
        const { axiosInstance } = mainServer;
        try {
          const { data } = await axiosInstance.get("/areyoualive");
          setStatus(data.answer === "yes" ? "working" : "not working");
        } catch (e) {
          setStatus("not working");
        }
      }
    };
    check();
  }, [mainServer]);

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography>Hello</Typography>
      </Grid>

      <Grid item>
        <Box
          bgcolor={
            status === "working"
              ? "green"
              : status === "pending"
              ? "yellow"
              : "red"
          }
          height="100px"
          width="500px"
        >
          Server status is {status}
        </Box>
      </Grid>
    </Grid>
  );
};

export default App;

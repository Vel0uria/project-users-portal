import React from "react";
import { AppBar, Box, Toolbar, IconButton } from "@material-ui/core";
import {
  ExitToApp,
  NotificationsActiveTwoTone,
  InboxTwoTone
} from "@material-ui/icons";
function NavBar() {
  return (
    //  <Box sx={{ display: "flex" }}>
    <AppBar position="static" color="default">
      <Toolbar>
        <IconButton>
          <InboxTwoTone />
        </IconButton>
        <IconButton>
          <NotificationsActiveTwoTone />
        </IconButton>
        <IconButton>
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
    //  </Box>
  );
}
export default NavBar;

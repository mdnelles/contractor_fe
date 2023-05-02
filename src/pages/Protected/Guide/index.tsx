import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3RoundedIcon from "@mui/icons-material/Looks3Rounded";
import Looks4RoundedIcon from "@mui/icons-material/Looks4Rounded";
import Looks5RoundedIcon from "@mui/icons-material/Looks5Rounded";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

export default function FolderList() {
  return (
    <>
      <Chip label="C : Create" variant="outlined" sx={{ m: 1 }} />
      <Chip label="R: Read" variant="outlined" sx={{ m: 1 }} />
      <Chip label="U: Update" variant="outlined" sx={{ m: 1 }} />
      <Chip label="D: Delete" variant="outlined" sx={{ m: 1 }} />
      <Grid container>
        <Grid item xs={12} md={6} sx={{ p: 1 }}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemAvatar></ListItemAvatar>
              <ListItemText primary="User Levels" secondary="" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LooksOneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Super Admin"
                secondary="CRUD all other member types"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LooksTwoIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Store Manager"
                secondary="CRUD Level 3 and level 4"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Looks3RoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Order Picker"
                secondary="RU from the orders database"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Looks4RoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Delivery & or Contractor"
                secondary="Execute the deliver +/ Contract"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Looks5RoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Client" secondary="CR own orders" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6} sx={{ p: 1 }}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemAvatar></ListItemAvatar>
              <ListItemText primary="Card or Contract Levels" secondary="" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LooksOneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="New Order"
                secondary="Client has requested a new order"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LooksTwoIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Picked Order"
                secondary="Order Picker has assemlbed the order"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Looks3RoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary=" Order Delivered"
                secondary="Contractor has delivered the order"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Looks4RoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Work started"
                secondary="Unless it is just a delivery"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Looks5RoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Life Cycle completed"
                secondary="Clients signed goods/services finished"
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}

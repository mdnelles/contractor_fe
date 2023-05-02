import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ProfileNav from "./components/ProfileNav";
import Trans from "../../widgets/Trans";

interface AppBarTopProps {
  drawerWidth?: any;
  toggleDrawer?: any;
  propsopen?: boolean;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBarTop = (props: AppBarTopProps): JSX.Element => {
  const { drawerWidth, toggleDrawer, propsopen } = props;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <>
      <AppBar position="absolute" open={propsopen} enableColorOnDark>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          {!propsopen ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : null}

          <div className="logo">
            <Trans txt="Dashboard" />
          </div>
          <div style={{ float: "right" }}>
            <ProfileNav />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

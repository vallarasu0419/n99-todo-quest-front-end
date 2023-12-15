import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavConfig } from "./NavConfig";
import { Outlet, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Popover } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { cookies } from "../Api";

const DashboardSidebar = () => {
  const drawerWidth = 300;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openSubMenu, setOpenSubMenu] = React.useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "avatar-popover" : undefined;
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleNav = (nav, index) => {
    if (NavConfig[index]?.subItems) {
      setOpenSubMenu(openSubMenu === index ? null : index);
    } else {
      navigate(nav);
    }
  };
  const name = cookies.get("name");
  const email = cookies.get("email");

  const drawer = (
    <div>
      <div style={{ position: "relative", top: "30px", left: "25px" }}>
        <Typography variant="h5" sx={{ fontWeight: "500" }}>
          DiscussHub Chats
        </Typography>
      </div>
      <Toolbar />
      <Divider />
      <List>
        {NavConfig.map((text, index) => (
          <div key={text.name}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNav(text.path, index)}>
                <ListItemIcon sx={{ color: "white" }}>{text.icon}</ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>

            {index === openSubMenu &&
              text.subItems &&
              text.subItems.map((subItem, subIndex) => (
                <ListItem key={subItem.name} sx={{ pl: 4 }}>
                  <ListItemButton onClick={() => navigate(subItem.path)}>
                    <ListItemIcon sx={{ color: "white" }}>
                      {subItem.icon}
                    </ListItemIcon>
                    <ListItemText primary={subItem.name} />
                  </ListItemButton>
                </ListItem>
              ))}
          </div>
        ))}
      </List>
    </div>
  );
  return (
    <>
      <Box sx={{ display: "flex", width: "100%" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            background: "#6d75c5",
            display: "flex",
            justifyContent: "space-between",
            padding: "8px",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Avatar
              sx={{ width: 56, height: 56 }}
              aria-describedby={id}
              onClick={handleAvatarClick}
            >
              {name}
            </Avatar>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box component="section" sx={{ p: 2, border: "ActiveBorder" }}>
                <Typography variant="body1"> {email}</Typography>
              </Box>
              <Divider sx={{ color: "black" }} />
              <Box component="section" sx={{ p: 1, border: "ActiveBorder" }}>
                <Typography
                  sx={{ textAlign: "center", fontSize: "18px" }}
                  onClick={() => {
                    cookies.remove("name");
                    cookies.remove("email");
                    navigate("/");
                  }}
                >
                  <Button>
                    Logout &nbsp;&nbsp;&nbsp;&nbsp;
                    <LogoutIcon sx={{ color: "black", fontSize: "18px" }} />
                  </Button>
                </Typography>
              </Box>
            </Popover>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                background: "#6d75c5",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                background: "#6d75c5",
                color: "white",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default DashboardSidebar;

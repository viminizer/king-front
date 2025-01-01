import React from "react";
import { AppBar, Toolbar, Box, Badge, IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";
import {
  Search as SearchIcon,
  ShoppingBag as ShoppingBagIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import "./header.css";

const Header = () => {
  const history = useHistory();
  /**HANDLERS*/
  const loginHandler = () => {
    history.push("login");
  };
  return (
    <AppBar position="fixed" className="site-header">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Logo Section */}
        <Box>
          <img
            src="/icons/burak.svg"
            alt="Logo"
            style={{ maxWidth: "160px" }}
          />
        </Box>

        {/* Navigation Links */}
        <Box component="nav" className="nav-links">
          {["Home", "About", "Menu", "Gallery", "Blog", "Contact"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link"
              >
                {item}
              </a>
            ),
          )}
        </Box>

        {/* Header Right Section */}
        <Box className="header-right">
          {/* Cart Icon */}
          <IconButton className="icon-btn">
            <Badge badgeContent={3} classes={{ badge: "cart-number" }}>
              <ShoppingBagIcon sx={{ color: "#ff8243" }} />
            </Badge>
          </IconButton>

          {/* User Icon */}
          <IconButton className="icon-btn" >
            <PersonIcon sx={{ color: "#ff8243" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

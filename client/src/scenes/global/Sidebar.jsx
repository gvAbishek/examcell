import React, { useContext } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { ColorModeContext, tokens } from "../../theme";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  
  // Determine the color of the icons and text based on the current color mode
  const iconColor = colorMode === "light" ? "black" : "white";
  const textColor = colorMode === "light" ? "black" : "white";

  // You can customize the links and icons as needed
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="200px" // Adjust the width as per your design
      bgcolor={colors.primary[400]}
      height="200vh"
      // position="fixed"
      boxShadow={theme.palette.mode === "dark" ? 0 : 1}
    >
      {/* User Info */}
      <Box p={9} textAlign="center">
        {/* Your user image component can go here */}
        <img src="./icon.svg" alt="User" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
        <Typography variant="body2" color={textColor}>
  <h1 style={{ fontFamily: 'sans-serif' }}>Hello! ADMIN</h1>
</Typography>

      </Box>
      
      {/* Sidebar Links */}
      <Box display="flex" flexDirection="column" alignItems="center" flexGrow={-1}>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
            
          <IconButton>
            <HomeOutlinedIcon style={{ color: iconColor }} />
          </IconButton>
          <Typography variant="body2" color={textColor}>
            <h2>Home</h2>
          </Typography>
        </Link>
        <Link to="/AddProduct" style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton>
            <AddCircleOutlineOutlinedIcon style={{ color: iconColor }} />
          </IconButton>
          <Typography variant="body2" color={textColor}>
            <h2>Sale</h2>
          </Typography>
        </Link>
        <Link to="/SellProduct" style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton>
            <MonetizationOnOutlinedIcon style={{ color: iconColor }} />
          </IconButton>
          <Typography variant="body2" color={textColor}>
            <h2>Issue</h2>
          </Typography>
        </Link>
        <Link to="/Calendar" style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton>
            <CalendarTodayOutlinedIcon style={{ color: iconColor }} />
          </IconButton>
          <Typography variant="body2" color={textColor}>
            <h2>Dates</h2>
          </Typography>
        </Link>
      </Box>
      
      {/* Profile Link */}
      {/* <Box pb={2} textAlign="center">
        <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton>
            <PersonOutlinedIcon style={{ color: iconColor }} />
          </IconButton>
          <Typography variant="body2" color={textColor}>
            <h2>User Management</h2>
          </Typography>
        </Link>
      </Box> */}
    </Box>
  );
};

export default Sidebar;

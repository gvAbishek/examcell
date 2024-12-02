import { Box, IconButton, useTheme, Button, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DataThresholdingSharpIcon from '@mui/icons-material/DataThresholdingSharp';
import TrendingDownSharpIcon from '@mui/icons-material/TrendingDownSharp';
import RecyclingSharpIcon from '@mui/icons-material/RecyclingSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const showSwal = () => {
    Swal.fire({
      title: "There Is No Notifications Currently",
      icon: "info"
    });
  };

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, LogOut!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logout",
          text: "Successfully!.",
          icon: "success"
        }).then(() => {
          window.location.href = "/";
        });
      }
    });
  };

  const set = () => {
    Swal.fire({
      title: "This is Settings section",
      icon: "warning"
    });
  };

  const handleDownloadReports = () => {
    axios.post('http://localhost:3002/export')
      .then(response => {
        // Create a blob from the CSV content
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element and click it to trigger download
        const a = document.createElement('a');
        a.href = url;
        Swal.fire({
          title: "Do you want to Download",
          text: "Current Holdings?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then((result) => {
          if (result.isConfirmed) {
            a.download = 'products.csv';
            document.body.appendChild(a);
            a.click();
    
            // Clean up
            window.URL.revokeObjectURL(url);
            Swal.fire({
              title: "The CSV file downloaded",
              text: "Successfully!",
              icon: "success"
            })
          }
        });

        
      })
      .catch(error => {
        console.error("Error downloading reports:", error);
      });
  };

  const handleDownloadIssuance = () => {
    axios.post('http://localhost:3002/exportissuance')
      .then(response => {
        // Create a blob from the CSV content
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element and click it to trigger download
        const a = document.createElement('a');
        a.href = url;
        Swal.fire({
          title: "Do you want to Download",
          text: "Issuance History?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then((result) => {
          if (result.isConfirmed) {
            a.download = 'issuance.csv';
            document.body.appendChild(a);
            a.click();
    
            // Clean up
            window.URL.revokeObjectURL(url);
            Swal.fire({
              title: "The CSV file downloaded",
              text: "Successfully!",
              icon: "success"
            })
          }
        });

        
      })
      .catch(error => {
        console.error("Error downloading reports:", error);
      });
  };

  const handleDownloadupdate = () => {
    axios.post('http://localhost:3002/exportupdate')
      .then(response => {
        // Create a blob from the CSV content
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element and click it to trigger download
        const a = document.createElement('a');
        a.href = url;
        Swal.fire({
          title: "Do you want to Download",
          text: "Update History?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then((result) => {
          if (result.isConfirmed) {
            a.download = 'update.csv';
            document.body.appendChild(a);
            a.click();
    
            // Clean up
            window.URL.revokeObjectURL(url);
            Swal.fire({
              title: "The CSV file downloaded",
              text: "Successfully!",
              icon: "success"
            })
          }
        });

        
      })
      .catch(error => {
        console.error("Error downloading reports:", error);
      });
  };
  const handleDownloaddelete = () => {
    axios.post('http://localhost:3002/exportdelete')
      .then(response => {
        // Create a blob from the CSV content
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element and click it to trigger download
        const a = document.createElement('a');
        a.href = url;
        Swal.fire({
          title: "Do you want to Download",
          text: "Delete History?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then((result) => {
          if (result.isConfirmed) {
            a.download = 'delete.csv';
            document.body.appendChild(a);
            a.click();
    
            // Clean up
            window.URL.revokeObjectURL(url);
            Swal.fire({
              title: "The CSV file downloaded",
              text: "Successfully!",
              icon: "success"
            })
          }
        });

        
      })
      .catch(error => {
        console.error("Error downloading reports:", error);
      });
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Toggle Button with Sub-Buttons */}
      <Box>
  <Button
    onClick={handleMenuClick}
    sx={{
      backgroundColor: colors.blueAccent[700],
      color: colors.grey[100],
      fontSize: "14px",
      fontWeight: "bold",
      padding: "10px 20px",
    }}
  >
    <CloudDownloadIcon sx={{ mr: "10px" }} />
    Export Transaction History
  </Button>
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleMenuClose}
  >
    <MenuItem
      onClick={handleDownloadReports}
      sx={{
        backgroundColor: colors.blueAccent[700],
        color: colors.grey[100],
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
        '&:hover': {
          backgroundColor: colors.blueAccent[800],
        },
      }}
    >
      <DataThresholdingSharpIcon sx={{ mr: "10px" }} />
      Download Current Holdings
    </MenuItem>
    <MenuItem
      onClick={handleDownloadIssuance}
      sx={{
        backgroundColor: colors.blueAccent[700],
        color: colors.grey[100],
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
        '&:hover': {
          backgroundColor: colors.blueAccent[800],
        },
      }}
    >
      <TrendingDownSharpIcon sx={{ mr: "10px" }} />
      Download Issuance History
    </MenuItem>
    <MenuItem
      onClick={handleDownloadupdate}
      sx={{
        backgroundColor: colors.blueAccent[700],
        color: colors.grey[100],
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
        '&:hover': {
          backgroundColor: colors.blueAccent[800],
        },
      }}
    >
      <RecyclingSharpIcon sx={{ mr: "10px" }} />
      Download Update History
    </MenuItem>
    <MenuItem
      onClick={handleDownloaddelete}
      sx={{
        backgroundColor: colors.blueAccent[700],
        color: colors.grey[100],
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
        '&:hover': {
          backgroundColor: colors.blueAccent[800],
        },
      }}
    >
      <DeleteSharpIcon sx={{ mr: "10px" }} />
      Download Delete History
    </MenuItem>
  </Menu>
</Box>

      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={showSwal}>
          <NotificationsOutlinedIcon />
        </IconButton>
        {/* <IconButton onClick={set}>
          <SettingsOutlinedIcon />
        </IconButton> */}
        <IconButton onClick={logout}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import CurtainsIcon from '@mui/icons-material/Curtains';
import CachedIcon from '@mui/icons-material/Cached';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/Display')
      .then(result => setProducts(result.data))
      .catch(err => console.log(err));
  }, []);

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

  return (
    <Box m="10px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button onClick={handleDownloadReports}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Current Holdings
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox title="10000" subtitle="Answer Booklet" progress="0.75"  icon={<MenuBookIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />} />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1000"
            subtitle="A4 Sheet"
            progress="0.50"
            // increase="+21%"
            icon={
              <StickyNote2Icon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1000"
            subtitle="A3 Sheet"
            progress="0.30"
            // increase="+5%"
            icon={
              <ArticleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="10000"
            subtitle="Marksheet cover"
            progress="0.80"
            // increase="+43%"
            icon={
              <CurtainsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box gridColumn="span 12" gridRow="span 12" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" flexDirection="column">
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb={2}>
              Products Available in Inventory
            </Typography>
            <Box position="absolute" top={350} right={50} display="flex" alignItems="center">
            <IconButton component={Link} to="/dashboard"><CachedIcon /></IconButton>
              <IconButton component={Link} to="/UpdateQuantity"><EditIcon /></IconButton>
              <br></br>
              <br></br>
              <IconButton component={Link} to="/DeleteProduct"><DeleteIcon /></IconButton>
            </Box>
            <br></br>
            <Box display="flex" flexDirection="column" alignItems="auto" bgcolor="rgb(102, 102, 204)" color="black" boxShadow={3} borderRadius={4} p={2} mb={2} overflow="auto">
              <table className='table' style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black", textAlign: "center",fontSize: "20px", background: 'linear-gradient(135deg, #6666cc 0%, #4b4b93 100%)', color: 'white', padding: '12px'  }}>Product Name</th>
                    <th style={{ border: "1px solid black", textAlign: "center",fontSize: "20px", background: 'linear-gradient(135deg, #6666cc 0%, #4b4b93 100%)', color: 'white', padding: '12px'  }}>Product Description</th>
                    <th style={{ border: "1px solid black", textAlign: "center",fontSize: "20px", background: 'linear-gradient(135deg, #6666cc 0%, #4b4b93 100%)', color: 'white', padding: '12px'  }}>Quantity Available</th>
                    <th style={{ border: "1px solid black", textAlign: "center",fontSize: "20px", background: 'linear-gradient(135deg, #6666cc 0%, #4b4b93 100%)', color: 'white', padding: '12px'  }}>Lot Number</th>
                    <th style={{ border: "1px solid black", textAlign: "center",fontSize: "20px", background: 'linear-gradient(135deg, #6666cc 0%, #4b4b93 100%)', color: 'white', padding: '12px'  }}>Serial Number From</th>
                    <th style={{ border: "1px solid black", textAlign: "center",fontSize: "20px", background: 'linear-gradient(135deg, #6666cc 0%, #4b4b93 100%)', color: 'white', padding: '12px'  }}>Serial Number To</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f4f4f9' : 'white', transition: 'background-color 0.3s ease' }}>
                      <td style={{ border: "1px solid black", textAlign: "center", fontSize: "20px" }}>{product.productName}</td>
                      <td style={{ border: "1px solid black", textAlign: "center", fontSize: "20px" }}>{product.productDescription}</td>
                      <td style={{ border: "1px solid black", textAlign: "center", fontSize: "20px" }}>{product.purchaseQuantity}</td>
                      <td style={{ border: "1px solid black", textAlign: "center", fontSize: "20px" }}>{product.lotNumber}</td>
                      <td style={{ border: "1px solid black", textAlign: "center", fontSize: "20px" }}>{product.serialNumberFrom}</td>
                      <td style={{ border: "1px solid black", textAlign: "center", fontSize: "20px" }}>{product.serialNumberTo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;

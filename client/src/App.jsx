import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Login from "./authorisation";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from "./scenes/dashboard/dashboard";
import AddProduct from "./scenes/addProduct/AddProduct";
import ExistingProduct from "./scenes/addProduct/ExistingProduct";
import UpdateQuantity from "./scenes/updatequantity/updatequantity";
import SellProduct from "./scenes/sellProduct/SellProduct";
import Calendar from "./scenes/calendar/Calendar";
import SignUp from "./registration/signup";
import DeleteProduct from "./scenes/deleteproduct/deleteproduct";


function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  // Define route paths
  const loginRoute = '/';
  const signupRoute = '/signup';

  // Check if the current route is login or signup
  const isLoginRoute = location.pathname === loginRoute;
  const isSignupRoute = location.pathname === signupRoute;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* Conditionally render Sidebar and Topbar based on route */}
          {!isLoginRoute && !isSignupRoute && <Sidebar />}
          
          <main className="content">
          {!isLoginRoute && !isSignupRoute && <Topbar />}
            {/* Render Login and SignUp outside of Sidebar and Topbar */}
            <Routes>
              {/* Route for Login */}
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/AddProduct" element={<AddProduct />} />
              <Route path="/ExistingProduct" element={<ExistingProduct />} />
              <Route path="/UpdateQuantity" element={<UpdateQuantity />} />
              <Route path="/SellProduct" element={<SellProduct />} />
              <Route path="/DeleteProduct" element={<DeleteProduct />} />
              <Route path="/Calendar" element={<Calendar />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

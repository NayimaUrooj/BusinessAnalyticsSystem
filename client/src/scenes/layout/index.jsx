import React from 'react';
import { useState } from 'react';
import { Box} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";


const Layout = () => {
  return (
    <Box width = "100%" height = "100%" >
        <Box>
            <Navbar />
            <Outlet />
        </Box>
    </Box>
  )
}

export default Layout
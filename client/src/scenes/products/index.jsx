import React, {useState} from 'react';
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, UseTheme, Rating, useMediaQuery} from "@mui/material";
import { useGetProductsQuery } from 'state/api';
import Header from "components/Header";


const Products = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  //console.log(data, "dataproduct");
  const isNonMobile = useMediaQuery("(min-width: 1000px)");


  return ( <Box m="1.5rem 2.5rem " >
    <Header title= "Products" subtitle = "Check the list of all products:" />
    {
      data || !isLoading ? <Box mt = "20px" display="grid" gridTemplateColumns="repeat(4, minmax(0, 1fr)"
      justifyContent="space-between"
      rowGap = "20px"
      columnGap = "1.33%"
      sx = {
        {
          
        }
      }

      > </Box> : <> </>
    }
  </Box>
  );
  };

export default Products;
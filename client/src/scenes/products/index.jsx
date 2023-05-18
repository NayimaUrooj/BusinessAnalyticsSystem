import React, { useState } from 'react';
import {
  Box,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Typography,
  Rating,
  CardActions,
  Button,
  Collapse,
  CircularProgress,
} from '@mui/material';
import { useGetProductsQuery } from 'state/api';
import Header from 'components/Header';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const yearlySalesTotal = stat.length > 0 ? stat[0].yearlySalesTotal : 0;
  const yearlyTotalSoldUnits =
    stat.length > 0 ? stat[0].yearlyTotalSoldUnits : 0;
  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: '1.5rem' }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          {stat ? (
            <>
              <Typography>
                Yearly Sales This Year: {yearlySalesTotal}
              </Typography>
              <Typography>
                Yearly Units Sold This Year: {yearlyTotalSoldUnits}
              </Typography>
            </>
          ) : null}
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  //console.log(data, "dataproduct");
  const isNonMobile = useMediaQuery('(min-width: 1000px)');

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="PRODUCTS"
        subtitle="Find the list of your products here:"
      />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        //   <Box
        //   display="flex"
        //   justifyContent="center"
        //   alignItems="center"
        //   height="50vh"
        // >
        //   <CircularProgress />
        // </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={2}
            animation={`${spin} 2s linear infinite`}
          >
            <CircularProgress />
            <Box ml={2}>
              <Typography variant="h6" component="span">
                Loading
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" component="span">
            Please wait while we load your products...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Products;

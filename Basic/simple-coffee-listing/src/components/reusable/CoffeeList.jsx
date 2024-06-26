import React, { useState, useEffect } from "react";
import { Grid, Grow, Paper, Typography } from "@mui/material";
import CoffeeCard from "./CoffeeCard";
import CustomButtonGroup from "./ButtonGroup";

const CoffeeList = () => {
  const [coffees, setCoffees] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [showAvailable, setShowAvailable] = useState(false);

  useEffect(() => {
    // Fetch the coffee data
    fetch(
      "https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json"
    )
      .then((response) => response.json())
      .then((data) => setCoffees(data))
      .catch((error) => console.error("Error fetching coffee data:", error));
  }, []);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    if (buttonName === "Available Now") {
      setShowAvailable(true);
    } else {
      setShowAvailable(false);
    }
  };

  const filteredCoffees = showAvailable
    ? coffees.filter((coffee) => coffee.available)
    : coffees;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        padding: "20px",
      }}
    >
      <Paper
        square={false}
        sx={{
          backgroundColor: "#111315",
          pt: 1,
          pl: 5,
          pr: 5,
          width: "50%",
          borderRadius: 3,
        }}
      >
        <Grid
          container
          justifyContent="center"
          color="white"
          sx={{
            backgroundImage: `url(src/assets/vector.svg)`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "75%",
          }}
        >
          <Grid item xs={12} sm={12} md={8} sx={{ textAlign: "center" }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "2rem",
                fontWeight: "bold",
                mt: 5,
              }}
            >
              Our Collection
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "1rem",
                textAlign: "center",
                color: "#6F757C",
              }}
            >
              Introducing our coffee Collections, a selection of unique coffees
              <br />
              from different roast types and origins, expertly roasted in small
              <br />
              batches and shipped fresh weekly.
            </Typography>
          </Grid>
        </Grid>

        <br />
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={8}>
            <CustomButtonGroup
              buttons={["All Products", "Available Now"]}
              handleButtonClick={handleButtonClick}
              selectedButton={selectedButton}
              justifyContent="center"
            />
          </Grid>
        </Grid>
        <br />
        <Grid container justifyContent="center" spacing={2}>
          {filteredCoffees.map((coffee) => (
            <Grow in key={coffee.id}>
              <Grid item xs={12} sm={6} md={4}>
                <CoffeeCard coffee={coffee} />
              </Grid>
            </Grow>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default CoffeeList;

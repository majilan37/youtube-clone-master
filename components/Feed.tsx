import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Videos from "./Videos";
import useFetch from "../hooks/useFetch";
import { Union, VideoSearch } from "../types";

function Feed() {
  const [selectedCategory, setSelectedCategory] = useState<Union>("New");
  const { data, loading, error } = useFetch<VideoSearch>(
    `search?part=snippet&q=${selectedCategory}`
  );

  return (
    <Stack
      sx={{
        flexDirection: {
          sx: "column",
          md: "row",
        },
      }}>
      <Box
        sx={{
          height: {
            sm: "auto",
            md: "92vh",
          },
          borderRight: "1px solid #3d3d3d",
          px: {
            sx: 0,
            md: 2,
          },
        }}>
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography variant="body2" sx={{ mt: 1.5, color: "#fff" }}>
          Copyright 2022 Media{" "}
        </Typography>
      </Box>
      <Box p={2}>
        <Typography
          component="p"
          variant="h2"
          fontWeight={"bold"}
          mb="2"
          gutterBottom
          sx={{
            color: "white",
          }}>
          {selectedCategory}{" "}
          <span
            style={{
              color: "#F31503",
            }}>
            Videos
          </span>
        </Typography>
        <Videos videos={data?.items ?? []} loading={loading} />
      </Box>
    </Stack>
  );
}

export default Feed;

import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import axios from "../../axios";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Videos from "../../components/Videos";
import { VideoSearch } from "../../types";

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<Record<string, any>>
> {
  const { data } = await axios.get<VideoSearch>(
    `/search?q=${
      params?.searchTerm ?? ""
    }&part=snippet&maxResults=50&order=date`
  );

  return {
    props: {
      data,
    },
  };
}

function SearchFeed({ data }: { data: VideoSearch }) {
  const { query } = useRouter();
  return (
    <div className="">
      <Header />
      <Stack
        justifyContent={"center"}
        sx={{
          flexDirection: {
            sx: "column",
            md: "row",
          },
        }}>
        <Box bgcolor={"#000"} p={2}>
          <Typography
            component="p"
            variant="h2"
            fontWeight={"bold"}
            mb="2"
            marginLeft={"auto"}
            marginRight={"auto"}
            gutterBottom
            sx={{
              color: "white",
            }}>
            Search Results for{" "}
            <span
              style={{
                color: "#F31503",
              }}>
              {query.searchTerm}
            </span>
          </Typography>
          <Videos videos={data.items} justifyContent="center" />
        </Box>
      </Stack>
    </div>
  );
}

export default SearchFeed;

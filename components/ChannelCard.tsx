import { CheckCircle } from "@mui/icons-material";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Video } from "../types";
import { demoProfilePicture } from "../utils/constants";

function ChannelCard({
  video,
  marginTop,
}: {
  video: Video;
  marginTop?: string;
}) {
  const router = useRouter();
  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: {
          xs: video ? "356px" : 0,
          md: video ? "320px" : 0,
        },
        // height: "326px",
        margin: "auto",
      }}>
      <div
        onClick={() => {
          !router.pathname.startsWith("/channel") &&
            router.push(`/channel/${encodeURIComponent(video.id.channelId)}`);
        }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}>
          <CardMedia
            image={video.snippet.thumbnails.high.url || demoProfilePicture}
            sx={{
              borderRadius: "50%",
              marginTop: marginTop,
              height: "180px",
              width: "180px",
              cursor: "pointer",
            }}
          />
          <Typography variant="h6">
            {video.snippet.title}{" "}
            <CheckCircle sx={{ fontSize: 12, color: "gray", ml: "15px" }} />
          </Typography>
          {video?.statistics?.subscriberCount && (
            <Typography>
              {parseInt(video?.statistics?.subscriberCount).toLocaleString()}{" "}
              Subscribers
            </Typography>
          )}
        </CardContent>
      </div>
    </Box>
  );
}

export default ChannelCard;

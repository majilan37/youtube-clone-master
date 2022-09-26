import { CheckCircle } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { Video } from "../types";
import { demoChannelTitle, demoVideoTitle } from "../utils/constants";

function VideoCard({
  video: {
    id: { videoId },
    snippet,
  },
}: {
  video: Video;
}) {
  const truncate = (str: string, n: number = 150): string => {
    return str.length > n ? str.slice(n - 1).concat("...") : str;
  };
  return (
    <Card
      sx={{
        width: {
          xs: "356px",
          md: "320px",
        },
        // height: "326px",
        boxShadow: "none",
        borderRadius: 0,
      }}>
      <Link
        href={
          videoId
            ? `/video/${encodeURIComponent(videoId)}`
            : `/channel/${encodeURIComponent(snippet.channelId)}`
        }>
        <CardMedia
          sx={{
            width: "358px",
            height: "170px",
            cursor: "pointer",
            // objectFit: "contain",
          }}
          image={snippet.thumbnails.high.url}
        />
      </Link>
      <CardContent
        sx={{
          background: "#1e1e1e",
          height: "106px",
        }}>
        <Link
          href={
            videoId
              ? `/video/${encodeURIComponent(videoId)}`
              : `/channel/${encodeURIComponent(snippet.channelId)}`
          }>
          <Typography
            variant="subtitle1"
            noWrap
            sx={{
              cursor: "pointer",
            }}
            color={"#fff"}>
            {truncate(snippet.title) || truncate(demoVideoTitle)}
          </Typography>
        </Link>
        {snippet.channelId && (
          <Link
            href={`/channel/${encodeURIComponent(snippet.channelId) ?? ""}`}>
            <Typography
              sx={{
                cursor: "pointer",
              }}
              variant="subtitle2"
              color={"gray"}
              fontWeight={"bold"}>
              {snippet.channelTitle || demoChannelTitle}
              <CheckCircle sx={{ fontSize: 12, color: "gray", ml: "15px" }} />
            </Typography>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

export default VideoCard;

import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { ResponsiveStyleValue } from "@mui/system";
import React from "react";
import { Video } from "../types";
import ChannelCard from "./ChannelCard";
import VideoCard from "./VideoCard";

function Videos({
  videos,
  loading,
  justifyContent,
  direcrtion,
}: {
  videos: Video[];
  loading?: boolean;
  justifyContent?: string;
  direcrtion?: ResponsiveStyleValue<
    "row" | "row-reverse" | "column" | "column-reverse"
  >;
}) {
  return (
    <Stack
      direction={direcrtion ?? "row"}
      flexWrap="wrap"
      justifyContent={justifyContent ?? "start"}
      gap={2}>
      {Array.from(loading ? { length: 20 } : videos).map((video, index) => (
        <>
          {video ? (
            <Box key={video.id.videoId ?? index}>
              {video.id.videoId && <VideoCard video={video} />}
              {video.id.channelId && <ChannelCard video={video} />}
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  width: {
                    xs: "356px",
                    md: "320px",
                  },
                  bgcolor: "grey.800",
                  boxShadow: "none",
                  borderRadius: 0,
                }}>
                <Skeleton
                  sx={{ bgcolor: "grey.600" }}
                  variant="rectangular"
                  height={208}
                />
                <Box sx={{ p: 2, height: "106px" }}>
                  <Skeleton sx={{ bgcolor: "grey.600" }} />
                  <Skeleton width="60%" sx={{ bgcolor: "grey.600" }} />
                </Box>
              </Box>
            </>
          )}
        </>
      ))}
    </Stack>
  );
}

export default Videos;

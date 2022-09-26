import { Box, Stack, Typography } from "@mui/material";
import axios from "../../axios";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import ReactPlayer from "react-player/lazy";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Video, VideoSearch } from "../../types";
import Link from "next/link";
import { CheckCircle } from "@mui/icons-material";
import Videos from "../../components/Videos";

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<Record<string, any>>
> {
  const videoPromise = axios.get<VideoSearch>(
    `/videos?part=snippet,statistics&id=${params?.videoId}`
  );

  const relatedVideosPromise = axios.get<VideoSearch>(
    `/search?part=snippet&relatedToVideoId=${params?.videoId}&type=video&maxResults=50`
  );

  const [video, videos] = await Promise.all([
    videoPromise,
    relatedVideosPromise,
  ]);

  return {
    props: {
      data: video.data.items[0],
      videos: videos.data.items,
    },
  };
}

function Video({ data, videos }: { data: Video; videos: Video[] }) {
  console.log(data);
  const { query } = useRouter();
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => setDomLoaded(true), []);

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = data;
  return (
    <Box bgcolor={"#000"} minHeight={"95vh"}>
      <Header />
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}>
        <Box flex={1}>
          <Box
            // py={4}
            sx={{
              width: "100%",
              maxHeight: "600px",
              position: "sticky",
              top: "86px",
            }}>
            {domLoaded && (
              <ReactPlayer
                height={500}
                url={`https://www.youtube.com/watch?v=${query.videoId}`}
                className="react-player"
                controls
              />
            )}
            <Typography
              color={"#fff"}
              variant="h5"
              fontWeight={"bold"}
              px={2}
              pt={2}>
              {" "}
              {title}
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{
                color: "#fff",
              }}
              // py={1}
              px={2}>
              <Link href={`/channel/${channelId}`}>
                <Typography
                  sx={{ cursor: "pointer" }}
                  variant={"subtitle1"}
                  color="#fff">
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction={"row"} gap={"20px"} alignItems="center">
                <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.7,
                  }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.7,
                  }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{
            md: 1,
            xs: 5,
          }}
          justifyContent={"center"}
          alignContent={"center"}>
          <Videos videos={videos} direcrtion="column" />
        </Box>
      </Stack>
    </Box>
  );
}

export default Video;

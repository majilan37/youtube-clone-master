import { Box } from "@mui/material";
import axios from "../../axios";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import ChannelCard from "../../components/ChannelCard";
import Header from "../../components/Header";
import Videos from "../../components/Videos";
import { ChannelDetails, VideoSearch } from "../../types";

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<Record<string, any>>
> {
  const channelPromsie = axios.get<ChannelDetails>(
    `/channels?part=snippet&id=${params?.channelId}`
  );

  const channelVideosPromise = axios.get<VideoSearch>(
    `/search?channelId=${params?.channelId}&part=snippet&order=date&maxResults=50`
  );

  const [channel, videos] = await Promise.all([
    channelPromsie,
    channelVideosPromise,
  ]);

  return {
    props: {
      channel: channel?.data?.items[0],
      videos: videos.data,
    },
  };
}

function Channel({
  videos,
  channel,
}: {
  videos: VideoSearch;
  channel: ChannelDetails;
}) {
  return (
    <div>
      <Header />
      <Box bgcolor={"#000"} minHeight={"95vh"}>
        <div
          style={{
            background:
              "linear-gradient(38deg, rgba(231,231,231,1) 2%, rgba(134,126,207,1) 49%, rgba(255,150,249,1) 100%)",
            height: "300px",
          }}
        />
        {/* @ts-ignore */}
        <ChannelCard video={channel} marginTop="-93px" />
        <Box display={"flex"} p={2}>
          <Videos videos={videos.items} justifyContent="center" />
        </Box>
      </Box>
    </div>
  );
}

export default Channel;

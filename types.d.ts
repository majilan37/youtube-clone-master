import { categories } from "./utils/constants";

declare namespace global {
  interface RequestInit {
    headers: {
      "X-RapidAPI-Key": string;
      "X-RapidAPI-Host": string;
    };
  }
}

export type Union = typeof categories[number]["name"];
export type Video = {
  id: { kind: string; videoId: string; channelId: string };
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string | Date;
    publishedAt: string | Date;
    defaultAudioLanguage: string;
    defaultLanguage: string;
    description: string;
    liveBroadcastContent: string;
    localized: {
      description: string;
      title: string;
    };
    tags: string[];
    title: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  statistics: {
    hiddenSubscriberCount: boolean;
    subscriberCount: string;
    videoCount: string;
    viewCount: string;
    commentCount: string;
    favoriteCount: string;
    likeCount: string;
  };
};

export interface VideoSearch {
  kind: string;
  nextPageToken: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
  regionCode: string;
  items: Video[];
}

export interface Channel {
  brandingSettings: {
    channel: {
      country: string;
      description: string;
      keywords: string;
      title: string;
      trackingAnalyticsAccountId: string;
      unsubscribedTrailer: string;
    };
    image: {
      bannerExternalUrl: string;
    };
  };
  contentDetails: {
    relatedPlaylists: {
      likes: string;
      uploads: string;
    };
  };
  snippet: {
    country: string;
    customUrl: string;
    description: string;
    localized: {
      description: string;
      title: string;
    };
    publishedAt: string | Date;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
    title: string;
  };
  statistics: {
    hiddenSubscriberCount: false;
    subscriberCount: string;
    videoCount: string;
    viewCount: string;
  };
  id: string;
  kind: string;
}

export interface ChannelDetails {
  items: Channel[];
  kind: "youtube#channelListResponse";
  pageInfo: { totalResults: number; resultsPerPage: number };
}

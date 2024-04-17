import { SpotifyAPI } from "./datasources/spotify-api";
import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    featuredPlaylists: (_, __, { dataSources }) => {
      const spotifyAPI = new SpotifyAPI();
      return spotifyAPI.getFeaturedPlaylists();
      // return dataSources.spotifyAPI.getFeaturedPlaylists();
    },
  },
};

import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    featuredPlaylists: (_, __, { dataSources }) => {
      return dataSources.spotifyAPI.getFeaturedPlaylists();
    },
  },
};

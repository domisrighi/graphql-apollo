import { SpotifyAPI } from "./datasources/spotify-api";
import { TrackModel } from "./models";
import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    featuredPlaylists: () => {
      const spotifyAPI = new SpotifyAPI();
      return spotifyAPI.getFeaturedPlaylists();
    },
    playlist: (_, { id }, { dataSources }) => {
      return dataSources.spotifyAPI.getPlaylist(id);
    },
  },
  Playlist: {
    tracks: async ({ tracks, id }, _, { dataSources }) => {
      return tracks.items
        ? tracks.items.map(({ track }: { track: TrackModel }) => track)
        : dataSources.spotifyAPI.getTracks(id);
    },
  },
  Mutation: {
    addItemsToPlaylist: async (_, { input }, { dataSources }) => {
      try {
        const response = await dataSources.spotifyAPI.addItemsToPlaylist(input);
        if (response.snapshot_id) {
          return {
            code: 200,
            success: true,
            message: "Tracks added to playlist!",
            playlistId: response.snapshot_id,
          };
        } else {
          throw Error("snapshot_id property not found");
        }
      } catch (e) {
        return {
          code: 500,
          success: false,
          message: `Something went wrong: ${e}`,
          playlistId: null,
        };
      }
    },
  },
};

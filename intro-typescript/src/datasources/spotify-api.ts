import { RESTDataSource } from "@apollo/datasource-rest";
import { PlaylistModel, TrackModel, SnapshotOrError } from "../models";

export class SpotifyAPI extends RESTDataSource {
  baseURL = "https://spotify-demo-api-fe224840a08c.herokuapp.com/v1/";

  getFeaturedPlaylists = async (): Promise<PlaylistModel[]> => {
    const response = await this.get<{ playlists: { items: PlaylistModel[] } }>(
      "browse/featured-playlists"
    );
    return response?.playlists?.items ?? [];
  };

  getPlaylist(playlistId: string): Promise<PlaylistModel> {
    return this.get(`playlists/${playlistId}`);
  }

  async getTracks(playlistId: string): Promise<TrackModel[]> {
    const response = await this.get<{ items: { track: TrackModel }[] }>(
      `playlists/${playlistId}/tracks`
    );
    return response?.items?.map(({ track }) => track) ?? [];
  }

  addItemsToPlaylist(input: {
    playlistId: string;
    uris: string[];
  }): Promise<SnapshotOrError> {
    const { playlistId, uris } = input;
    return this.post(`playlists/${playlistId}/tracks`, {
      params: {
        uris: uris.join(","),
      },
    });
  }
}

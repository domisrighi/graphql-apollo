export type PlaylistModel = {
  id: string;
  name: string;
  description: string;
  tracks: {
    items: {
      track: TrackModel;
    }[];
  };
};

export type TrackModel = {
  id: string;
  name: string;
  duration_ms: number;
  explicit: boolean;
  uri: string;
};

export type SnapshotOrError = {
  snapshot_id: string;
  error: string;
};

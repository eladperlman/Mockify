import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import spotifyAPI from '../../services/apis/spotifyAPI';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spotify.com' }),
  endpoints: (builder) => ({
    searchTracks: builder.query({
      query: (query) => ({
        url: `/v1/search?q=${query}&type=track&limit=20`,
        method: 'GET',
        headers: { Authorization: `Bearer ${spotifyAPI.getToken()}` },
      }),
      transformResponse: (response: any) => response.tracks.items,
    }),
    getTrack: builder.query({
      query: (id) => ({
        url: `/v1/tracks/${id}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${spotifyAPI.getToken()}` },
      }),
    }),
  }),
});

export const { useGetTrackQuery, useSearchTracksQuery } = apiSlice;

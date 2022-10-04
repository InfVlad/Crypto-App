import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
	"X-RapidAPI-Key": "670f8fb8cbmshc5830725a535972p165946jsn921a145e3dcb",
	"X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
	reducerPath: "cryptoApi",
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getCryptos: builder.query({
			query: (count) => createRequest(`/coins?limit=${count}`),
		}),
		getCryptoDetails: builder.query({
			query: (uuid) => createRequest(`/coin/${uuid}`),
		}),
		getCryptoHistory: builder.query({
			query: ({ uuid, timePeriod }) =>
				createRequest(`/coin/${uuid}/history?timePeriod=${timePeriod}`),
		}),
	}),
});

//@ts-ignore
export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
// export const cryptoApi = createApi({
// 	reducerPath: "cryptoApi",
// 	baseQuery: fetchBaseQuery({ baseUrl }),
// 	endpoints: (builder) => ({
// 		getCryptos: builder.query({
// 			query: (count) => createRequest(`/coins?limit=${count}`),
// 		}),
//     getCryptoDetails: builder.query({
//       query: (coinId) => createRequest(`/coin/${coinId}`)
//     }),
//     getCryptoHistory: builder.query({
//       query: ({ coinId, timePeriod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
//     })
// 	}),
// });

// //@ts-ignore
// export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;

/*
const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h',
      'tiers[0]': '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: '50',
      offset: '0'
    },
    headers: {
      'X-RapidAPI-Key': '670f8fb8cbmshc5830725a535972p165946jsn921a145e3dcb',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  }; */

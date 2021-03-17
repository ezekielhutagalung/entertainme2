import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";

const GET_SERIE_BY_ID = gql`
  query GetSeries($serieId: ID!) {
    tvseries(id: $serieId) {
      _id
      title
      overview
      poster_path
      popularity
      tags
      urlSer
    }
  }
`;

export default function GetSeries() {
  const history = useHistory();
  const { id } = useParams();
  console.log(id, "ini id di get series");

  const { loading, error, data } = useQuery(GET_SERIE_BY_ID, {
    variables: {
      serieId: id,
    },
  });
  console.log(data, "ini data series detail get series");

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error...</p>;
  }

  return (
    <>
      <div class="ml-5 py-52">
        <div class="max-w-screen-sm bg-white rounded-lg shadow-lg md:flex">
          <img
            class="md:w-1/3 rounded-t-lg md:rounded-t-none  md:rounded-l-lg"
            src={data.tvseries.poster_path}
            alt="City"
          />

          <div class="p-6">
            <h2 class="font-bold mb-2 text-2xl text-purple-800">
              {data.tvseries.title}
            </h2>
            <p class="text-gray-700">{data.tvseries.overview}</p>
            <div class="font-bold text-xl mb-2">
              Rating: {data.tvseries.popularity}
            </div>
            <div class="px-6 py-4">
              {data.tvseries.tags.map((tag) => {
                return (
                  <span
                    class="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2"
                    key={tag}
                  >
                    # {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

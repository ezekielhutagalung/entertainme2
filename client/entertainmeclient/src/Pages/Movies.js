import MovieCard from "../components/MovieCard";
import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_TRIP = gql`
  query {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
      urlMov
    }
  }
`;

export default function GetMovies() {
  const { data, error, loading } = useQuery(GET_TRIP);

  if (loading) {
    return (
      <lottie-player
        src="https://assets10.lottiefiles.com/packages/lf20_rg8y5nzn.json"
        background="transparent"
        speed="1"
        style={{ width: "300px", height: "300px" }}
        loop
        autoplay
      ></lottie-player>
    );
  }

  if (error) {
    return (
      <h1 className="d-flex justify-content-center align-middle">
        Internal Server Error
      </h1>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-5">
        <div class="item-center">
          <div class="mt-10 pr-10  mr-10 backdrop w-1/2 md:w-1/4 bg-white bg-opacity-10 rounded p-3 text-white border border-gray-300 shadow-lg">
            <div class="w-full mb-3 pb-3 border-b border-1 border-white">
              <h3 class="text-center text-xl font-semibold text-shadow">
                Movies
              </h3>
            </div>
          </div>
        </div>
        <div
          class="mt-3 w-1/2 md:w-full grid md:grid-cols-3 "
          style={{ paddingTop: "30px" }}
        >
          {data.movies.length === 0 ? (
            <h1 className="mt-5 mb-5">You don't have any movies yet</h1>
          ) : (
            data.movies.map((movie) => {
              return <MovieCard key={movie._id} movie={movie} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

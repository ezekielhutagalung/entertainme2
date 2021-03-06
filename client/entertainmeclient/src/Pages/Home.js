import { useQuery, gql } from "@apollo/client";
import React from "react";
import MovieCard from "../components/MovieCard";
import SeriesCard from "../components/SeriesCard";

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
    Tvseries {
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

export default function Home() {
  const { data, error, loading } = useQuery(GET_TRIP);
  console.log(data, " ini di home");
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
        {/* <h1
          class="text-3xl font-bold text-gray-800 mb-5"
          style={{ cursor: "pointer" }}
          onClick={() => goToMovie()}
        > */}
        <div class="flex justify-center items-center flex justify-center items-center h-48 w-3/4 pb-3 pt-10">
          <div class="flex relative">
            <div class="w-64 h-20 bg-green-400 transform transition-all skew-x-12 -skew-y-12 absolute rounded-lg"></div>
            <div class="w-64 h-20 bg-yellow-400 transform transition-all skew-x-12 -skew-y-12 absolute -top-4 -left-4 rounded-lg"></div>
            <div class="w-64 h-20 bg-red-400 transform transition-all skew-x-12 -skew-y-12 absolute -top-8 -left-8 rounded-lg"></div>
            <div class="w-64 h-20 bg-black transform transition-all skew-x-12 -skew-y-12 absolute -top-12 -left-12 rounded-lg"></div>
            <div class="w-64 h-20 bg-purple-400 transform transition-all skew-x-12 -skew-y-12 absolute -top-16 -left-16 rounded-lg"></div>
            <div class="w-64 h-20 bg-white flex justify-center items-center border-2 border-black transform transition-all skew-x-12 -skew-y-12 absolute -top-20 -left-20 rounded-lg">
              <text class="text-center font-serif text-md font-bold">
                Movie,and Series that will boost your joy, and "High Experience"
              </text>
              {/* <svg viewBox="0 0 247 31" class="w-auto h-7 sm:h-8">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
                  fill="#06B6D4"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M76.546 12.825h-4.453v8.567c0 2.285 1.508 2.249 4.453 2.106v3.463c-5.962.714-8.332-.928-8.332-5.569v-8.567H64.91V9.112h3.304V4.318l3.879-1.143v5.937h4.453v3.713zM93.52 9.112h3.878v17.849h-3.878v-2.57c-1.365 1.891-3.484 3.034-6.285 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.285 2.999V9.112zm-5.674 14.636c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm16.016-17.313c-1.364 0-2.477-1.142-2.477-2.463a2.475 2.475 0 012.477-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.879v17.849h-3.879zm8.368 0V.9h3.878v26.06h-3.878zm29.053-17.849h4.094l-5.638 17.849h-3.807l-3.735-12.03-3.771 12.03h-3.806l-5.639-17.849h4.094l3.484 12.315 3.771-12.315h3.699l3.734 12.315 3.52-12.315zm8.906-2.677c-1.365 0-2.478-1.142-2.478-2.463a2.475 2.475 0 012.478-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.878v17.849h-3.878zm17.812-18.313c4.022 0 6.895 2.713 6.895 7.354V26.96h-3.878V16.394c0-2.713-1.58-4.14-4.022-4.14-2.55 0-4.561 1.499-4.561 5.14v9.567h-3.879V9.112h3.879v2.285c1.185-1.856 3.124-2.749 5.566-2.749zm25.282-6.675h3.879V26.96h-3.879v-2.57c-1.364 1.892-3.483 3.034-6.284 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.284 2.999V1.973zm-5.674 21.775c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm22.553 3.677c-5.423 0-9.481-4.105-9.481-9.389 0-5.318 4.058-9.388 9.481-9.388 3.519 0 6.572 1.82 8.008 4.605l-3.34 1.928c-.79-1.678-2.549-2.749-4.704-2.749-3.16 0-5.566 2.392-5.566 5.604 0 3.213 2.406 5.605 5.566 5.605 2.155 0 3.914-1.107 4.776-2.749l3.34 1.892c-1.508 2.82-4.561 4.64-8.08 4.64zm14.472-13.387c0 3.249 9.661 1.285 9.661 7.89 0 3.57-3.125 5.497-7.003 5.497-3.591 0-6.177-1.607-7.326-4.177l3.34-1.927c.574 1.606 2.011 2.57 3.986 2.57 1.724 0 3.052-.571 3.052-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.909-5.462 6.572-5.462 2.945 0 5.387 1.357 6.644 3.713l-3.268 1.82c-.647-1.392-1.904-2.035-3.376-2.035-1.401 0-2.622.607-2.622 1.892zm16.556 0c0 3.249 9.66 1.285 9.66 7.89 0 3.57-3.124 5.497-7.003 5.497-3.591 0-6.176-1.607-7.326-4.177l3.34-1.927c.575 1.606 2.011 2.57 3.986 2.57 1.724 0 3.053-.571 3.053-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.908-5.462 6.572-5.462 2.944 0 5.386 1.357 6.643 3.713l-3.268 1.82c-.646-1.392-1.903-2.035-3.375-2.035-1.401 0-2.622.607-2.622 1.892z"
                  fill="#000"
                ></path>
              </svg> */}
            </div>
          </div>
        </div>
        {/* </h1> */}
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
      <div class="item-center">
        <div class="mt-10 pr-10  mr-10 backdrop w-1/2 md:w-1/4 bg-white bg-opacity-10 rounded p-3 text-white border border-gray-300 shadow-lg">
          <div class="w-full mb-3 pb-3 border-b border-1 border-white">
            <h3 class="text-center text-xl font-semibold text-shadow">
              Series
            </h3>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-5">
        <div
          class="mt-3 w-1/2 md:w-full grid md:grid-cols-3"
          style={{ paddingTop: "30px" }}
        >
          {data.Tvseries.length === 0 ? (
            <h1 className="mt-5 mb-5">You don't have any movies yet</h1>
          ) : (
            data.Tvseries.map((tvseries) => {
              return <SeriesCard key={tvseries._id} tvseries={tvseries} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

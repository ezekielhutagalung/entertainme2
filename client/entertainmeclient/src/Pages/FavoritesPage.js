import React from "react";
import { favMovie } from "../cache";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const favorites = favMovie();

  if (favorites.length === 0) {
    return (
      <h1 className="mt-5 mb-5 d-flex justify-content-center align-self-center">
        Opss, You don't have any favorite movies yet!!
      </h1>
    );
  }

  return (
    <>
      <div>
        <div className="container mx-auto px-5">
          <div class="item-center">
            <div class="mt-10 pr-10  mr-10 backdrop w-1/2 md:w-1/4 bg-white bg-opacity-10 rounded p-3 text-white border border-gray-300 shadow-lg">
              <div class="w-full mb-3 pb-3 border-b border-1 border-white">
                <h3 class="text-center text-xl font-semibold text-shadow">
                  Your Favourites movie
                </h3>
              </div>
            </div>
          </div>
          <div
            class="mt-3 w-1/2 md:w-full grid md:grid-cols-3 "
            style={{ paddingTop: "30px" }}
          >
            {favorites.map((movie) => {
              return <MovieCard key={movie._id} movie={movie} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

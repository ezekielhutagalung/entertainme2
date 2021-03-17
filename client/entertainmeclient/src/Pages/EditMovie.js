import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router";

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
    }
  }
`;

const GET_MOVIE_BY_ID = gql`
  query GetMovie($movieId: ID!) {
    movie(id: $movieId) {
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

const UPDATED_MOVIE = gql`
  mutation updateMovie($updateMovie: UpdateData) {
    updateMovie(updatedMovie: $updateMovie) {
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

export default function UpdateMovie() {
  const history = useHistory();
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, {
    variables: {
      movieId: id,
    },
  });
  console.log(data, "<<< di dalem Updated movie");

  const [title, settitle] = useState(data.movie.title);
  const [overview, setoverview] = useState(data.movie.overview);
  const [poster_path, setposterpath] = useState(data.movie.poster_path);
  const [popularity, setpopularity] = useState(data.movie.popularity);
  const [tags, settags] = useState(data.movie.tags.join(","));
  const [urlMov, seturlmov] = useState(data.movie.urlMov);

  const [editData, { data: tempdata }] = useMutation(UPDATED_MOVIE, {
    refetchQueries: [
      {
        query: GET_TRIP,
      },
    ],
  });

  //cara 1
  // const [editedMovie, seteditedMovie] = useState({
  //   title: data.movie.title,
  //   overview: data.movie.overview,
  //   poster_path: data.movie.poster_path,
  //   popularity: data.movie.popularity,
  //   tags: data.movie.tags,
  //   urlMov: data.movie.urlMov,
  // });

  // const onChange = (e) => {
  //   let { name, value } = e.target;

  // };

  const submitForm = (e) => {
    e.preventDefault();
    const mov = {
      id: data.movie._id,
      title,
      overview,
      poster_path,
      popularity,
      tags,
      urlMov,
    };
    // console.log(mov, "ini di mov");
    mov.popularity = parseFloat(popularity);
    mov.tags = tags.split(",");
    editData({
      variables: {
        updateMovie: mov,
      },
    });
    history.push("/");
  };

  return (
    <>
      <div class="container rounded-lg p-3 mx-auto px-5 relative p-5 lg:px-20 flex flex-col md:flex-row items-center justify-center">
        <form
          onSubmit={submitForm}
          class="w-full md:w-1/2 border border-red-500 p-6 bg-white bg-opacity-50"
        >
          <h2 class="text-2xl pb-3 font-semibold">Edit Movie</h2>
          <div>
            <div class="flex flex-col mb-3">
              <label class="name tracking-widest font-bold text-xl mb-2">
                Title
              </label>
              <input
                onChange={(e) => settitle(e.target.value)}
                type="text"
                name="title"
                value={title}
                class="px-3 py-2 bg-white border border-gray-900 focus:border-red-500 focus:outline-none focus:bg-gray-800 focus:text-white"
                autocomplete="off"
                required
              />
            </div>
            <div class="flex  flex-col mb-3 font-bold">
              <label for="overview tracking-widest font-bold text-xl mb-2">
                Overview
              </label>
              <textarea
                onChange={(e) => setoverview(e.target.value)}
                rows="4"
                value={overview}
                name="overview"
                required
                class="px-3 py-2 bg-white border border-gray-900 focus:border-red-500 focus:outline-none focus:bg-gray-800 focus:text-white"
              ></textarea>
            </div>
            <div class="flex flex-col mb-3 font-bold">
              <label class="email tracking-widest font-bold text-xl mb-2">
                poster_path
              </label>
              <input
                onChange={(e) => setposterpath(e.target.value)}
                type="text"
                value={poster_path}
                name="poster_path"
                class="px-3 py-2 bg-white border border-gray-900 focus:border-red-500 focus:outline-none focus:bg-gray-800 focus:text-white"
                autocomplete="off"
                required
              />
            </div>
            <div class="flex flex-col mb-3">
              <label class="name tracking-widest font-bold text-xl mb-2">
                popularity
              </label>
              <input
                onChange={(e) => setpopularity(e.target.value)}
                type="text"
                name="popularity"
                value={popularity}
                placeholder="input from 1-5"
                class="px-3 py-2 bg-white border border-gray-900 focus:border-red-500 focus:outline-none focus:bg-gray-800 focus:text-white"
                autocomplete="off"
                required
              />
            </div>
            <div class="flex flex-col mb-3">
              <label class="name tracking-widest font-bold text-xl mb-2">
                Url
              </label>
              <input
                onChange={(e) => seturlmov(e.target.value)}
                type="text"
                name="urlMov"
                value={urlMov}
                placeholder=""
                class="px-3 py-2 bg-white border border-gray-900 focus:border-red-500 focus:outline-none focus:bg-gray-800 focus:text-white"
                autocomplete="off"
                required
              />
            </div>
            <div class="relative">
              <label class="email tracking-widest font-bold text-xl mb-2">
                Tags
              </label>
              <input
                name="tags"
                onChange={(e) => settags(e.target.value)}
                value={tags}
                class="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter some tags"
                required
              />
              <div class="hidden">
                <div class="absolute z-40 left-0 mt-2 w-full">
                  <div class="py-1 text-sm bg-white rounded shadow-lg border border-gray-300">
                    <a class="block py-1 px-5 cursor-pointer hover:bg-indigo-600 hover:text-white">
                      Add tag "
                      <span class="font-semibold" x-text="textInput"></span>"
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div></div>
          </div>

          <div class="w-full pt-3">
            <button
              type="submit"
              class="w-full bg-white border border-red-500 px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-red-500 hover:text-white text-xl cursor-pointer"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

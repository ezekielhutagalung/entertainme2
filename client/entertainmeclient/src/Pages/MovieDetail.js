import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery, gql, useMutation } from "@apollo/client";
import { favMovie } from "../cache/index";

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

const GET_TRIP = gql`
  query GetData {
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

const DeleteMovie = gql`
  mutation deleteMov($id: ID!) {
    deleteMovie(id: $id) {
      message
    }
  }
`;

export default function MovieDetail() {
  const history = useHistory();
  const { id } = useParams();
  console.log(id, "ini id");

  const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, {
    variables: {
      movieId: id,
    },
  });

  console.log(data, "ini data di movie detail");

  const [deleteMovie, { data: deleteData }] = useMutation(DeleteMovie, {
    refetchQueries: [
      {
        query: GET_TRIP,
      },
    ],
  });

  const handleDelete = (id) => {
    const swaludin = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swaludin
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteMovie({
            variables: {
              id: data.movie._id,
            },
            refetchQueries: [
              {
                query: GET_TRIP,
              },
            ],
          });
          swaludin.fire("Deleted!", "Your file has been deleted.", "success");
          history.push("/");
        }
      });
  };

  const handleEdit = () => {
    history.push(`/movies/edit/${id}`);
  };

  const handleFavourite = (movie) => {
    // console.log(movie, "ini isi darta movie di movie detail");
    const data = favMovie();
    let isFav = false;

    // console.log(data.length, "ini data di favorit");

    for (let i = 0; i < data.length; i++) {
      // console.log(data[i], "ini data di favorit");
      if (data[i]._id === movie._id) {
        isFav = true;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Already added to favorites!",
        });
      }
    }

    if (!isFav) {
      Swal.fire("Done!", "You have add this to favorites", "success");
      favMovie([movie, ...data]);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error...</p>;
  }

  return (
    <>
      <div class="ml-5 py-52">
        <div class="ml-10 max-w-screen-md bg-white rounded-lg shadow-lg md:flex">
          <img
            class="md:w-1/2 rounded-t-lg md:rounded-t-none  md:rounded-l-lg"
            src={data.movie.poster_path}
            alt="City"
          />

          <div class="p-6">
            <h2 class="font-bold mb-2 text-2xl text-purple-800">
              {data.movie.title}
            </h2>
            <p class="text-gray-700">{data.movie.overview}</p>
            <div class="font-bold text-xl mb-2">
              Rating: {data.movie.popularity}
            </div>
            <div class="px-6 py-4">
              {data.movie.tags.map((tag) => {
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
            <button
              onClick={(id) => handleDelete(id)}
              class=" text-black tracking-wider text-opacity-100 font-bold bg-white bg-opacity-40 border border-white px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-opacity-10 text-lg"
            >
              Delete
            </button>
            <button
              onClick={() => handleFavourite(data.movie)}
              class=" text-black tracking-wider text-opacity-100 font-bold bg-white bg-opacity-40 border border-white px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-opacity-10 text-lg"
            >
              Add To Favourite
            </button>

            <button
              onClick={() => handleEdit()}
              class=" text-black tracking-wider text-opacity-100 font-bold bg-white bg-opacity-40 border border-white px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-opacity-10 text-lg"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

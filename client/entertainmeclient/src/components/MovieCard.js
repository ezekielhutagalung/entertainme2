import React, { useEffect, useState } from "react";
import "../App.css";
import Swal from "sweetalert2";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

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
    series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export default function MovieCard({ movie }) {
  const history = useHistory();
  const handleDetail = (id) => {
    history.push(`/movies/${movie._id}`);
  };
  const [url, seturl] = useState([]);

  // console.log(movie.urlMov, " ini url mov");

  useEffect(() => {
    let Link = movie.urlMov;
    seturl(Link.split("&").slice(0, 1).join().replace("watch?v=", "embed/"));
  }, [url]);

  return (
    // <div class="container align item-center">
    <div class="w-3/4 min-w-0 md:min-w-0 rounded-lg overflow-hidden shadow-lg">
      <button>
        <div className=" absolute z-10 w-56 bg-transparent transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
          <iframe
            className="absolute inset-0 w-20 sm:w-auto  h-full object-cover object-center"
            src={`${url}?rel=0&modestbranding=1&autohide=1&mute=1&showinfo=0&controls=0&autoplay=1`}
            frameborder="0"
            allow="autoplay"
            allowfullscreen
          ></iframe>
          <div className="h-52"></div>
        </div>
        <img
          src={movie.poster_path}
          alt=""
          class=" transform scale-90 transition transform hover:scale-100 overflow-hidden"
        />
      </button>
      <button
        onClick={handleDetail}
        class=" text-black tracking-wider text-opacity-70 bg-white bg-opacity-40 border border-white px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-opacity-10 text-lg"
      >
        Detail
      </button>
    </div>
    // </div>
  );
}

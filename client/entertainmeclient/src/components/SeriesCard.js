import React, { useEffect, useState } from "react";
import "../App.css";
import { useHistory } from "react-router-dom";

export default function SeriesCard({ tvseries }) {
  const history = useHistory();
  const handleDetail = (id) => {
    history.push(`/tvseries/${tvseries._id}`);
  };
  console.log(tvseries, "ini tvSERIESSS");
  const [url, seturl] = useState([]);
  // console.log(tvseries, " ini url series");

  useEffect(() => {
    let Link = tvseries.urlSer;
    seturl(Link.split("&").slice(0, 1).join().replace("watch?v=", "embed/"));
  }, [url]);

  return (
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
          src={tvseries.poster_path}
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
      {/* <div class="px-2 py-1">
        <div class="font-bold w-52 max-w-md min-w-min mb-2">
          The Coldest Sunset
        </div>
        <p class="text-gray-700 w-auto max-w-md min-w-min ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
      <div class="px-2 py-1">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          #winter
        </span>
      </div> */}
    </div>
  );
}

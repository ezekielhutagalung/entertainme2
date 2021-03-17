import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  const history = useHistory();
  const goToMovie = () => {
    history.push(`/movies`);
  };
  return (
    <div className="z-50 h-screen sticky top-0 flex flex-col w-56 bg-gradient-to-r from-purple-400 md:from-yellow-500 rounded-r-3xl shadow-lg overflow-hidden">
      <div className=" flex items-center justify-center h-20  shadow-lg ">
        <img
          src="https://www.nicepng.com/png/full/436-4364406_red-weed-leaf-png-trippy-weed-leaf-trippy.png"
          class="h-20 mr-16 transform scale-90 transition transform hover:scale-100 overflow-hidden"
        />
      </div>
      <ul className="flex flex-col py-4 ">
        <li>
          <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <i className="bx bx-home"></i>
            </span>
            <Link to="/">
              <span className="text-md text-black tracking-widest font-bold">
                Home
              </span>
            </Link>
          </div>
        </li>

        <li>
          <Link to="/movies">
            <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bx bx-music"></i>
              </span>

              <span className="text-md text-black tracking-widest font-bold">
                Movie
              </span>
            </div>
          </Link>
        </li>

        <li>
          <Link to="/tvseries">
            <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bx bx-drink"></i>
              </span>
              <span className="text-md text-black tracking-widest font-bold">
                Series
              </span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/addmovies">
            <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bx bx-shopping-bag"></i>
              </span>
              <span className="text-md text-black tracking-widest font-bold">
                Add Movie
              </span>
            </div>
          </Link>
          <Link to="/favorites">
            <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bx bx-shopping-bag"></i>
              </span>
              <span className="text-md text-black tracking-widest font-bold">
                Your Favorite
              </span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

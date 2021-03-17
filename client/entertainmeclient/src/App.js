import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import client from "./config/indexapollo";
import Navbar from "./components/navbar";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import Tvseries from "./Pages/Series";
import MovieDetail from "./Pages/MovieDetail";
import SeriesDetail from "./Pages/SeriesDetail";
import AddMovie from "./Pages/AddMovie";
import Favourite from "./Pages/FavoritesPage";
import EditMovie from "./Pages/EditMovie";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className=" bg-fixed bg-cover bg-opacity-75 md:bg-opacity-50 min-h-screen flex flex-row ">
          <Navbar />
          <Switch>
            <Route path="/tvseries/:id">
              <SeriesDetail />
            </Route>
            <Route path="/movies/edit/:id">
              <EditMovie />
            </Route>
            <Route path="/movies/:id">
              <MovieDetail />
            </Route>
            <Route path="/addmovies">
              <AddMovie />
            </Route>
            <Route path="/favorites">
              <Favourite />
            </Route>
            <Route path="/tvseries">
              <Tvseries />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

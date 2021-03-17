const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
  type Query {
    movies: [Movie]
    Tvseries: [Tvseries]
    movie(id: ID): Movie
    tvseries(id: ID): Tvseries
  }

  type Status {
    message: String
  }

  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
    urlMov: String
  }

  type Tvseries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
    urlSer: String
  }

  input AddInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
    urlMov: String
  }

  input inputDelete {
    _id: ID!
  }

  input AddSeriesInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
    urlSer: String
  }

  input UpdateData {
    id: ID!
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
    urlMov: String
  }

  input UpdateSeriesData {
    id: ID!
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
    urlSer: String
  }

  type Mutation {
    addMovie(newMovie: AddInput): Movie
    addSeries(newSeries: AddSeriesInput): Tvseries
    updateMovie(updatedMovie: UpdateData): Movie
    updateSeries(updatedSeries: UpdateSeriesData): Tvseries
    deleteMovie(id: ID!): Status
    deleteSeries(id: ID!): Status
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const cache = await redis.get("movies:data");
        if (cache) {
          // console.log(JSON.parse(cache), "ini dari cache")
          return JSON.parse(cache);
        } else {
          const movies = await axios({
            method: "GET",
            url: "http://localhost:4001/movies",
          });
          await redis.set("movies:data", JSON.stringify(movies.data));
          console.log(movies.data, "di iget movies");
          return movies.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    Tvseries: async () => {
      try {
        const cache = await redis.get("tvseries:data");
        if (cache) {
          return JSON.parse(cache);
        } else {
          const tvseries = await axios({
            method: "GET",
            url: "http://localhost:4002/tvseries",
          });
          await redis.set("tvseries:data", JSON.stringify(tvseries.data));
          // console.log(tvseries.data, "ini di orchestra yg atas tvseries");
          return tvseries.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    movie: async (_, args) => {
      try {
        const { id } = args;
        const movies = await axios({
          method: "GET",
          url: `http://localhost:4001/movies/${id}`,
        });
        // console.log(movies.data, "ini di movies data");
        return movies.data;
      } catch (err) {
        console.log(err);
      }
    },
    tvseries: async (_, args) => {
      try {
        const { id } = args;
        console.log(id, "ini di movie id");
        const movies = await axios({
          method: "GET",
          url: `http://localhost:4002/tvseries/${id}`,
        });
        console.log(movies.data, "ini get data di orchestrator tv series");
        return movies.data;
      } catch (err) {
        console.log(err.message);
      }
    },
  },
  Mutation: {
    addMovie: async (_, args) => {
      console.log(args, "di args");
      try {
        const newMovie = {
          title: args.newMovie.title,
          overview: args.newMovie.overview,
          poster_path: args.newMovie.poster_path,
          popularity: args.newMovie.popularity,
          tags: args.newMovie.tags,
          urlMov: args.newMovie.urlMov,
        };
        console.log(newMovie, "ini new movie");
        const movie = await axios({
          method: "POST",
          url: "http://localhost:4001/movies",
          data: newMovie,
        });
        await redis.del("movies:data");
        console.log(movie.data, "data movie");
        return movie.data;
      } catch (err) {
        console.log(err.message);
      }
    },
    addSeries: async (_, args) => {
      console.log(args, "di args");
      try {
        const newSeries = {
          title: args.newSeries.title,
          overview: args.newSeries.overview,
          poster_path: args.newSeries.poster_path,
          popularity: args.newSeries.popularity,
          tags: args.newSeries.tags,
          urlSer: args.newSeries.urlSer,
        };
        console.log(newSeries, "ini new movie");
        const movie = await axios({
          method: "POST",
          url: "http://localhost:4002/tvseries",
          data: newSeries,
        });
        await redis.del("movies:data");
        // console.log(movie.data, "data movie");
        return movie.data;
      } catch (err) {
        console.log(err.message);
      }
    },
    deleteMovie: async (_, args) => {
      try {
        console.log(args.id, "masuk sini nihhh broo");
        const movie = await axios({
          method: "DELETE",
          url: `http://localhost:4001/movies/${args.id}`,
        });
        console.log(movie, "ini di delte movie");
        await redis.del("movies:data");
        return movie.data;
      } catch (err) {
        console.log(err.message);
      }
    },
    deleteSeries: async (_, args) => {
      try {
        // console.log("masuk sini nihhh broo");
        const series = await axios({
          method: "DELETE",
          url: `http://localhost:4002/tvseries/${args.id}`,
        });
        await redis.del("tvseries:data");
        return series.data;
      } catch (err) {
        console.log(err.message);
      }
    },
    updateMovie: async (_, args) => {
      try {
        // console.log(args, "<<<< di update movie");
        const updatedMovie = {
          title: args.updatedMovie.title,
          overview: args.updatedMovie.overview,
          poster_path: args.updatedMovie.poster_path,
          popularity: args.updatedMovie.popularity,
          tags: args.updatedMovie.tags,
          urlMov: args.updatedMovie.urlMov,
        };
        // console.log(updatedMovie, "ini updated movie shaaay");
        // console.log(args.updatedMovie.id, "ini id");
        const movie = await axios({
          method: "PUT",
          url: `http://localhost:4001/movies/${args.updatedMovie.id}`,
          data: updatedMovie,
        });
        await redis.del("movies:data");
        console.log(movie, "ini di update movie");
        return movie.data;
      } catch (err) {
        console.log(err.message);
      }
    },
    updateSeries: async (_, args) => {
      try {
        const updatedSeries = {
          title: args.updatedSeries.title,
          overview: args.updatedSeries.overview,
          poster_path: args.updatedSeries.poster_path,
          popularity: args.updatedSeries.popularity,
          tags: args.updatedSeries.tags,
          urlSer: args.updatedSeries.urlSer,
        };
        const series = await axios({
          method: "PUT",
          url: `http://localhost:4002/tvseries/${args.updatedSeries.id}`,
          data: updatedSeries,
        });
        await redis.del("tvseries:data");
        console.log(series, "ini di update movie");
        return series.data;
      } catch (err) {
        console.log(err.message);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(` 💋 Server ready at ${url}`);
});

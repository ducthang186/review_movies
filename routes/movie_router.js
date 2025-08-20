import express from "express";
import MoviesDAO from "../models/moviesDAO.js";
import MoviesController from "../controllers/moviesController.js";

const movies_router = express.Router();
// movies_router.get("/", async (req, res) => {
//   res.send("Movie Router is working!");
// });
movies_router.route("/").get(MoviesController.apiGetMovies);
movies_router.route("/ratings").get(MoviesController.apiGetRatings);
movies_router.route("/:movie_id").get(MoviesController.apiGetMovieById);
export default movies_router;

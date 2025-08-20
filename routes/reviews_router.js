import express from "express";
import ReviewsController from "../controllers/reviewController.js";
const reviews_router = express.Router();
// reviews_router.route('/').post(ReviewsController.apiAddReview)
// reviews_router.route('/').put(ReviewsController.apiUpdateReview)
// reviews_router.route('/').delete(ReviewsController.apiDeleteReview)
reviews_router
  .route("/")
  .post(ReviewsController.apiAddReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);
export default reviews_router;

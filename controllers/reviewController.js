import ReviewsDAO from "../models/reviewsDAO.js";
export default class ReviewsController {
  static async apiAddReview(req, res, next) {
    try {
      const movieId = req.body.movie_id;
      const user_id = req.body.user_id;
      const user_name = req.body.user_name;
      const review = req.body.review;
      const date = new Date();
      const ReviewResponse = await ReviewsDAO.addReview(
        movieId,
        user_id,
        user_name,
        review,
        date
      );
      res.json({ status: "success", data: ReviewResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const review = req.body.review;
      const date = new Date();
      const ReviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        review,
        date
      );
      var { error } = ReviewResponse;
      if (error) {
        res.status.json({ error });
      }
      res.json({ status: "success " });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const ReviewResponse = await ReviewsDAO.deleteReview(reviewId);
      res.json({ status: "success " });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

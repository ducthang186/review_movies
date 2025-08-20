import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

let reviews;
export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn
        .db(process.env.MOVIE_REVIEW_DBNAME)
        .collection("reviews");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in moviesDAO: ${e}`
      );
    }
  }
  static async addReview(movieId, user_id, user_name, review, date) {
    try {
      const reviewDoc = {
        user_id: ObjectId.createFromHexString(user_id),
        user_name: user_name,
        date: date,
        review: review,
        movie_id: ObjectId.createFromHexString(movieId),
      };
      return await reviews.insertOne(reviewDoc);
    } catch (error) {}
  }
  static async updateReview(reviewId, review, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: ObjectId.createFromHexString(reviewId) },
        { $set: { review: review, date: date } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`unable to update review: ${e}`);
      return { error: e };
    }
  }
  static async deleteReview(reviewId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId.createFromHexString(reviewId),
      });
      return deleteResponse;
    } catch (e) {
      console.error(`unable to delete review: ${e}`);
      return { error: e };
    }
  }
  // static async getAllReviews(){
  //   try {
  //     const res =  await
  //   } catch (err) {
  //     console.log(`error: ${err}`)
  //   }
  // }
}

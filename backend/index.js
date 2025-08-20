import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import MoviesDAO from "./models/moviesDAO.js";
import ReviewsDAO from './models/reviewsDAO.js';
async function main() {
  dotenv.config();
  const client = new mongodb.MongoClient(process.env.MOVIE_REVIEWS_APP_URI);
  const port = process.env.PORT || 8000;
  try {
    await client.connect();
    await MoviesDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    await ReviewsDAO.injectDB(client)

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
main().catch(console.error);

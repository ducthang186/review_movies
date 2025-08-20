import mongodb from "mongodb";
let comments;
const ObjectId = mongodb.ObjectId; // initialize ObjectId from mongodb

export default class CommentsDAO {
  static async injectDB(conn) {
    if (comments) {
      return;
    }
    try {
        comments = await conn.db(process.env.MOVIE_REVIEW_DBNAME).collection("comments");
    } catch (e) {
        console.error(
            `Unable to establish a collection handle in commentsDAO: ${e}`
        );
    }
  }
  static async  getComments({filters = null, page =0 , commentsPerPage = 20}){
    let query;
    if(filters){
        if('name' in filters){
            query = {$text: {$search: filters['name']} };
        } else if("email" in filters){
            query = { email: {$text: filters['email']}}
        }
    }
    let cursor;
    
    try {
        cursor = await comments.find(query).limit(commentsPerPage).skip(commentsPerPage * page);
        const commmentList = await cursor.toArray();
        const totalNumComments = await comments.countDocuments(query);
        return {commmentList, totalNumComments}
    } catch (err) {
        console.error(`something when wrong in getComments: ${err}`)
        return {commmentList: [], totalNumComments: 0}
    }

  }    
}

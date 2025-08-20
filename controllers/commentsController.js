import CommentsDAO  from "../models/commentsDAO";

export default class CommentsController{
    static async apiGetComments (req, res, next){
        const commentsPerPage = req.query.commentsPerPage
    }
}
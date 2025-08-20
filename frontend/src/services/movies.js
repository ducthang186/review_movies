import axios from "axios"

class MovieDataService{
  getAll(page = 0){
    return axios.get(`http://localhost:5000/movies?page=${page}`)
    //return axios.get(`http://localhost:5000/movies?`, {params: {page: page}})
  }
  get(id){
    return axios.get(`http://localhost:5000/movies/${id}`)
  }
  find(query, by = "title", page = 0){
    return axios.get(`http://localhost:5000/movies?${by}=${query}&page=${page}`)
  }
  createReview(data){
    return axios.post("http://localhost:5000/reviews", data)
  }
  updateReview(data){
    return axios.put("http://localhost:5000/reviews", data)
  }
  deleteReview(data){
    return axios.delete("http://localhost:5000/reviews", data)
  }
  getRatings(){
    return axios.get("http://localhost:5000/movies/ratings")
  }
}
const movieDataServiceInstance = new MovieDataService()

export default movieDataServiceInstance
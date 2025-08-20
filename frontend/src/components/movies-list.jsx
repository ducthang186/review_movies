import React from "react";
import Search from "./search"
import { useState, useEffect } from "react"
import MovieDataService from "../services/movies"
import { Link } from "react-router-dom"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button'

function MoviesList(){
  const [movies, setMovies] = useState([])
  const [ratings, setRatings] = useState(["All Ratings"])
  const [currentPage, setCurrentPage] = useState(0)
  const [entriesPerPage, setEntriesPerPage] = useState(20)
  const [query, setQuery] = useState("")
  const [findBy, setFindBy] = useState("")

  useEffect(() => {
      retrieveMovies()
      retrieveRatings()
  }, [])

  useEffect(() => {
      getNextPage()
  }, [currentPage])

  const getNextPage = () => {
    if (query === "All Ratings" || query === "")
        retrieveMovies()
    else
        findMovies(query, findBy)

  }

  const retrieveMovies = () =>{
      MovieDataService.getAll(currentPage).then(response =>{
          setMovies(response.data.movies)
          setCurrentPage(response.data.page)
          setEntriesPerPage(response.data.entries_per_page)
      }).catch( e =>{
          console.log(e)
      })
  }

  const retrieveRatings = () =>{
      MovieDataService.getRatings().then(response =>{
          setRatings(["All Ratings"].concat(response.data))
      }).catch( e =>{
          console.log(e)
      })
  }

  const findMovies = (query, by) => {
    MovieDataService.find(query, by, currentPage).then(response =>{
        setMovies(response.data.movies)
    }).catch( e =>{
        console.log(e)
    })
  }

  const setSearchParams = (query, by) => {
    setQuery(query)
    setFindBy(by)
    setCurrentPage(0)
    if (query === "All Ratings")
        retrieveMovies()
    else
        findMovies(query, by)
  }

  return(
    <>
        <Search
            setSearchParams = {setSearchParams}
            ratings={ratings}
        />
        <Row>
            {movies.map((movie) =>{
                return(
                    <Col>
                        <Card style={{ width: '18rem'}}>
                            <Card.Img src={movie.poster+"/100px180"}/>
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>
                                    Rating: {movie.rated}
                                </Card.Text>
                                <Card.Text>{movie.plot}</Card.Text>
                                <Link to={"/movies/" + movie._id} >View Reviews</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })}
        </Row>
        <br />
        Showing page: {currentPage + 1}
        <Button variant="link" onClick={() => {setCurrentPage(currentPage + 1)}}>
            Get next {entriesPerPage} results
        </Button>
    </>

  )
}
export default MoviesList
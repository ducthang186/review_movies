import React from "react";
import Card from 'react-bootstrap/Card'
import Container  from "react-bootstrap/Container"
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import Stack from 'react-bootstrap/Stack'
import { useState, useEffect } from 'react'
import MovieDataService from '../services/movies'
import { Link } from 'react-router-dom'
import moment from 'moment'

function MovieDetail({user}){
    const [movie, setMovie] = useState({
          id: null,
          title: "",
          rated: "",
          reviews:[]
      })
    
    const {id: movie_id} = useParams()

    function getMovie(id){
        MovieDataService.get(id).then(response => {
            setMovie(response.data)
        }).catch(e =>{
            console.log(e)
        })      
    }

    useEffect(()=>{
        getMovie(movie_id)
    },[movie_id])

    function deleteReview(reviewId, index){
        MovieDataService.deleteReview({review_id:reviewId}).then(response => {
            setMovie((prevState) => {
                prevState.reviews.splice(index,1)
                return({
                    ...prevState
                })
            })
        }).catch(e =>{
            console.log(e)
        })
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                    <Image src={movie.poster+"/100px250"} fluid />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {movie.plot}
                                </Card.Text>
                                {user &&
                                <Link to={`/movies/${movie_id}/review`}>
                                    Add Review
                                    </Link>}
                            </Card.Body>
                        </Card>
                        <br></br>    
                        <h2>Reviews</h2>
                        <br></br>
                        {movie.reviews.map((review, index)=>{
                            return (
                            <Stack key={index} direction="horizontal" gap={3} className="mb-3">
                                <div>
                                    <h5>{review.user_name + " reviewed on "} {moment(review.date).format("Do MMM YYYY")} </h5>
                                    <p>{review.review}</p>
                                    {user && user.id === review.user_id &&
                                        <Row>
                                            <Col>
                                                <Link to={{
                                                    pathname:"/movies/"+movie_id+"/review",
                                                    state: {currentReview: review}
                                                }}>Edit</Link>
                                            </Col>
                                            <Col><Button variant="link" onClick={() => deleteReview(review._id, index)}>
                                                Delete</Button></Col>
                                        </Row>
                                        }
                                </div>
                            </Stack>)
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default MovieDetail
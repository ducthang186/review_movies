import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useRef } from "react";

function Search({ setSearchParams, ratings }) {
  const searchTitle = useRef(null);
  const searchRating = useRef(null);

  function findByTitle() {
    setSearchParams(searchTitle.current.value, "title");
  }

  function findByRating() {
    setSearchParams(searchRating.current.value, "rated");
  }

  return (
    <>
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search by title"
                defaultValue=""
                ref={searchTitle}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={findByTitle}>
              Search
            </Button>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control as="select" ref={searchRating}>
                {ratings.map((rating) => {
                  return <option value={rating}>{rating}</option>;
                })}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="button" onClick={findByRating}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Search;

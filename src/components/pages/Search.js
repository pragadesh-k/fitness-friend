import {
  Container,
  Navbar,
  Form,
  FormControl,
  Button,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import React, { Component } from "react";

class Search extends Component {
  inititalState = {
    searchitem: "",
  };

  state = this.inititalState;

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitForm = (event) => {
    event.preventDefault();
    this.props.handleSearch(this.state.searchitem);
    this.setState(this.inititalState); // clear field
  };

  render() {
    const { searchitem } = this.state;

    return (
      <Container className="mt-3 bg-light" style={style.container}>
        <div className="search-content">
          <SearchBar
            value={searchitem}
            handleChange={this.handleChange}
            submitForm={this.submitForm}
          />
          <SearchResult
            searchResult={this.props.searchResult}
            handleMeal={this.props.handleMeal}
            userSelectedMealType={this.props.userSelectedMealType}
          />
        </div>
      </Container>
    );
  }
}

const SearchBar = (props) => {
  return (
    <Navbar className="bg-light" style={{ marginTop: "1rem" }}>
      <Form className="form-inline mx-auto" onSubmit={props.submitForm}>
        <FormControl
          name="searchitem"
          type="text"
          placeholder="Food name..."
          className="mr-sm-2"
          value={props.value}
          onChange={props.handleChange}
        />
        <Button variant="success" type="submit">
          search <FaSearch />
        </Button>
      </Form>
    </Navbar>
  );
};

const SearchResult = (props) => {
  return (
    <Container fluid>
      <Row>
        <SearchItems
          searchResult={props.searchResult}
          handleMeal={props.handleMeal}
          userSelectedMealType={props.userSelectedMealType}
        />
      </Row>
    </Container>
  );
};

const SearchItems = (props) => {
  const items = props.searchResult.map((item, index) => {
    return (
      <Card style={style.card}>
        <Card.Img
          variant="top"
          src={item.image}
          alt="image"
          height="250px"
          width="190px"
        />
        <Card.Body>
          <Card.Title style={{ textTransform: "capitalize" }}>
            {item.name}
          </Card.Title>
          <ListGroup className="list-group-flush">
            <ListGroupItem style={style.listItem}>
              Quantity :{item.quantity} g
            </ListGroupItem>
            <ListGroupItem style={style.listItem}>
              Cal :{item.calorie} Kcal
            </ListGroupItem>
            <ListGroupItem style={style.listItem}>
              Carb : {item.cabohydrate} g
            </ListGroupItem>
            <ListGroupItem style={style.listItem}>
              Protein : {item.protein} g
            </ListGroupItem>
            <ListGroupItem style={style.listItem}>
              Fat :{item.fat} g
            </ListGroupItem>
          </ListGroup>
          <div className="d-flex flex-column">
            <Button
              variant="outline-success"
              className="mt-1"
              onClick={() =>
                props.handleMeal(item.id, props.userSelectedMealType)
              }>
              Add Item
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  });
  return items;
};

const style = {
  listItem: {
    padding: ".5rem .5rem .5rem 0",
    backgroundColor: "white !important",
  },
  card: {
    width: "18rem",
    margin: "2rem",
    boxShadow: "0 0 5px rgba(0,0,0,0.2)",
  },
  container: {
    marginTop: "1rem",
    boxShadow: "0 0 10px 10px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
  },
};
export default Search;

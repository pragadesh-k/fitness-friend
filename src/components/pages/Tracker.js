import React, { Component } from "react";
import {
  Accordion,
  Container,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

class Tracker extends Component {
  renderTrackerComponent = () => {
    if (this.props.calorieGoal > 0) {
      return (
        <>
          <CalorieBucket
            calorieReached={this.props.calorieReached}
            calorieGoal={this.props.calorieGoal}
          />
          <FoodTracker
            breakFast={this.props.breakFast}
            morningSnack={this.props.morningSnack}
            lunch={this.props.lunch}
            eveningSnack={this.props.eveningSnack}
            dinner={this.props.dinner}
            handleMealType={this.props.handleMealType}
            handleDelete={this.props.handleDelete}
          />
        </>
      );
    }
    return <CalorieForm setCalorieGoal={this.props.setCalorieGoal} />;
  };

  render() {
    return (
      <Container className="bg-light mt-md-3" style={style.container}>
        <div className="tracker-content p-4">
          {this.renderTrackerComponent()}
        </div>
      </Container>
    );
  }
}

class CalorieForm extends Component {
  state = {
    calorie: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  submitForm = (event) => {
    event.preventDefault();
    this.props.setCalorieGoal(parseInt(this.state.calorie));
  };
  render() {
    const { calorie } = this.state;

    return (
      <Container>
        <Form className="text-center" onSubmit={this.submitForm}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label
              className="text-success"
              style={{
                fontSize: "1.2rem",
                textTransform: "capitalize",
                fontWeight: "600",
              }}>
              Daily calorie Target.
            </Form.Label>
            <Form.Control
              name="calorie"
              type="number"
              placeholder="Enter calorie target.."
              min="1"
              value={calorie}
              onChange={this.handleChange}
            />
            <Button className="mt-3 submit-btn" variant="success" type="submit">
              Submit
            </Button>
            <Form.Text className="text-muted">
              Click submit and start tracking!
            </Form.Text>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

const CalorieBucket = (props) => {
  return (
    <div className="calorie-bucket title" style={style.calorieBucket}>
      Today's Calorie : {props.calorieReached} / {props.calorieGoal} KCAL
    </div>
  );
};

const FoodTracker = (props) => {
  return (
    <Accordion style={style.accordion}>
      <Card className="bg-light meal-card">
        <Accordion.Item eventKey="0">
          <Card.Header className="d-flex justify-content-between">
            <Accordion.Header as="div" className="my-auto">
              Breakfast
            </Accordion.Header>
            <Add handleMealType={props.handleMealType} name="breakfast" />
          </Card.Header>
          <Accordion.Body>
            <Card.Body>
              <MealList
                meal={props.breakFast}
                handleDelete={props.handleDelete}
                name="breakfast"
              />
            </Card.Body>
          </Accordion.Body>
        </Accordion.Item>
      </Card>

      <Card className="bg-light meal-card">
        <Accordion.Item eventKey="1">
          <Card.Header className="d-flex justify-content-between">
            <Accordion.Header as="div">Morning Snack</Accordion.Header>
            <Add handleMealType={props.handleMealType} name="morningsnack" />
          </Card.Header>
          <Accordion.Body>
            <Card.Body>
              <MealList
                meal={props.morningSnack}
                handleDelete={props.handleDelete}
                name="morningsnack"
              />
            </Card.Body>
          </Accordion.Body>
        </Accordion.Item>
      </Card>
      <Card className="bg-light meal-card">
        <Accordion.Item eventKey="2">
          <Card.Header className="d-flex justify-content-between">
            <Accordion.Header as="div">Lunch</Accordion.Header>
            <Add handleMealType={props.handleMealType} name="lunch" />
          </Card.Header>
          <Accordion.Body>
            <Card.Body>
              <MealList
                meal={props.lunch}
                handleDelete={props.handleDelete}
                name="lunch"
              />
            </Card.Body>
          </Accordion.Body>
        </Accordion.Item>
      </Card>
      <Card className="bg-light meal-card">
        <Accordion.Item eventKey="3">
          <Card.Header className="d-flex justify-content-between">
            <Accordion.Header as="div">Evening snack</Accordion.Header>
            <Add handleMealType={props.handleMealType} name="eveningsnack" />
          </Card.Header>
          <Accordion.Body>
            <Card.Body>
              <MealList
                meal={props.eveningSnack}
                handleDelete={props.handleDelete}
                name="eveningsnack"
              />
            </Card.Body>
          </Accordion.Body>
        </Accordion.Item>
      </Card>
      <Card className="bg-light meal-card">
        <Accordion.Item eventKey="4">
          <Card.Header className="d-flex justify-content-between meal-header">
            <Accordion.Header as="div">Dinner</Accordion.Header>
            <Add handleMealType={props.handleMealType} name="dinner" />
          </Card.Header>
          <Accordion.Body>
            <Card.Body>
              <MealList
                meal={props.dinner}
                handleDelete={props.handleDelete}
                name="dinner"
              />
            </Card.Body>
          </Accordion.Body>
        </Accordion.Item>
      </Card>
    </Accordion>
  );
};

const Add = (props) => {
  return (
    <div className="d-flex justify-content-center">
      <Link to="/search-item">
        <Button
          variant="success rounded-circle"
          style={{ backgroundColor: "transparent", border: "0" }}
          onClick={() => props.handleMealType(props.name)}>
          <FaPlusCircle color="#2cbf6a" size="1.2rem" />
        </Button>
      </Link>
    </div>
  );
};

const MealList = (props) => {
  const list = props.meal.map((item, index) => {
    return (
      <ListGroupItem
        key={index}
        className="d-flex justify-content-between bg-light food-item">
        <div>
          <span>
            {item.name} <small className="text-muted">{item.quantity}g</small>
          </span>
        </div>
        <span>
          {item.calorie} cal{" "}
          <span onClick={() => props.handleDelete(props.name, index)}>
            <MdDelete className="delete-icon text-muted" />
          </span>
        </span>
      </ListGroupItem>
    );
  });

  const noItem = (
    <div className="text-muted text-center my-auto">"No Items"</div>
  );
  return (
    <ListGroup className="list-group-flush">
      {list.length !== 0 ? list : noItem}
    </ListGroup>
  );
};

const style = {
  accordion: {
    marginTop: "2rem",
    borderRadius: "0px",
  },

  container: {
    boxShadow: "0 0 10px 10px rgba(0, 0, 0, 0.1)",
    height: "630px",
    minHeight: "630px",
  },

  calorieBucket: {
    textTransform: "uppercase",
    marginTop: "1rem",
    color: "#2cbf6a",
  },
};

export default Tracker;

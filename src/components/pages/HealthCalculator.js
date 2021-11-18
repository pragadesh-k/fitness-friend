import React, { Component } from "react";
import { BMI, BMR, calorieNeeds, macros } from "fitness-calculator";
import {
  Container,
  Form,
  Row,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Button,
  ListGroup,
} from "react-bootstrap";
import { IoFitnessSharp } from "react-icons/io5";

// TOP level component
class HealthCalculator extends Component {
  // .. STATE
  state = {
    result: [],
    goal: "",
  };

  // .. METHODS
  handleSubmit = (result, goal) => {
    this.setState({ result: result, goal: goal });
  };

  showResult = () => {
    return this.state.result.length !== 0 ? (
      <Result
        result={this.state.result}
        goal={this.state.goal}
        setCalorieGoal={this.props.setCalorieGoal}
      />
    ) : (
      <></>
    );
  };

  // .. RENDERING
  render() {
    return (
      <Container style={style.container} className="bg-light mt-md-3">
        <div id="calculator-content">
          <Heading />
          <UserForm handleSubmit={this.handleSubmit} />
          {this.showResult()}
        </div>
      </Container>
    );
  }
}

// COMPONENTS
const Heading = (props) => {
  return (
    <h3 className="title" style={style.heading}>
      calculate your Calorie Target.
    </h3>
  );
};

// select option component
const Option = (props) => {
  const optionList = props.options.map((option, index) => {
    return (
      <option className="text-muted" key={index}>
        {option}
      </option>
    );
  });
  return optionList;
};

// Calculation result
const Result = (props) => {
  const bmi = props.result[0];
  const bmr = props.result[1];
  const calorieneeds = props.result[2];
  const macrosCal = props.result[3]["balancedDietPlan"];
  return (
    <div>
      <ListGroup className="result my-4">
        <ListGroup.Item style={style.listItem} className="result-item">
          <div className="d-inline title">BMI : </div>
          <span> {bmi}</span>
        </ListGroup.Item>
        <ListGroup.Item style={style.listItem} className="result-item">
          <div className="d-inline title">BMR : </div>
          <span> {bmr} Kcal</span>
        </ListGroup.Item>
        <ListGroup.Item style={style.listItem} className="result-item">
          <div className="d-inline title">Target Calories : </div>
          <span> {calorieneeds} Kcal</span>
        </ListGroup.Item>
        <ListGroup.Item style={style.listItem} className="result-item">
          <div className="title">Target Macros</div>
          <ul className="mt-2">
            <li className="mb-1">Carbohydrate : {macrosCal.carb}g</li>
            <li className="mb-1">Protein : {macrosCal.protein}g</li>
            <li className="mb-1">Fats : {macrosCal.fat}g</li>
          </ul>
        </ListGroup.Item>
      </ListGroup>
      <div className="d-flex">
        <Button
          type="button"
          className="mx-auto default-btn"
          variant="outline-success"
          onClick={() => {
            props.setCalorieGoal(calorieneeds);
          }}>
          <IoFitnessSharp size="1.2rem" /> track
        </Button>
      </div>
    </div>
  );
};

// FORM COMPONENT
class UserForm extends Component {
  // duplicate state to clear fields
  initialState = {
    gender: "male",
    age: "",
    height: "",
    weight: "",
    activity: "sedentary",
    goal: "balance",
    activities: ["sedentary", "light", "moderate", "active", "extreme"],
    goals: [
      "balance",
      "mildWeightLoss",
      "mildWeightGain",
      "heavyWeightLoss",
      "heavyWeightGain",
    ],
    genders: ["Male", "Female"],
  };

  // .. STATE
  state = this.initialState;

  // .. METHODS
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  submitForm = (event) => {
    event.preventDefault();
    const result = this.fitnessCalculation();
    this.props.handleSubmit(result, this.state.goal);
    this.setState(this.initialState);
  };

  // calculation methods
  fitnessCalculation = () => {
    let { gender, age, height, weight, activity, goal } = this.state;

    age = parseInt(age);
    height = parseInt(height);
    weight = parseInt(weight);

    const bmiResult = BMI(height, weight);
    const bmrResult = BMR(gender, age, height, weight);
    const calorieNeedsResult = calorieNeeds(
      gender,
      age,
      height,
      weight,
      activity
    );
    var macroResult = macros(gender, age, height, weight, activity, goal);

    const result = [
      bmiResult,
      parseInt(bmrResult),
      parseInt(calorieNeedsResult[goal]),
      macroResult,
    ];

    return result;
  };

  // ..RENDERING
  render() {
    const {
      gender,
      age,
      height,
      weight,
      activity,
      goal,
      activities,
      goals,
      genders,
    } = this.state;

    return (
      <Form style={style.form} onSubmit={this.submitForm}>
        {/* 1st Row */}
        <Row className="mb-5 field-row">
          <Col>
            <FormGroup controlId="formBasicNumber">
              <FormLabel style={style.label}>gender</FormLabel>
              <FormControl
                style={style.box}
                as="select"
                value={gender}
                name="gender"
                onChange={this.handleChange}
                required>
                <Option options={genders} />
              </FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formBasicNumber">
              <FormLabel style={style.label}>age</FormLabel>
              <FormControl
                style={style.box}
                type="number"
                value={age}
                name="age"
                onChange={this.handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        {/* 2nd Row */}
        <Row className="mb-5 field-row">
          <Col>
            <FormGroup controlId="formBasicNumber">
              <FormLabel style={style.label}>height</FormLabel>
              <FormControl
                style={style.box}
                type="number"
                value={height}
                name="height"
                onChange={this.handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formBasicNumber">
              <FormLabel style={style.label}>weight</FormLabel>
              <FormControl
                style={style.box}
                type="number"
                value={weight}
                name="weight"
                onChange={this.handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        {/* 3rd row */}
        <Row className="mb-5 field-row">
          <Col>
            <FormGroup controlId="formBasicNumber">
              <FormLabel style={style.label}>activity</FormLabel>
              <FormControl
                style={style.box}
                as="select"
                value={activity}
                name="activity"
                onChange={this.handleChange}
                required>
                <Option options={activities} />
              </FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formBasicNumber">
              <FormLabel style={style.label}>goal</FormLabel>
              <FormControl
                style={style.box}
                as="select"
                name="goal"
                value={goal}
                onChange={this.handleChange}
                required>
                <Option options={goals} />
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
        <div className="d-flex w-100">
          <Button className="mx-auto submit-btn" type="submit">
            calculate
          </Button>
        </div>
      </Form>
    );
  }
}

//styling
const style = {
  box: {
    borderRadius: "0px",
    borderTop: "0px",
    borderRight: "0px",
    borderLeft: "0px",
    borderBottom: "2px solid rgba(0,0,0,0.2)",
    backgroundColor: "transparent",
  },

  container: {
    border: ".15rem solid #ececec",
    boxShadow: "0 0 10px 10px rgba(0, 0, 0, 0.1)",
  },

  form: {
    marginTop: "3rem",
  },

  label: {
    fontWeight: "600",
    textTransform: "capitalize",
    color: "rgba(0,0,0,0.4)",
  },
  listItem: {
    // backgroundColor: "red",
    border: "0px",
  },

  heading: {
    textTransform: "uppercase",
    marginTop: "1rem",
    color: "#2cbf6a",
  },
};

export default HealthCalculator;

import React, { Component } from "react";
import Header from "./components/header";
import SideNav from "./components/sidenav";
import Main from "./components/main";
import data from "./data.json";

import "./App.css";
import { Container, Row } from "react-bootstrap";

class App extends Component {
  state = {
    userselectedmealtype: "breakfast",
    data: [],
    caloriegoal: 0,
    caloriereached: 0,
    searchresult: [],
    breakfast: [],
    morningsnack: [],
    lunch: [],
    eveningsnack: [],
    dinner: [],
  };

  //MTHODS
  componentDidMount() {
    // fetch("./data.json")
    //   .then((response) => response.json())
    //   .then((data) => this.setState({ data: data }));
    this.setState({ data: data });
  }

  // Funtion to handle the food search
  handleSearch = (searchItem) => {
    // Filter food items data for the "search item"
    const result = this.state.data.filter((item, index) => {
      return item.name.includes(searchItem);
    });
    // update state with the item found
    this.setState({ searchresult: result });
  };

  handleMeal = (id, mealtype) => {
    const { searchresult, caloriereached } = this.state;
    const selectedItem = searchresult.filter((item, index) => {
      return item.id === id;
    });

    this.setState({
      [mealtype]: [...this.state[mealtype], selectedItem[0]],

      caloriereached: caloriereached + selectedItem[0].calorie,
    });
  };

  handleMealType = (name) => {
    this.setState({ userselectedmealtype: name });
  };

  handleDelete = (mealType, itemIndex) => {
    let deletedItem = this.state[mealType][itemIndex];

    const updatedMeal = this.state[mealType].filter((item, index) => {
      return index !== itemIndex;
    });

    this.setState({
      [mealType]: updatedMeal,
      caloriereached: this.state.caloriereached - deletedItem["calorie"],
    });
  };

  setCalorieGoal = (caloriegoal) => {
    this.setState({ caloriegoal: caloriegoal });
  };

  render() {
    const {
      caloriereached,
      caloriegoal,
      searchresult,
      breakfast,
      eveningsnack,
      lunch,
      morningsnack,
      dinner,
      userselectedmealtype,
    } = this.state;

    return (
      <>
        <Header />
        <Container fluid>
          <Row>
            <SideNav />
            <Main
              calorieReached={caloriereached}
              calorieGoal={caloriegoal}
              searchResult={searchresult}
              handleSearch={this.handleSearch}
              breakFast={breakfast}
              morningSnack={morningsnack}
              lunch={lunch}
              eveningSnack={eveningsnack}
              dinner={dinner}
              handleMeal={this.handleMeal}
              handleMealType={this.handleMealType}
              userSelectedMealType={userselectedmealtype}
              handleDelete={this.handleDelete}
              setCalorieGoal={this.setCalorieGoal}
            />
          </Row>
        </Container>
      </>
    );
  }
}

export default App;

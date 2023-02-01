import React, { Component } from "react";
// import Header from "./components/header";
// import SideNav from "./components/sidenav";
// import Main from "./components/main";
import data from "./data.json";

// import { Container, Row } from "react-bootstrap";
import LoginPage from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import { Routes, Route, Redirect, Navigate } from "react-router-dom";
import Tracker from "./components/pages/Tracker";
import HealthCalculator from "./components/pages/HealthCalculator";
import Search from "./components/pages/Search";
import NoPage from "./components/pages/NoPage";
import SignUp from "./components/pages/SignUp";

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
    baseUrl: "http://localhost:8000",
  };

  //MTHODS
  componentDidMount() {
    fetch("http://localhost:8000/food-items")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: data });
        console.log(data);
      });
    // fetch("http://localhost:8000/food-items", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     id: 100,
    //     name: "mutton",
    //     image: "images/egg.jpg",
    //     quantity: 200,
    //     calorie: 155,
    //     cabohydrate: 1.1,
    //     protein: 12.6,
    //     fat: 10.6,
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
    // this.setState({ data: data });
  }

  authenticate = async (username, password) => {};

  retrieveUser = (username) => {
    fetch(`${this.state.baseUrl}/users?username=${username}`);
  };

  createUser = (username, passsword) => {
    // check the user is exist
    // if not, create a new user and return true
    // else return false
  };

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
    const logo = <img src="logo192.png" height="80px" />;
    const appName = (
      <h1 className="app-name mt-2">
        <span className="logo-f">F</span>itness{" "}
        <span className="logo-f">F</span>riend
      </h1>
    );
    return (
      <>
        <Routes>
          <Route path="/" element={<Navigate to="login" replace />} />
          <Route
            path="login"
            element={
              <LoginPage
                logo={logo}
                appName={appName}
                authenticate={this.authenticate}
              />
            }></Route>
          <Route
            path="sign-up"
            element={<SignUp logo={logo} appName={appName} />}></Route>
          <Route path="dashboard" element={<Dashboard />}>
            <Route
              path="tracker"
              element={
                <Tracker
                  calorieReached={caloriereached}
                  calorieGoal={caloriegoal}
                  breakFast={breakfast}
                  morningSnack={morningsnack}
                  lunch={lunch}
                  eveningSnack={eveningsnack}
                  dinner={dinner}
                  handleMealType={this.handleMealType}
                  handleDelete={this.handleDelete}
                  setCalorieGoal={this.setCalorieGoal}
                />
              }></Route>
            <Route
              path="health-calculator"
              element={
                <HealthCalculator setCalorieGoal={this.setCalorieGoal} />
              }></Route>
            <Route
              path="search-item"
              element={
                <Search
                  searchResult={searchresult}
                  handleSearch={this.handleSearch}
                  handleMeal={this.handleMeal}
                  userSelectedMealType={userselectedmealtype}
                />
              }></Route>
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </>
    );
  }
}

export default App;

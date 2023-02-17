import React, { Component } from "react";
// import Header from "./components/header";
// import SideNav from "./components/sidenav";
// import Main from "./components/main";
import data from "./data.json";

// import { Container, Row } from "react-bootstrap";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import { Routes, Route, Redirect, Navigate } from "react-router-dom";
import Tracker from "./components/pages/Tracker";
import HealthCalculator from "./components/pages/HealthCalculator";
import Search from "./components/pages/Search";
import NoPage from "./components/pages/NoPage";
import SignUp from "./components/pages/SignUp";

class App extends Component {
  initialState = {
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
    isAuthSuccess: undefined,
    currUser: {},
    currUserProfile: {},
    isLoggedIn: false,
    isAccountCreated: undefined,
    addItemStatus: { id: undefined, isAdded: false },
  };
  state = this.initialState;

  //MTHODS
  componentDidMount() {
    fetch("http://localhost:8000/food-items")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: data });
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate() {
    if (this.state.isAuthSuccess !== undefined) {
      setTimeout(() => this.setState({ isAuthSuccess: undefined }), 3000);
    }

    if (this.state.isAccountCreated !== undefined) {
      setTimeout(() => this.setState({ isAccountCreated: undefined }), 3000);
    }
    if (this.state.addItemStatus.id !== undefined) {
      setTimeout(
        () => this.setState({ addItemStatus: this.initialState.addItemStatus }),
        1500
      );
    }
  }

  authenticate = (username, password) => {
    fetch(`${this.state.baseUrl}/users?username=${username}`)
      .then((response) => response.json())
      .then((users) => {
        let user;
        if (users.length === 0) {
          this.setState({ isAuthSuccess: false });
        } else {
          user = users[0];
          // Validate user
          if (user.username === username && user.password === password) {
            // update user PROFILE
            this.retrieveProfile(user.id)
              .then((profile) => {
                this.setState({
                  isLoggedIn: true, // set login status
                  isAuthSuccess: true, // set auth status
                  currUser: user,
                  caloriegoal: profile.calorieGoal,
                  caloriereached: profile.calorieReached,
                  breakfast: profile.breakFast,
                  morningsnack: profile.morningSnack,
                  lunch: profile.lunch,
                  eveningsnack: profile.eveningSnack,
                  dinner: profile.dinner,
                });
              })
              .catch((err) => console.log(err));
          } else {
            this.setState({ isAuthSuccess: false });
          }
        }
      })
      .catch((err) => console.log(err));
  };

  retrieveProfile = async (id) => {
    try {
      const profileResponse = await fetch(
        `${this.state.baseUrl}/profiles/${id}`
      );
      const profileData = await profileResponse.json();
      return profileData;
    } catch (err) {
      console.log(err);
    }
  };

  logout = () => {
    // save profile
    fetch(`${this.state.baseUrl}/profiles/${this.state.currUser.id}`, {
      method: "PUT",
      body: JSON.stringify({
        calorieGoal: this.state.caloriegoal,
        calorieReached: this.state.caloriereached,
        breakFast: this.state.breakfast,
        morningSnack: this.state.morningsnack,
        lunch: this.state.lunch,
        eveningSnack: this.state.eveningsnack,
        dinner: this.state.dinner,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((profile) => console.log(profile))
      .catch((err) => console.log(err));
    this.setState(this.initialState);
  };

  createUser = (username, passsword) => {
    // check the user is exist
    fetch(`${this.state.baseUrl}/users?username=${username}`)
      .then((res) => res.json())
      .then((users) => {
        if (users.length === 0) {
          fetch(`${this.state.baseUrl}/users`, {
            method: "POST",
            body: JSON.stringify({
              username: username,
              password: passsword,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              this.createUserProfile();
              this.setState({ isAccountCreated: true });
              //
            });
        } else {
          this.setState({ isAccountCreated: false });
        }
      })
      .catch((err) => console.log(err));
    // if not, create a new user and return true
    // else return false
  };

  createUserProfile = () => {
    fetch(`${this.state.baseUrl}/profiles`, {
      method: "POST",
      body: JSON.stringify({
        calorieGoal: 0,
        calorieReached: 0,
        breakFast: [],
        morningSnack: [],
        lunch: [],
        eveningSnack: [],
        dinner: [],
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((profile) => console.log(profile))
      .catch((err) => console.log(err));
  };

  retrieveFoodItems = async (searchItem) => {
    try {
      const foodItemsResponse = await fetch(
        `${this.state.baseUrl}/food-items?q=${searchItem}`
      );
      const foodData = await foodItemsResponse.json();
      return foodData;
    } catch (err) {
      console.log(err);
    }
  };

  // Funtion to handle the food search
  handleSearch = (searchItem) => {
    this.retrieveFoodItems(searchItem)
      .then((foodItems) => {
        // update state with the item found
        this.setState({ searchresult: foodItems });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ searchresult: [] });
      });
  };

  handleMeal = (id, mealtype) => {
    const { searchresult, caloriereached } = this.state;
    const selectedItem = searchresult.filter((item, index) => {
      return item.id === id;
    });

    this.setState({
      [mealtype]: [...this.state[mealtype], selectedItem[0]],

      caloriereached: caloriereached + selectedItem[0].calorie,
      addItemStatus: { id: selectedItem[0].id, isAdded: true },
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

  resetTracker = () => {
    let isReset = window.confirm("Are you sure you want to reset?");
    if (isReset) {
      this.setState({
        caloriereached: this.initialState.caloriereached,
        caloriegoal: this.initialState.caloriegoal,
        breakfast: this.initialState.breakfast,
        morningsnack: this.initialState.morningsnack,
        lunch: this.initialState.lunch,
        eveningsnack: this.initialState.eveningsnack,
        dinner: this.initialState.dinner,
      });
    }
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
      isAuthSuccess,
      isLoggedIn,
      isAccountCreated,
      currUser,
      addItemStatus,
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
              <Login
                logo={logo}
                appName={appName}
                authenticate={this.authenticate}
                isAuthSuccess={isAuthSuccess}
                setUserProfile={this.setUserProfile}
                isLoggedIn={isLoggedIn}
              />
            }></Route>
          <Route
            path="sign-up"
            element={
              <SignUp
                logo={logo}
                appName={appName}
                isAccountCreated={isAccountCreated}
                createUser={this.createUser}
              />
            }></Route>
          <Route
            path="dashboard"
            element={<Dashboard logout={this.logout} currUser={currUser} />}>
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
                  resetTracker={this.resetTracker}
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
                  clearSearch={() => this.setState({ searchresult: [] })}
                  addItemStatus={addItemStatus}
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

import { Route, Routes } from "react-router";
// import Dashboard from "./pages/Dashboard";
import HealthCalculator from "./pages/HealthCalculator";
import Search from "./pages/Search";
import Tracker from "./pages/Tracker";

const main = (props) => {
  return (
    <main className="col-sm-9 col-lg-10 ml-sm-auto px-lg-4 py-lg-3" id="main">
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route
          path="/"
          element={<HealthCalculator setCalorieGoal={props.setCalorieGoal} />}
        />
        <Route
          path="/tracker"
          element={
            <Tracker
              calorieReached={props.calorieReached}
              calorieGoal={props.calorieGoal}
              breakFast={props.breakFast}
              morningSnack={props.morningSnack}
              lunch={props.lunch}
              eveningSnack={props.eveningSnack}
              dinner={props.dinner}
              handleMealType={props.handleMealType}
              handleDelete={props.handleDelete}
              setCalorieGoal={props.setCalorieGoal}
            />
          }
        />
        <Route
          path="/search-item"
          element={
            <Search
              searchResult={props.searchResult}
              handleSearch={props.handleSearch}
              handleMeal={props.handleMeal}
              userSelectedMealType={props.userSelectedMealType}
            />
          }
        />
      </Routes>
    </main>
  );
};

export default main;

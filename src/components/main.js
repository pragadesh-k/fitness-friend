import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import HealthCalculator from "./pages/HealthCalculator";
import Search from "./pages/Search";
import Tracker from "./pages/Tracker";

const main = (props) => {
  return (
    <main className="col-sm-9 col-lg-10 px-4 ml-sm-auto py-3" id="main">
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route
          path="/"
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
        <Route path="/health-calculator" element={<HealthCalculator />} />
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

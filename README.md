# **Fitness Friend**

Fitness friend is an web application that helps to calculate and track calories of the day.

- It has an calorie calculator which helps user to find their calorie target based on their diet goal.
- It has an tracker with an calorie counter which changed based on the added or removed food items of their respective calorie content.
- It has an search page where users can find the food items they want to add to the tracker.

### Technologies and Frameworks

- It is developed using _React JS_, _CSS_, _Bootstrap_, _React-Bootstrap_.
- Json is used to store and manipulate the application data.

### Components

- App - The parent component for all. Maintains the application state and contains number of methods for the app’s functionality. It is Configured with routes.​

- Login - It have the markup for the login page and maintains the state of login form.​

- SignUp - It have the markup for the Sign up page and maintains the state of sign up form.​

- Dashboard - It is the layout components which has header, side navigation bar, render tracker or health-calculator or search-page based on the route path. ​

- Tracker - It has the markup for tracker and a form which takes user’s calorie target for the day. It contains all the food items under its respective meal category.​

- Health-calculator - It helps the user to find their BMI, BMR, Target Calorie, Target Macro Nutrients.​

- Search- It provide the food items that user wants to add to the tracker. ​

### Routes

- Login - `http://localhost:3000/login​`

- SignUp - `http://localhost:3000/sign-up​`

- Tracker - `http://localhost:3000/dashboard/tracker​`

- Health Calculator - `http://localhost:3000/dashboard/health-calculator​`

- Search - `http://localhost:3000/dashboard/search-item​`

### Json server endpoints

- `http://localhost:8000/food-items`​

- `http://localhost:8000/users​`

- `http://localhost:8000/profiles​`

### Application Flow

![Flow diagram](readmeAssests/fitnessFriendFlowDiagram.png)

### Json data design

![Json Schema](readmeAssests/JsonSchema.png)

### Application Screenshots

![login](<readmeAssests/Screenshot%20(31).png>)

<p style="text-align:center"> <b>Login page</b> </p>

![Sign up](<readmeAssests/Screenshot%20(32).png>)

<p style="text-align:center"> <b>Signup Page</b> </p>

![Invalid Login Credentials](<readmeAssests/Screenshot%20(33).png>)

<p style="text-align:center"> <b>Login page. Invalid Credentials</b> </p>

![Account not created](<readmeAssests/Screenshot%20(34).png>)

<p style="text-align:center"> <b>Signup Page. Account not created</b> </p>

![Account created](<readmeAssests/Screenshot%20(35).png>)

<p style="text-align:center"> <b>Signup Page. Account created</b> </p>

![Tacker form](<readmeAssests/Screenshot%20(156).png>)

<p style="text-align:center"> <b>Tacker form</b> </p>

![Tracker](<readmeAssests/Screenshot%20(157).png>)

<p style="text-align:center"> <b>Tracker</b> </p>

![Search page](<readmeAssests/Screenshot%20(160).png>)

<p style="text-align:center"> <b>Search page</b> </p>

![Tracker](<readmeAssests/Screenshot%20(159).png>)

<p style="text-align:center"> <b>Tracker</b> </p>

![Tracker](<readmeAssests/Screenshot%20(165).png>)

<p style="text-align:center"> <b>Tracker</b> </p>

![Calorie Calculator](<readmeAssests/Screenshot%20(163).png>)

<p style="text-align:center"> <b>Calorie Calculator</b> </p>

![Calorie Calculator result](<readmeAssests/Screenshot%20(168).png>)

<p style="text-align:center"> <b>Calorie Calculator result</b> </p>

### Clone project

`git clone https://github.com/pragadesh-k/fitness-friend.git`

### Install Dependencies

`npm install`

### Setup Json Server

1. `npm install -g json-server`
2. `json-server --watch data/db.json --port 8000`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

<h3 style="text-align:center">Thank you.</h3>

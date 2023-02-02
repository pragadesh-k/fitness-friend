import React from "react";
import { Link } from "react-router-dom";
import { Pharse, FormField, FormSubmitButton, Info } from "./Login";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      username: "",
      password: "",
      confirmPassword: "",
    };
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    //update state with username and passsword
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.username, this.state.password);
    this.props.createUser(this.state.username, this.state.password);
    // clear fields
    this.setState(this.initialState);
  }
  render() {
    const { username, password, confirmPassword } = this.state;
    let info;
    if (this.props.isAccountCreated) {
      info = "Account created! Please login.";
    } else {
      info = "Account not created.";
    }
    return (
      <div>
        <div className="login-wrapper">
          <div
            className="d-flex flex-row justify-content-center align-items-center"
            style={{ height: "100vh" }}>
            <div className="login-content">
              <div className="text-center">
                {this.props.logo}
                {this.props.appName}

                <Pharse text="Great things starts from small beginnings. Sign up here and start tracking your target calorie" />
                <Info status={this.props.isAccountCreated} info={info} />
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <FormField
                      type="text"
                      className="auth-page-field form-control"
                      id="username"
                      placeholder="Username"
                      name="username"
                      value={username}
                      handleChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <FormField
                      type="password"
                      className="auth-page-field form-control"
                      id="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      handleChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <FormField
                      type="password"
                      className="auth-page-field form-control"
                      id="confirm password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={confirmPassword}
                      handleChange={this.handleChange}
                    />
                  </div>
                  <FormSubmitButton
                    className="btn-block fill-btn"
                    value="Sign up"
                  />
                  <Pharse text="Already an user?" />
                  <Link
                    className="btn-block fill-btn stroke-btn"
                    to="/login"
                    type="button">
                    Login
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SignUp;

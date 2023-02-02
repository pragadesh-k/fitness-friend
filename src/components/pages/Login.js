import React from "react";
import { Navigate, Link } from "react-router-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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
    //Authenticating the user

    this.props.authenticate(this.state.username, this.state.password);

    // clear fields
    this.setState({ username: "", password: "" });
  }

  render() {
    const { username, password } = this.state;
    let info;
    if (this.props.isAuthSuccess) {
      info = "Login successfull.";
    } else {
      info = "Invalid user credentials or Please sign up.";
    }
    let isauth = this.props.isAuthSuccess;

    return (
      <div>
        {this.props.isLoggedIn && <Navigate to="/dashboard/tracker" />}
        <div className="login-wrapper">
          <div
            className="d-flex flex-row justify-content-center align-items-center"
            style={{ height: "100vh" }}>
            <div className="login-content">
              <div className="text-center">
                {this.props.logo}
                {this.props.appName}
                <Pharse text="Login to use our application feature to help track your daily calorie intake." />
                <Info status={this.props.isAuthSuccess} info={info} />
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
                  <FormSubmitButton
                    className="btn-block fill-btn"
                    value="Login"
                  />
                  <Pharse text="Don't have an account?" />
                  <Link
                    className="btn-block fill-btn stroke-btn"
                    to="/sign-up"
                    type="button">
                    Signup
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

export function Pharse(props) {
  return <small className="d-block my-3 text-muted">{props.text}</small>;
}

export function FormField(props) {
  return (
    <input
      type={props.type}
      className={props.className}
      id={props.id}
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
    />
  );
}

export function FormSubmitButton(props) {
  return (
    <input className={props.className} type="submit" value={props.value} />
  );
}

export function Info(props) {
  const clrSuccess = "#7fd858";
  const clrFailure = "#EB7A7A";
  if (props.status) {
    return (
      <div
        style={{ borderColor: clrSuccess, color: clrSuccess }}
        className="fill-btn stroke mb-3">
        {props.info}
      </div>
    );
  } else if (props.status === false) {
    return (
      <div
        style={{ borderColor: clrFailure, color: clrFailure }}
        className="fill-btn stroke mb-3">
        {props.info}
      </div>
    );
  } else {
    return null;
  }
}

export default LoginPage;

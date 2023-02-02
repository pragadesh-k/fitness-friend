import React from "react";
import Header from "../header";
import SideNav from "../sidenav";
import { Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

class Dashboard extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Container fluid>
          <Row>
            <SideNav logout={this.props.logout} />
            <main
              className="col-sm-9 col-lg-10 ml-sm-auto px-lg-4 py-lg-3"
              id="main">
              <Outlet />
            </main>
          </Row>
        </Container>
      </>
    );
  }
}

export default Dashboard;

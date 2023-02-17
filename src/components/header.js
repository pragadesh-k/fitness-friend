import { Col, Navbar, NavbarBrand } from "react-bootstrap";
import { SiDeepnote } from "react-icons/si";
// import { BsFillCloudSunFill } from "react-icons/bs";

const Header = (props) => {
  return (
    <Navbar id="header" className="p-0 align-items-stretch">
      <NavbarBrand
        className="col col-sm-3 col-lg-2 d-none d-sm-block mr-0 p-4"
        id="left-face">
        {/* <SiDeepnote color="#2cbf6a" /> Fitness Friend */}
      </NavbarBrand>
      <Col className="p-4 d-flex" id="right-face">
        <div id="project-title" className="mr-auto">
          <img src="logo192.png" height="35px" />
          <span className="ml-2" style={{ color: "#818181" }}>
            fitness friend
          </span>
        </div>
        <div>
          <small className="text-muted">Logged in as: {props.username}</small>
        </div>
      </Col>
    </Navbar>
  );
};

export default Header;

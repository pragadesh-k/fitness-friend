import { Col, Navbar, NavbarBrand } from "react-bootstrap";
import { SiDeepnote } from "react-icons/si";

const Header = (props) => {
  return (
    <Navbar id="header" className="p-0 align-items-stretch">
      <NavbarBrand className="col-sm-3 col-lg-2 mr-0 p-4" id="left-face">
        <SiDeepnote color="#2cbf6a" /> Fitness Friend
      </NavbarBrand>
      {/* <Col className="p-4 d-flex" id="right-face">
        <div id="project-title" className="mx-auto">
          <SiDeepnote
            color="#2cbf6a"
            style={{ marginRight: "1rem", verticalAlign: "middle" }}
          />
          fitness friend
        </div>
      </Col> */}
    </Navbar>
  );
};

export default Header;

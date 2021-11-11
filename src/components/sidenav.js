import { Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GrAppsRounded, GrMonitor, GrCalculator } from "react-icons/gr";
import { IoFitnessSharp } from "react-icons/io5";
import { IconContext } from "react-icons";

const sidenav = () => {
  return (
    <IconContext.Provider
      value={{
        size: "1rem",
        style: { fill: "currentcolor", marginRight: ".5rem" },
      }}>
      <div
        id="sidenav"
        defaultActiveKey="/home"
        className="flex-column col-sm-3 col-lg-2 p-0">
        <div id="sidenav-sticky">
          <h6 className="px-3 mt-3">Menu</h6>
          <Nav as="ul" className="flex-column">
            {/* <NavItem>
              <Link className="nav-link" to="/">
                <GrAppsRounded />
                Dashboard
              </Link>
            </NavItem> */}
            <NavItem>
              <Link className="nav-link" to="/">
                <IoFitnessSharp size="1.2rem" />
                Tracker
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/health-calculator">
                <GrCalculator />
                Health Calculator
              </Link>
            </NavItem>
          </Nav>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default sidenav;

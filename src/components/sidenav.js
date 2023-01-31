import { Nav, NavItem } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { GrCalculator } from "react-icons/gr";
import { IoFitnessSharp, IoLog } from "react-icons/io5";
import { IconContext } from "react-icons";
import { BiLogOutCircle } from "react-icons/bi";
// Icons GrAppsRounded, GrMonitor

const sidenav = () => {
  return (
    <IconContext.Provider
      value={{
        size: "1rem",
        style: { fill: "currentcolor", marginRight: ".5rem" },
      }}>
      <div id="sidenav" className="flex-column col-sm-3 col-lg-2 p-0">
        <div id="sidenav-sticky">
          <h6 id="side-heading" className="px-3 mt-3">
            Menu
          </h6>
          <Nav as="ul" className="flex-column">
            {/* <NavItem>
              <Link className="nav-link" to="/">
                <GrAppsRounded />
                Dashboard
              </Link>
            </NavItem> */}
            <NavItem>
              <NavLink className="nav-link" to="/dashboard/health-calculator">
                <GrCalculator />
                Health Calculator
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/dashboard/tracker">
                <IoFitnessSharp size="1.2rem" />
                Tracker
              </NavLink>
            </NavItem>
          </Nav>
          <Link to="/login" className="text-btn">
            <BiLogOutCircle size="1.2rem" /> Logout
          </Link>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default sidenav;

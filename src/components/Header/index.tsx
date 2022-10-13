import { Link, useHistory, withRouter } from "react-router-dom";
import { BsBriefcaseFill } from "react-icons/bs";
import { IoMdHome, IoMdExit } from "react-icons/io";
import { useClearStores } from "../../hooks/useClearStores";
import "./index.css";

const Header = ({ onLogout }: any) => {
  const history = useHistory();
  const clearStores = useClearStores();

  const logout = () => {
    onLogout();
    clearStores();
    history.replace("/login");
  };

  return (
    <div className="header-responsive-container">
      <ul className="header-container">
        <li>
          <Link to="/">
            <img
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              className="website-logo"
            />
          </Link>
        </li>
        <li className="header-nav-item-container">
          <Link to="/" className="nav-link-item">
            <p className="d-none d-md-inline mr-2">Home</p>
            <IoMdHome size="30" className="d-inline d-md-none" />
          </Link>
          <Link to="/jobs" className="nav-link-item">
            <p className="d-none d-md-inline">Jobs</p>
            <BsBriefcaseFill size="28" className="d-inline d-md-none" />
          </Link>
          <button
            type="button"
            className="transparent-btn d-inline d-md-none"
            onClick={logout}
          >
            <IoMdExit size="30" color="#ffffff" />
          </button>
        </li>
        <li>
          <button
            type="button"
            className="logout-btn d-none d-md-inline"
            onClick={logout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Header);

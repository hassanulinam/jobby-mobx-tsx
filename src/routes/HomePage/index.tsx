import { Link } from "react-router-dom";
import Header from "../../components/Header";
import "./index.css";

const Home = () => {
  return (
    <div className="home-route-container">
      <Header />
      <div className="home-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-text">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="find-jobs-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { useStores } from "../../hooks/useStores";
import "./index.css";

const Home = () => {
  //API, navigations, store acessing
  const { authStore } = useStores();

  return (
    <div className="home-route-container">
      <Header onLogout={authStore.onLogout} />
      <div className="home-container" data-testid="home-container">
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

import { BsBriefcaseFill, BsStarFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";
import apiConst from "../../Constants/apiConst";
import FailureView from "../FailureView";

import Header from "../Header";
import { useStores } from "../../Hooks/useStores";
import "./index.css";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const JobItemDetails = () => {
  const { jobDetailStore } = useStores();
  const params: any = useParams();

  useEffect(() => {
    const { id } = params;
    jobDetailStore.getJobDetails(id);
  }, []);

  const renderLoadingView = () => (
    <div className="loader-container">
      <ThreeDots color="#ffffff" height="50" width="50" />
    </div>
  );

  const renderJobDetailsView = () => {
    const jobDetails = jobDetailStore.jobDetails?.jobDetails;
    const similarJobs = jobDetailStore.jobDetails?.similarJobs;
    const {
      company_logo_url,
      title,
      employment_type,
      job_description,
      location,
      package_per_annum,
      rating,
      life_at_company,
      skills,
      company_website_url,
    } = jobDetails;

    return (
      <ul>
        <li className="job-item-card-container mb-2">
          <div className="flex-row">
            <img
              alt="job details company logo"
              src={company_logo_url}
              className="company-logo"
            />
            <div className="ml-1">
              <h1>{title}</h1>
              <div className="flex-row">
                <BsStarFill color="#ffff00" size="20" />
                <p className="bold ml-1">{rating}</p>
              </div>
            </div>
          </div>
          <div className="flex-row justify-content-between mb-0 mt-3">
            <div className="flex-row">
              <div className="flex-row mr-4">
                <MdLocationOn color="#dddeee" size="20" />
                <p className="ml-1">{location}</p>
              </div>
              <div className="flex-row">
                <BsBriefcaseFill color="#dddddd" size="20" />
                <p className="ml-1">{employment_type}</p>
              </div>
            </div>
            <div>
              <p className="job-title">{package_per_annum}</p>
            </div>
          </div>
          <hr />
          <div className="job-desc mb-2">
            <h1 className="desc-heading">Description</h1>
            <p className="line-gap">{job_description}</p>
          </div>
          <a href={company_website_url}>Visit</a>
          <h1>Skills</h1>
          <ul className="skill-cards-container mb-2">
            {skills.map((item: any) => (
              <li className="skill-card flex-row" key={item.name}>
                <img
                  alt={item.name}
                  src={item.image_url}
                  className="skill-img"
                />
                <p className="ml-1">{item.name}</p>
              </li>
            ))}
          </ul>
          <div>
            <h1>Life at company</h1>
            <div className="life-at-company">
              <p>{life_at_company.description}</p>
              <img
                alt="life at company"
                src={life_at_company.image_url}
                className="ml-1"
              />
            </div>
          </div>
        </li>
        <li>
          <h1 className="mt-3 mb-0">Similar Jobs</h1>
          <ul className="similar-job-items-container">
            {similarJobs?.map((item: any) => (
              <li className="similar-job-item-card" key={item.id}>
                <div className="flex-row mb-2">
                  <img
                    alt="similar job company logo"
                    src={item.companyLogoUrl}
                    className="company-logo-img"
                  />
                  <div>
                    <h1 className="job-title">{item.title}</h1>
                    <div className="flex-row">
                      <BsStarFill color="#ffff00" size="20" />
                      <p className="bold ml-1">{item.rating}</p>
                    </div>
                  </div>
                </div>
                <div className="job-desc mb-2">
                  <h1 className="desc-heading">Description</h1>
                  <p className="line-gap">{item.jobDescription}</p>
                </div>
                <div className="flex-row">
                  <div className="flex-row">
                    <div className="flex-row mr-4">
                      <MdLocationOn color="#ffffff" size="20" />
                      <p className="ml-1">{item.location}</p>
                    </div>
                    <div className="flex-row">
                      <BsBriefcaseFill color="#ffffff" size="20" />
                      <p className="ml-1">{item.employmentType}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    );
  };

  const renderViewBasedOnApiStatus = () => {
    const { jobDetailsApi } = jobDetailStore;

    switch (jobDetailsApi) {
      case apiConst.inProgress:
        return renderLoadingView();
      case apiConst.success:
        return renderJobDetailsView();
      case apiConst.failure:
        return <FailureView retryMethod={jobDetailStore.getJobDetails} />;
      default:
        return null;
    }
  };

  return (
    <div className="job-details-route-container">
      <Header />
      <div className="job-details-card-wrapper">
        {renderViewBasedOnApiStatus()}
      </div>
    </div>
  );
};

export default observer(JobItemDetails);

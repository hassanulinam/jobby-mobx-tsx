import Cookies from "js-cookie";
import { flow, makeAutoObservable } from "mobx";
import apiConst from "../../Constants/apiConst";
import JobDetail from "./JobDetail";

class Job {
  id: string;
  title: string;
  rating: string;
  location: string;
  companyLogoUrl: string;
  employmentType: string;
  jobDescription: string;
  packagePerAnnum: string;

  jobDetails: JobDetail | null = null;
  jobDetailsApi = apiConst.initial;

  constructor({
    id,
    title,
    rating,
    location,
    company_logo_url,
    employment_type,
    job_description,
    package_per_annum,
  }: any) {
    this.id = id;
    this.title = title;
    this.rating = rating;
    this.location = location;
    this.companyLogoUrl = company_logo_url;
    this.employmentType = employment_type;
    this.jobDescription = job_description;
    this.packagePerAnnum = package_per_annum;

    makeAutoObservable(this, { getJobDetails: flow.bound });
  }

  private getFetchOptions = () => {
    const accessToken = Cookies.get("jwt_token");
    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };

  *getJobDetails(): Generator<any, any, any> {
    this.jobDetailsApi = apiConst.inProgress;
    const URL = `https://apis.ccbp.in/jobs/${this.id}`;
    const response = yield fetch(URL, this.getFetchOptions());
    if (response.ok) {
      const data = yield response.json();
      console.log(data);
      this.jobDetailsApi = apiConst.success;
      this.jobDetails = new JobDetail(data);
    } else this.jobDetailsApi = apiConst.failure;
  }
}

export default Job;

/*

id
title
rating
location
company_logo_url
employment_type
job_description
package_per_annum

*/

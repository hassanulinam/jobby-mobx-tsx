import { makeAutoObservable } from "mobx";
import SimilarJob from "./SimilarJob";

class JobDetail {
  similarJobs: SimilarJob[] = [];
  jobDetailedData: any;

  constructor({ job_details, similar_jobs }: any) {
    this.jobDetailedData = job_details;
    this.similarJobs = similar_jobs.map((sj: any) => new SimilarJob(sj));

    makeAutoObservable(this);
  }
}

export default JobDetail;

/*
company_logo_url
company_website_url
employment_type
id
job_description
life_at_company
location
package_per_annum
rating
skills
title



{
      company_logo_url,
      company_website_url,
      employment_type,
      id,
      job_description,
      life_at_company,
      location,
      package_per_annum,
      rating,
      skills,
      title,
    }

*/
